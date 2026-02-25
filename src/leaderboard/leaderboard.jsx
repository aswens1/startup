import React, { useEffect, useState } from 'react';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';

export function Leaderboard() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const allKeys = Object.keys(localStorage);

        const statsKeys = allKeys.filter(key => key.startsWith('game_stats_'));
    
        const leaderboardData = statsKeys.map(key => {
            const userName = key.replace('game_stats_', '');
            const stats = JSON.parse(localStorage.getItem(key))
    
            return {
                userName,
                pixelsPlaced: stats?.pixels || 0,
            };
        }).filter(player => player.userName && player.userName.trim() !== '');


        leaderboardData.sort((a, b) => 
        b.pixelsPlaced - a.pixelsPlaced);

        setPlayers(leaderboardData);
    }, []);

  return (

    <>
      <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
        <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center md:gap-y-5">

            <h1 className="font-['Jersey_10'] text-[rem] tracking-wider leading-[0.9]" id="main-title">Leaderboard</h1>
            <p className="mt-6 text-xl">Place more pixels to see your name on the leaderboard!</p>

            <div className="leaderboard-scroll mt-0">
                <table className="w-full border-separate border-spacing-x-6 table-fixed">
                    <thead className="text-xl border-b">
                        <tr>
                            <th className="w-1/2 text-left px-6 py-4">Rank</th>
                            <th className="w-1/2 text-left px-6 py-4">Username</th>
                            <th className="w-1/2 text-left px-6 py-4">Pixels Placed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.length === 0 ? (
                            <tr>
                                <td colSpan="3" className='pt-6'>
                                    No players yet
                                </td>
                            </tr>
                        ) : (
                            players.map((player, index) => (
                                <tr key={player.userName}>
                                    <td>{index + 1}</td>
                                    <td>{player.userName}</td>
                                    <td>{player.pixelsPlaced}</td>
                                </tr>
                            ))
                        )} 
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    </>
  );
}