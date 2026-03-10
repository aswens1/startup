const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const express = require('express');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = []; // high scores for leaderboard
let stats = [];
let games = [];

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
    delete user.token;
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
apiRouter.get('/stats/:userName', verifyAuth, (_req, res) => {
  const userStats = stats.find((s) => s.userName === _req.params.userName);

  if (userStats) {
    res.send(userStats);
  } else {
    res.send({
        userName: _req.params.userName,
        pixels: 0,
        gamesPlayed: 0,
        wins: 0,
        streak: 0,
    });
  }
});

// save/update stats
apiRouter.post('/stats', verifyAuth, (req, res) => {
    const newStats = req.body;

    const existing = stats.find((s) => s.userName === newStats.userName);

    if (existing) {
        existing.pixels += newStats.pixels;
        existing.gamesPlayed += newStats.gamesPlayed;
        existing.wins += newStats.wins;
    } else {
        stats.push(newStats)
    }
  res.send(newStats);
});

// sets leaderboard
apiRouter.get('/leaderboard', verifyAuth, (req, res) => {
    const sorted = [...stats].sort((a, b) => b.pixels - a.pixels);
    res.send(sorted);
});

// get games
apiRouter.get('/games', verifyAuth, (req, res) => {
  const activeGames = games.filter(g => g.players < g.maxPlayers);
  res.send(activeGames);
});

// create games
apiRouter.post('/games', verifyAuth, async (req, res) => {

  const maxPlayers = req.body.maxPlayers;
  let palette = [];

  try {
    const requestBody = {
      mode: "transformer",
      num_colors: maxPlayers,
      temperature: "1.2",
      num_results: 5,
      adjacency: [],
      palette: Array(maxPlayers).fill("-"),
    };

    const response = await fetch("https://api.huemint.com/color", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    palette = data.result[0].palette;

  } catch (err) {
    console.log("Huemint failed, using fallback colours");

    palette = Array.from({ length: maxPlayers }, () => 
      "#" + Math.floor(Math.random()*16777215).toString(16)
    );
  }

  const game = {
    id: Date.now(),
    name: req.body.name,
    type: req.body.type,
    players: 0,
    maxPlayers: maxPlayers,
    status: "Waiting for Players",
    colors: palette,
  };

  games.push(game);
  res.send(game);
});

// join game
apiRouter.post('/games/:id/join', verifyAuth, (req, res) => {

  const game = games.find(g => g.id == req.params.id);

  if (!game) {
    return res.status(404).send({ msg: "Game not found" });
  }

  if (game.players >= game.maxPlayers) {
    return res.status(400).send({ msg: "Game is full" });
  }

  const playerIndex = game.players;

  const assignedColor = game.colors[playerIndex];

  game.players++;

  if (game.players >= game.maxPlayers) {
    game.status = "Full";
  }

  res.send({ game, color: assignedColor });
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
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});