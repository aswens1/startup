import React from 'react';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';

export function Leaderboard() {
  return (

    <>
    
      <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
        <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center md:gap-y-5">

            <h1 className="font-['Jersey_10'] text-[rem] tracking-wider leading-[0.9]" id="main-title">Leaderboard</h1>
            <p className="mt-6 text-xl">Place more pixels in the lobby and the games to see your name on the leaderboard!</p>

            <div className="leaderboard-scroll mt-0">
                <table className="w-full border-separate border-spacing-x-6">
                    <thead className="text-xl">
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>tempPlayer1</td>
                            <td>1500</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>tempPlayer2</td>
                            <td>1450</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>tempPlayer3</td>
                            <td>1400</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    </>
  );
}