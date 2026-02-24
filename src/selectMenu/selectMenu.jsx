import { React, use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import { GAME_MODES } from '../game/gameModes';

export function GameSelectionMenu() {

  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const savedGames = localStorage.getItem(`games`);
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`games`, JSON.stringify(games));
  }, [games]);


  return (
    <main className="min-h-0 flex-1 flex flex-col items-center py-10 px-4">
      <div
        className="bg-white/85 rounded-xl px-6 py-8 md:px-8 md:py-10 max-w-5xl w-full flex flex-col items-center text-center min-h-0 flex-1 overflow-y-auto max-h-[calc(100vh-12rem)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">

          <div className="flex flex-col min-h-0">
            <h1 className="font-['Jersey_10'] text-3xl md:text-[4rem] mb-0">Join a Game</h1>

            <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectedGameId) return;

              setGames(prevGames => 
                prevGames.map(game =>
                  game.id === selectedGameId
                  ? {
                    ...game,
                    players: game.players + 1,
                    status:
                      game.players + 1 >= game.maxPlayers
                      ? 'Full'
                      : 'Waiting for Players'
                  }
                  : game 
                ));
                navigate(`/game/${selectedGameId}`);
            }}
              className="flex flex-col min-h-0 flex-1">
              <div className="overflow-y-auto max-h-80 md:max-h-96 p-4 mb-4 text-left space-y-4 flex-shrink-0">
                
                {games.length === 0 && (
                  <div className="opacity-75 text-center">Create a new game to start playing!</div>
                )}

                {games.map((game, index) => (
                  <div className="game-option">
                    <label className="game-card">
                      <input
                        type='radio'
                        name='game'
                        value={game.id}
                        checked={selectedGameId === game.id}
                        onChange={() => setSelectedGameId(game.id)}
                      />
                      <div className="game-info">
                        <div className="game-title">{game.name}</div>
                        <div className="meta">
                          <span>Game Type:</span> {game.type}<br />
                          <span>Players:</span> {game.players} / {game.maxPlayers}<br />
                          <span>Teams:</span> {game.teams}<br />
                          <span>Colour Scheme:</span> {game.colours}<br />
                          <span>Status:</span> {game.status}                          
                        </div>
                      </div>
                    </label>
                  </div>  
                ))}
              </div>
              <button className="get-started-btn flex-shrink-0 mt-auto" type="submit">Join Selected Game</button>
            </form>
          </div>

          <div className="flex flex-col min-h-0">
            <h1 className="font-['Jersey_10'] text-3xl md:text-[4rem]">Create a Game</h1>

            <div className="overflow-y-auto max-h-80 md:max-h-96 p-4 mb-4 text-left flex-1 min-h-0">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                
                const newGame = {
                  id: Date.now(),
                  name: formData.get('gameName'),
                  type: formData.get('gameType'),
                  teams: formData.get('numberOfTeams'),
                  players: 0,
                  maxPlayers: 20,
                  status: 'Waiting for players',
                  colours: 'Default'
                };

                setGames(prev => [...prev, newGame]);

                e.target.reset();
              }} className="grid grid-cols-1 gap-5 md:gap-7" id="create-game">
                <div className="create-game-section">
                  <label htmlFor="game-name">Game Name:</label>
                  <input className="input w-full" type="text" id="game-name" name="gameName" required />
                </div>
                <div className="create-game-section">
                  <label htmlFor="game-type">Game Type:</label>
                  <select className="input w-full" id="game-type" name="gameType" required>
                    <option></option>
                    {Object.entries(GAME_MODES).map(([key, mode]) => (
                      <option key={key} value={key}>
                        {mode.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="create-game-section">
                  <label htmlFor="number-of-teams">Number of Teams:</label>
                  <input className="input w-full" type="number" id="number-of-teams" name="numberOfTeams" required />
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