import { React, use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import { GAME_MODES } from '../game/gameModes';
import { GameEngine } from '../game/gameEngine';

export function GameSelectionMenu() {

  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    async function loadGames() {
      const response = await fetch('/api/games', {
        credentials: 'include',
      });

      const data = await response.json();
      setGames(data);
    }

    loadGames();
  }, []);

  const joinGame = async () => {
    if (!selectedGameId) return;

    const response = await fetch(`/api/games/${selectedGameId}/join`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();

    const game = data.game;
    const color = data.color;

    setGames(prev =>
      prev.map(g =>
        g.id === game.id ? game : g
      )
    );

    localStorage.setItem('currentGame', JSON.stringify({ id: selectedGameId, color, colors: game.colors }));
    navigate(`/game/${selectedGameId}`);
  }

  const createGame = async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newGame = {
      name: formData.get('gameName'),
      type: 'capture',
      maxPlayers: Number(formData.get('maxPlayers') || 4),
    };

    const response = await fetch('/api/games', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(newGame),
    });

    const createdGame = await response.json();

    setGames(prev => [...prev, createdGame]);

    e.target.reset();
  }

  return (
    <main className="min-h-0 flex-1 flex flex-col items-center py-10 px-4">
      <div className="bg-white/85 rounded-xl px-6 py-8 md:px-8 md:py-10 max-w-5xl w-full flex flex-col items-center text-center min-h-0 flex-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">
          <div className="flex flex-col min-h-0">

            {/* JOIN GAME  */}
            <h1 className="font-['Jersey_10'] text-3xl md:text-[4rem] mb-0">Join a Game</h1>
            <div className="overflow-y-auto max-h-80 md:max-h-96 p-4 mb-4 text-left space-y-4 flex-shrink-0">
              {games.length === 0 && (
                <div className="opacity-75 text-center">Create a new game to start playing!</div>
              )}

              {games.map(game => (
                <div className="game-option" key={game.id}>
                  <label className={`game-card ${game.players >= game.maxPlayers ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input
                      type="radio"
                      name="game"
                      value={game.id}
                      checked={selectedGameId === game.id}
                      onChange={() => setSelectedGameId(game.id)}
                    />
                    <div className="game-info">
                      <div className="game-title">{game.name}</div>
                      <div className="meta">
                        <span>Players:</span> {game.players} / {game.maxPlayers}<br />
                        <span>Status:</span> {game.status}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {game.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </label>
                </div>
              ))}

              <button className="get-started-btn w-full flex-shrink-0 mt-auto" onClick={joinGame}>Join Selected Game</button>

            </div>
          </div>

          {/* CREATE GAME */}
          <div className="flex flex-col min-h-0">
            <h1 className="font-['Jersey_10'] text-3xl md:text-[4rem]">Create a Game</h1>

            <div className="overflow-y-auto max-h-80 md:max-h-96 p-4 mb-4 text-left flex-1 min-h-0">

              <form onSubmit={createGame} className="grid grid-cols-1 gap-5 md:gap-7" id="create-game">

                <div className="create-game-section">
                  <label htmlFor="game-name">Game Name:</label>
                  <input className="input w-full" type="text" id="game-name" name="gameName" required />
                </div>

                {/* UNCOMMENT IF I ADD MORE GAME TYPES. IT'S FIXED AT 1 FOR NOW */}
                {/* <div className="create-game-section">
                  <label htmlFor="game-type">Game Type:</label>
                  <select className="input w-full" id="game-type" name="gameType" required>
                    <option></option>
                    {Object.entries(GAME_MODES).map(([key, mode]) => (
                      <option key={key} value={key}>
                        {mode.label}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="create-game-section">
                  <label htmlFor="max-players">Max Players (2-4):</label>
                  <input className="input w-full" type="number" id="max-players" name="maxPlayers" min={2} max={4} defaultValue={4} required />
                </div>
                <button className="get-started-btn" type="submit">Create Game</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}