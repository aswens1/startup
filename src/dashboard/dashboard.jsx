import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-xl shadow-md px-6 py-6 flex flex-col items-center min-w-[120px]">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-2 opacity-70">{label}</div>
    </div>
  );
}

export function Dashboard({ userName }) {

  // stats are stored locally for now, start at zero

  const [stats, setStats] = useState({
    pixels: 0,
    gamesPlayed: 0,
    wins: 0,
    streak: 0,
  });

  useEffect(() => {
    const key = `game_stats_${userName}`;
    const savedStats = localStorage.getItem(key);

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      const defaultStats = {
        pixels: 0,
        gamesPlayed: 0,
        wins: 0,
        streak: 0,
      };

      const mergedStats = {
        ...defaultStats,
        ...savedStats,
      };
      
      setStats(mergedStats);
      localStorage.setItem(key, JSON.stringify(mergedStats));
    }
  }, [userName]);

  useEffect(() => {
    localStorage.setItem(`game_stats_${userName}`, JSON.stringify(stats));
  }, [stats, userName]);

  return (
    <>
      <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
          <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-start flex-col items-center text-center">
            <h1 className="font-['Jersey_10']">Hi {userName}!</h1>
            <div className="flex flex-wrap justify-center gap-6">
              <StatCard value={stats.pixels} label="Pixels Placed" />
              <StatCard value={stats.gamesPlayed} label="Games Played" />
              <StatCard value={stats.wins ?? 0} label="Wins" />
              {/* <StatCard value={stats.streak} label="Streak" /> */}
            </div>

            <div className="flex gap-6 mt-8">
              <Link to="/gameMenu"
                className="font-['Jersey_10'] text-3xl tracking-widest px-10 py-3 
                border-4 border-black rounded-lg 
                shadow-[0_6px_0_#111] 
                hover:-translate-y-1 hover:shadow-[0_8px_0_#111] 
                active:translate-y-1 transition
                !no-underline text-black !hover:no-underline"
              >Play a Game!</Link>

              <Link to="/leaderboard"
                className="font-['Jersey_10'] text-3xl tracking-widest px-10 py-3 
                border-4 border-black rounded-lg 
                shadow-[0_6px_0_#111] 
                hover:-translate-y-1 hover:shadow-[0_8px_0_#111] 
                active:translate-y-1 transition
                !no-underline text-black !hover:no-underline"
              >Leaderboard!</Link>
            </div>
        
          </div>
      </main>
    </>
  );
}