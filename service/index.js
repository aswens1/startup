const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const express = require('express');
const app = express();

const DB = require('./database.js')

const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = []; // high scores for leaderboard
let stats = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
    // delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// get stats for a user
apiRouter.get('/stats/:userName', verifyAuth, async (req, res) => {
  try {
    const userStats = await DB.getStats(req.params.userName);

    if (userStats) {
      res.send(userStats);
      return;
    }

    res.send({
      userName: req.params.userName,
      pixels: 0,
      gamesPlayed: 0,
      wins: 0,
      streak: 0,
    });
  } catch (err) {
    console.error("Stats load error:", err);
    res.status(500).send({ msg: "Failed to load stats" });
  }
});

// save/update stats
apiRouter.post('/stats', verifyAuth, async (req, res) => {
  try {
    const newStats = req.body;
    await DB.updateStats(newStats);
    res.send({ msg: "Stats updated" });
    return;
  } catch (err) {
    console.error("Stats error: ", err);
    res.status(500).send({ msg: "Failed to save stats"});
  }
});

// sets leaderboard
apiRouter.get('/leaderboard', verifyAuth, async (req, res) => {

  try {
    const leaderboard = await DB.getLeaderboard();
    res.send(leaderboard);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).send({ msg: "Failed to load leaderboard" });
  }
});

// get games
apiRouter.get('/games', verifyAuth, async (req, res) => {

  const allGames = await DB.getGames();

  const activeGames = allGames.filter(g => g.players.length < g.maxPlayers);
  res.send(activeGames);
});

// get a single game (including full games)
apiRouter.get('/games/:id', verifyAuth, async (req, res) => {
  try {
    const game = await DB.getGameById(Number(req.params.id));
    if (!game) {
      res.status(404).send({ msg: "Game not found" });
      return;
    }
    res.send(game);
  } catch (err) {
    console.error("Game load error:", err);
    res.status(500).send({ msg: "Failed to load game" });
  }
});

// create games
apiRouter.post('/games', verifyAuth, async (req, res) => {

  const maxPlayers = req.body.maxPlayers;
  let palette = [];

  try {
    const randomHex = Math.floor(Math.random() * 16777215)
    .toString(16).padStart(6, "0");

    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${randomHex}&mode=analogic&count=${maxPlayers}`);

    const data = await response.json();

    palette = data.colors
      .map(c => c.hex.value)
      .slice(0, maxPlayers);

    while (palette.length < maxPlayers) {
      palette.push(
        "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
      );
    }

  } catch (err) {
    console.log("Color API failed, using fallback colours");

    palette = Array.from({ length: maxPlayers }, () => 
      "#" + Math.floor(Math.random()*16777215).toString(16)
    );
  }

  const game = {
    id: Date.now(),
    name: req.body.name,
    type: req.body.type,
    players: [],
    maxPlayers: maxPlayers,
    status: "Waiting for Players",
    colors: palette,
  };

  await DB.createGame(game);
  res.send(game);
});

// join game
apiRouter.post('/games/:id/join', verifyAuth, async (req, res) => {

  const user = await findUser('token', req.cookies[authCookieName]);
  const game = await DB.getGameById(Number(req.params.id));

  if (!game) {
    return res.status(404).send({ msg: "Game not found" });
  }

  if (game.players.length >= game.maxPlayers) {
    return res.status(400).send({ msg: "Game is full" });
  }

  const playerIndex = game.players.length;
  const assignedColor = game.colors[playerIndex];

  game.players.push({
    userId: user.email,
    color: assignedColor,
  });

  if (game.players.length >= game.maxPlayers) {
    game.status = "Full";
  }

  await DB.updateGame(game);
  res.send({ game, color: assignedColor });
});

// leave game

apiRouter.post('/games/:id/leave', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const game = await DB.getGameById(Number(req.params.id));

  if (!game) {
    return res.status(404).send({ msg: "Game not found" });
  }

  game.players = game.players.filter(p => p.userId !== user.email);

  if (game.players.length < game.maxPlayers) {
    game.status = "Waiting for Players";
  }

  await DB.updateGame(game);
  res.send(game);
})

// delete game after completion
apiRouter.delete('/games/:id', verifyAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await DB.getGameById(id);
    if (!existing) {
      res.status(404).send({ msg: "Game not found" });
      return;
    }

    await DB.deleteGameById(id);
    res.status(204).end();
  } catch (err) {
    console.error("Game delete error:", err);
    res.status(500).send({ msg: "Failed to delete game" });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'email') {
    return await DB.getUser(value);
  } else if (field === 'token') {
    return await DB.getUserByToken(value);
  }

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

console.log('Setting up WebSocket server...');
peerProxy(httpService);