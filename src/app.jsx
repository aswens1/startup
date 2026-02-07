import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    
            <header>
                <nav>
                    <a href="../index.html">Home</a>
                    <a href="../pages/leaderboard.html">Leaderboard</a>
                    <a href="../pages/gameSelectionMenu.html">Join a Game</a>
                    <a href="../pages/collaborativeCanvas.html">Collaborative Canvas</a>
                    <a href="../pages/gamePlayCanvas.html">Play the Game</a>
                </nav>
            </header>

            {/* <main class="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
                <div class="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center">
                    <h1 class="font-['Jersey_10'] text-[7rem] tracking-wider leading-[0.9]">8 Bit Alley</h1>

                    <a href="../pages/getStarted.html"
                    class="mt-8 font-['Jersey_10'] text-3xl tracking-widest px-10 py-3 border-4 border-black rounded-lg shadow-[0_6px_0_#111] hover:-translate-y-1 hover:shadow-[0_8px_0_#111] active:translate-y-1 transition"
                    >Get Started</a>
                </div>
            </main> */}

            <main>App components go here</main>

            <footer>
                <small>&copy; <span>2026</span></small> <span>|</span> <span><a href="https://github.com/aswens1/startup">Alyse's github repo</a></span>
            </footer>

  </div>;
}