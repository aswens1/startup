import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GameEngine } from "./gameEngine";
import { CaptureMode } from "./modes/captureMode";

export function GameCanvas() {

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
    setBoard(prev => engine.handleMove(prev, row, col, playerColor));
  };

  const leaveGame = () => {
    const savedGames = JSON.parse(localStorage.getItem('games') || '[]');
    const updatedGames = savedGames.map(game => 
      game.id === Number(gameId)
      ? {...game, players: Math.max(game.players - 1, 0), status: 'Waiting for Players'}
      : game
    );
    localStorage.setItem('games', JSON.stringify(updatedGames));
    localStorage.removeItem('currentGame');
    navigate('/gameMenu');
  };

  // fake websocket data for controls bar
  const [playerCount, setPlayerCount] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30); // 5 mins
  const [controlPercent, setControlPercent] = useState(27);

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

  const [statsUpdated, setStatsUpdated] = useState(false);

  useEffect(() => {
    if (!gameOver || !winner || statsUpdated) return;

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

      await fetch(`/api/stats`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(statsUpdate),
      });

      setStatsUpdated(true);
    }
    updateStats();
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

        {/* <aside className="fixed right-0 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-l-lg shadow-lg w-64">
          <h2 className="text-xl font-bold mb-4">Controls</h2>
          <p>Player Color:</p>
          <div
            className="w-8 h-8 rounded-xl border"
            style={{ backgroundColor: playerColor }}
          />
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 rounded py-2 mt-4"
            onClick={leaveGame}
          >
            Leave Game
          </button>
        </aside> */}

      <aside className="fixed right-0 top-1/2 -translate-y-1/2 
        bg-white/90 backdrop-blur-md p-5 rounded-l-xl 
        shadow-xl w-72 flex flex-col gap-4">

        <h2 className="text-2xl font-bold">Game Info</h2>

        {/* Player Count */}
        <div>
          <p className="text-sm uppercase tracking-wide opacity-60">Players</p>
          <p className="text-lg font-semibold">{playerCount} / 4</p>
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