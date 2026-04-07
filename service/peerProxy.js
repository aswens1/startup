const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  const gridSize = 20;
  const gameBoards = {};
  const gameStartedAnyway = {};

  socketServer.on('connection', (socket) => {
    console.log('WebSocket client connected');
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      const message = JSON.parse(data);

      // board exists
      if (!gameBoards[message.gameId]) {
        gameBoards[message.gameId] = Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(null));
      }

      const board = gameBoards[message.gameId];

      // join
      if (message.type === 'JOIN_GAME') {
        socket.send(JSON.stringify({
          type: 'FULL_BOARD',
          gameId: message.gameId,
          board: board,
          startedAnyway: Boolean(gameStartedAnyway[message.gameId]),
        }));
        return;
      }

      if (message.type === 'START_ANYWAY') {
        gameStartedAnyway[message.gameId] = true;

        socketServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'GAME_STARTED_ANYWAY',
              gameId: message.gameId,
            }));
          }
        });
        return;
      }

      if (message.type === 'CLAIM_PIXEL') {
        board[message.row][message.col] = message.color;

        socketServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
  
            client.send(JSON.stringify({
              type: 'PIXEL_UPDATED',
              gameId: message.gameId,
              row: message.row,
              col: message.col,
              color: message.color,
            }));
          }
        });
      }

    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };
