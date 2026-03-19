const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const gameCollection = db.collection('games');
const statsCollection = db.collection('stats');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function createGame(game) {
  await gameCollection.insertOne(game);
  return game;
}

async function getGames() {
  return gameCollection.find().toArray();
}

async function getGameById(id) {
  return gameCollection.findOne({ id: id});
}

async function updateGame(game) {
  await gameCollection.updateOne({ id: game.id }, { $set: game });
}

async function deleteGameById(id) {
  await gameCollection.deleteOne({ id });
}

async function getStats(userName) {
  return await statsCollection.findOne({ userName });
}

async function updateStats(stats) {
  await statsCollection.updateOne(
    { userName: stats.userName },

    {
      $inc: {
      pixels: stats.pixels,
      gamesPlayed: stats.gamesPlayed,
      wins: stats.wins,
      },
      $set: {
        streak: stats.streak,
      }
    },
    { upsert: true }
  );
}

async function getLeaderboard() {
  return await statsCollection
    .find({})
    .sort({ pixels: -1 })
    .limit(10)
    .toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGameById,
  updateStats,
  getStats,
  getLeaderboard,
};