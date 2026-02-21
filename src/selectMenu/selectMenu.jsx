import React from 'react';
import '../app.css';

export function GameSelectionMenu() {
  return (
    <main className="min-h-0 flex-1 flex flex-col items-center py-10 px-4">
      <div
        className="bg-white/85 rounded-xl px-6 py-8 md:px-8 md:py-10 max-w-5xl w-full flex flex-col items-center text-center min-h-0 flex-1 overflow-y-auto max-h-[calc(100vh-12rem)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">

          <div className="flex flex-col min-h-0">
            <h1 className="font-['Jersey_10'] text-3xl md:text-[4rem] mb-0">Join a Game</h1>

            <form action="gamePlayCanvas.html" method="get" className="flex flex-col min-h-0 flex-1">
              <div className="overflow-y-auto max-h-80 md:max-h-96 p-4 mb-4 text-left space-y-4 flex-shrink-0">
                <div className="game-option">
                  <label className="game-card">
                    <input type="radio" id="game1" name="game" value="pixel-chaos" />
                    <div className="game-info">
                      <div className="game-title">Mock Game 1</div>
                      <div className="meta">
                        <span>Game Type:</span> Pixel Chaos<br />
                        <span>Players:</span> 12 / 20<br />
                        <span>Teams:</span> 4<br />
                        <span>Colour Scheme:</span> Neon<br />
                        <span>Status:</span> In Progress
                      </div>
                    </div>
                  </label>
                </div>
                <div className="game-option">
                  <label className="game-card">
                    <input type="radio" id="game2" name="game" value="retro-wall" />
                    <div className="game-info">
                      <div className="game-title">Mock Game 2</div>
                      <div className="meta">
                        <span>Game Type:</span> Retro Wall<br />
                        <span>Players:</span> 6 / 10<br />
                        <span>Teams:</span> 2<br />
                        <span>Colour Scheme:</span> 8-Bit Retro<br />
                        <span>Status:</span> Waiting for Players
                      </div>
                    </div>
                  </label>
                </div>
                <div className="game-option">
                  <label className="game-card">
                    <input type="radio" id="game3" name="game" value="color-riot" />
                    <div className="game-info">
                      <div className="game-title">Mock Game 3</div>
                      <div className="meta">
                        <span>Game Type:</span> Color Riot<br />
                        <span>Players:</span> 18 / 30<br />
                        <span>Teams:</span> None (Free Draw)<br />
                        <span>Colour Scheme:</span> High Contrast<br />
                        <span>Status:</span> Almost Full
                      </div>
                    </div>
                  </label>
                </div>
                <div className="game-option">
                  <label className="game-card">
                    <input type="radio" id="game4" name="game" value="color-riot" />
                    <div className="game-info">
                      <div className="game-title">Mock Game 4</div>
                      <div className="meta">
                        <span>Game Type:</span> Color Riot<br />
                        <span>Players:</span> 18 / 30<br />
                        <span>Teams:</span> None (Free Draw)<br />
                        <span>Colour Scheme:</span> High Contrast<br />
                        <span>Status:</span> Almost Full
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <button className="get-started-btn flex-shrink-0 mt-auto" type="submit">Join Selected Game</button>
            </form>
          </div>

          <div className="flex flex-col min-h-0">
            <h1 className="font-['Jersey_10'] text-3xl md:text-[4rem]">Create a Game</h1>

            <div className="overflow-y-auto max-h-80 md:max-h-96 p-4 mb-4 text-left flex-1 min-h-0">
              <form action="/createGame" method="post" className="grid grid-cols-1 gap-5 md:gap-7" id="create-game">
                <div className="create-game-section">
                  <label htmlFor="game-name">Game Name:</label>
                  <input className="input w-full" type="text" id="game-name" name="gameName" required />
                </div>
                <div className="create-game-section">
                  <label htmlFor="game-type">Game Type:</label>
                  <select className="input w-full" id="game-type" name="gameType" required>
                    <option value=""></option>
                    <option value="filler1">filler type 1</option>
                    <option value="filler2">filler type 2</option>
                    <option value="filler3">filler type 3</option>
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