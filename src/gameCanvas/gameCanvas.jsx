import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export function GameCanvas() {

  const gridSize = 20;

  return (
    <>
    <main className="canvas-main flex items-center justify-center p-2 box-border"
    style={{ height: "calc(100vh - 120px)", minHeight: 0 }}>
      <div
        className="aspect-square shrink-0 max-w-full max-h-full"
        style={{
          width: 'min(90vh, 90vw, 700px, calc(100vw - 4rem), calc(100vh - 5rem))',
        }}
      >
      <div className="h-full w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <div key={index} className="border border-gray-200" />
          ))}
        </div>
      </div>
    </div>



      <aside id="control-panel" className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 rounded-l-lg shadow-lg w-64 z-20">
        <div className="panel-section">
          <h2 className="text-xl font-bold mb-4">Controls</h2>
          <p>Player: Player1</p>
          <p>Active Players: 12</p>
          <p>Teams: 2</p>
          <p>Status: in progress</p>
          <p>Timer: 5 minutes left</p>
          <p>Websocket will update the game state in real-time</p>

          <br />
          <div className="flex flex-wrap gap-2 mb-4">
              <button className="w-8 h-8 bg-red-500 rounded border border-black"></button>
              <button className="w-8 h-8 bg-blue-500 rounded border border-black"></button>
              <button className="w-8 h-8 bg-green-500 rounded border border-black"></button>
              <button className="w-8 h-8 bg-yellow-400 rounded border border-black"></button>
          </div>

          <Link to='/leaderboard' className='w-full bg-gray-300 hover:bg-gray-400 rounded py-2 mb-2
          block text-center no-underline text-black'>Leaderboard</Link>
          <button className="w-full bg-gray-300 hover:bg-gray-400 rounded py-2">Leave Game</button>

        </div>
      </aside>

    </main>


    </>
  );
}