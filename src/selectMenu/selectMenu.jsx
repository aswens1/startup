import React from 'react';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';

export function GameSelectionMenu() {
  return (
    <>
    <Header />
    <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
          <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center">

            <div className="grid grid-cols-2 grid-gap-4 overflow-y-auto">

              <div className="grid">
                  <h1 className="font-['Jersey_10'] text-[4rem] mb-0">Join a Game</h1>

                  <form action="gamePlayCanvas.html" method="get">

                    <div className="overflow-y-auto max-h-96 p-4 mb-4 text-left">

                      <div claclassNamess="game-option">
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
      
                    <button className="get-started-btn" type="submit">Join Selected Game</button>
                  </form>
                    
              </div>

              <div >
                  <h1 className="font-['Jersey_10'] text-[4rem] ">Create a Game</h1>

                  <div className="overflow-y-auto md:max-h-96 sd:max-h-80 p-4 mb-6 text-left">

                    <form action="/createGame" method="post" className="grid grid-cols-1 gap-7" id="create-game">

                      <div className="create-game-section">
                        <label for="game-name">Game Name:</label>
                        <input className="input w-full" type="text" id="game-name" name="gameName" required />
                      </div>
                      
                      <div className="create-game-section">
                        <label for="game-type">Game Type:</label>
                        <select className="input w-full" id="game-type" name="gameType" required>
                            <option value=""></option>
                            <option value="filler1">filler type 1</option>
                            <option value="filler2">filler type 2</option>
                            <option value="filler3">filler type 3</option>
                        </select>
                      </div>

                      <div className="create-game-section">
                        {/* <!--add max team/player limit that can't be changed- just won't let them put a number higher than--> */}
                        <label for="number-of-teams">Number of Teams:</label>
                        <input className="input w-full" type="number" id="number-of-teams" name="numberOfTeams" required />
                      </div>

                      <button className="get-started-btn" type="submit">Create Game</button>

                      {/* <!--make it so you can pick between number of teams or number of players? like set max number of players per team, or just a pvp, or etc--> */}
                    </form>

                  </div>
              </div>
            </div>
          </div>
        </main>
    


    <Footer />
    </>
  );
}