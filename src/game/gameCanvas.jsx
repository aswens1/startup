import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GameEngine } from "./gameEngine";
import { CaptureMode } from "./modes/captureMode";
import { getSocket } from "../websocket";

export function GameCanvas() {

  const socket = getSocket();

  const userName = localStorage.getItem('userName');

  const gridSize = 20;
  const engine = useMemo(() => new GameEngine(CaptureMode), []);

  const { gameId } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
  )

  const [playerColor, setPlayerColor] = useState(null);

  useEffect(() => {
    const currentGame = JSON.parse(localStorage.getItem('currentGame'));
    
    if (!currentGame || currentGame.id !== Number(gameId)) {
      navigate('/gameMenu');
    } else {
      setPlayerColor(currentGame.color);
    }
  }, [gameId, navigate]);

  const handleClick = (row, col) => {
    if (gameOver) return;
    if (!playerColor) return;

    socket.send(JSON.stringify({
      type: 'CLAIM_PIXEL',
      gameId,
      row,
      col,
      color: playerColor,
    }));
  };

  useEffect(() => {
    const socket = getSocket();

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'PIXEL_UPDATED' && message.gameId === gameId) {
        setBoard(prev => {
          const newBoard = prev.map(row => [...row]);
          newBoard[message.row][message.col] = message.color;
          return newBoard;
        });
      }
    };

    socket.addEventListenter('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [gameId]);

  const leaveGame = async () => {
    try {
      await fetch(`/api/games/${gameId}/leave`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error("Failed to leave game", err);
    }
    
    localStorage.removeItem('currentGame');
    navigate('/gameMenu');
  };

  const [playerCount, setPlayerCount] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 5 mins
  const [controlPercent, setControlPercent] = useState(27);

  useEffect(() => {
    let cancelled = false;

    async function loadGameInfo() {
      try {
        const response = await fetch(`/api/games/${gameId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          return;
        }

        const game = await response.json();
        if (cancelled) return;

        setPlayerCount(game.players?.length ?? 0);
        setMaxPlayers(game.maxPlayers ?? 0);
      } catch (err) {
        // If this fails (e.g. offline), keep whatever we already have.
        console.error("Failed to load game info", err);
      }
    }

    // Load immediately, then poll so the count stays accurate.
    loadGameInfo();
    const interval = setInterval(loadGameInfo, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [gameId]);

  // timer
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // progress bar
  useEffect(() => {
    if (!playerColor) return;

    let total = gridSize * gridSize;
    let owned = 0;

    board.forEach(row =>
      row.forEach(cell => {
        if (cell === playerColor) owned++;
      })
    );
    
    setControlPercent(Math.round((owned / total) * 100));
  }, [board, playerColor]);

  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameDeleted, setGameDeleted] = useState(false);

  // winner

  useEffect(() => {
    if (timeLeft > 0) return;
    if (gameOver) return;
  
    const colorCounts = {};
    const total = gridSize * gridSize;
  
    board.forEach(row =>
      row.forEach(cell => {
        if (!cell) return;
        colorCounts[cell] = (colorCounts[cell] || 0) + 1;
      })
    );
  
    if (Object.keys(colorCounts).length === 0) return;
  
    const sorted = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1]);
  
    const [winningColor] = sorted[0];
  
    setWinner(winningColor);
    setGameOver(true);
  
  }, [timeLeft, board, gameOver]);

  useEffect(() => {
    if (!gameOver || gameDeleted) return;
    if (!winner) return;

    async function deleteCompletedGame() {
      try {
        const response = await fetch(`/api/games/${gameId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok && response.status !== 404) {
          throw new Error(`Failed to delete game (HTTP ${response.status})`);
        }

        setGameDeleted(true);
      } catch (err) {
        console.error("Failed to delete completed game", err);
      } finally {
        // Either way, stop treating this as an active game locally.
        localStorage.removeItem('currentGame');
      }
    }

    deleteCompletedGame();
  }, [gameOver, gameDeleted, winner, gameId]);

  const [statsUpdated, setStatsUpdated] = useState(false);

  useEffect(() => {
    if (!gameOver || statsUpdated) return;
    if (!winner) return;

    async function updateStats() {
      let pixelsPainted = 0;

      board.forEach(row => 
        row.forEach(cell => {
          if (cell === playerColor) pixelsPainted++;
        })
      );

      const statsUpdate = {
        userName: userName,
        pixels: pixelsPainted,
        gamesPlayed: 1,
        wins: winner === playerColor ? 1 : 0,
        streak: 0,
      };

      console.log("Sending stats: ", statsUpdate);

      const response = await fetch(`/api/stats`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(statsUpdate),
      });

      if (!response.ok) {
        // Don't lock in `statsUpdated` if the server rejected the update.
        throw new Error(`Failed to save stats (HTTP ${response.status})`);
      }

      setStatsUpdated(true);
    }
    updateStats().catch((err) => {
      console.error("Stats update failed:", err);
    });
  }, [gameOver, winner, playerColor, statsUpdated]);

  const goToMenu = () => {
    localStorage.removeItem('currentGame');
    navigate('/gameMenu');
  }

  const goToDashboard = () => {
    localStorage.removeItem('currentGame');
    navigate('/dashboard');
  }

  // WEBSOCKET MOCK -> place random pixel every 2 secs

  const [botColor, setBotColor] = useState(null);

  const botIntervalRef = useRef(null);

  useEffect(() => {
    if (gameOver || !botColor) return;
    
    botIntervalRef.current = setInterval(() => {
      placeRandomBotPixel();
    }, 1000); //every 1 sec

    return () => {
      clearInterval(botIntervalRef.current);
    };
  }, [gameOver, botColor]);

  useEffect(() => {
    if (playerColor) {
      setBotColor(getBotColor(playerColor));
}
  }, [playerColor]);

  
  function placeRandomBotPixel() {
    if (gameOver || !botColor) return;
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);

    const color = botColor;

    setBoard(prev => engine.handleMove(prev, randomRow, randomCol, color));
  }

  function getBotColor(playerColor) {
    const currentGame = JSON.parse(localStorage.getItem('currentGame'));

    if (!currentGame || !currentGame.colors) return null;  
  
    const available = currentGame.colors.filter(color => color !== playerColor);
  
    if (available.length === 0) return null;
  
    return available[Math.floor(Math.random() * available.length)];
  }

  return (
    <>
      <main className="canvas-main flex items-center justify-center p-2">
        <div
          className="grid border border-gray-300"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            aspectRatio: '1/1',
            width: 'min(80vw, 80vh)',
          }}
        >
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={() => handleClick(rIdx, cIdx)}
                className="border border-gray-200"
                style={{ backgroundColor: cell || 'white' }}
              />
            ))
          )}
        </div>

      <aside className="fixed right-0 top-1/2 -translate-y-1/2 
        bg-white/90 backdrop-blur-md p-5 rounded-l-xl 
        shadow-xl w-72 flex flex-col gap-4">

        <h2 className="text-2xl font-bold">Game Info</h2>

        {/* Player Count */}
        <div>
          <p className="text-sm uppercase tracking-wide opacity-60">Players</p>
          <p className="text-lg font-semibold">{playerCount} / {maxPlayers || 4}</p>
        </div>

        {/* Timer */}
        <div>
          <p className="text-sm uppercase tracking-wide opacity-60">Time Remaining</p>
          <p className="text-lg font-semibold">{formatTime(timeLeft)}</p>
        </div>

        {/* Board Control */}
        <div>
          <p className="text-sm uppercase tracking-wide opacity-60">
            Your Control
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-1">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${controlPercent}%`,
                backgroundColor: playerColor
              }}
            />
          </div>

          <p className="text-sm mt-1 font-semibold">
            {controlPercent}%
          </p>
        </div>

        {/* Player Color */}
        <div>
          <p className="text-sm uppercase tracking-wide opacity-60">
            Your Colour
          </p>
          <div
            className="w-8 h-8 rounded-lg border mt-1"
            style={{ backgroundColor: playerColor }}
          />
        </div>

        {/* Leave Button */}
        <button
          onClick={leaveGame}
          className="w-full bg-gray-300 hover:bg-gray-400 rounded py-2 mt-4"
        >
          Leave Game
        </button>
      </aside>

    {/* winning screen overlay */}

      {gameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[400px] text-center">
      
            <h2 className="text-3xl font-bold mb-4">
              Game Over
            </h2>
      
            <div className="flex flex-col items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-xl border-4 border-gray-300"
                style={{ backgroundColor: winner }}
              />
      
              {playerColor === winner ? (
                <p className="text-2xl font-semibold text-green-600">
                  🎉 You Won!
                </p>
              ) : (
                <p className="text-2xl font-semibold text-red-500">You Lost :(</p>
              )}
      
              <p className="text-lg">
                {winner} controlled the most territory.
              </p>
            </div>
      
            <div className="flex gap-4">
              <button
                onClick={goToMenu}
                className="flex-1 bg-gray-300 hover:bg-gray-400 rounded py-2"
              >
                Game Menu
              </button>
      
              <button
                onClick={goToDashboard}
                className="flex-1 bg-black text-white hover:bg-gray-800 rounded py-2"
              >
                View Stats
              </button>
            </div>
      
          </div>
        </div>
      )}
  
      </main>
    </>
  );
}