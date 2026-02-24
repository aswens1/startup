import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// function ColorButtons({ colors, selectedColor, setSelectedColor }) {
//   return (
//     <div className="grid grid-cols-4 gap-3 mb-4">
//       {colors.map((color, index) => {
//         const isSelected = selectedColor === color;

//         return (
//           <button
//             key={index}
//             onClick={() => setSelectedColor(color)}
//             className={`
//               aspect-square rounded-xl
//               transition-all duration-200
//               shadow-sm
//               hover:shadow-md hover:-translate-y-0.5
//               border
//               ${isSelected 
//                 ? "border-black scale-105 ring-2 ring-black/20" 
//                 : "border-gray-200"}
//             `}
//             style={{ backgroundColor: color }}
//           />
//         );
//       })}
//     </div>
//   );
// }

function ColorButtons({ colors, selectedColor, setSelectedColor }) {
  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {colors.map((color, index) => {
        const isSelected = selectedColor === color;

        return (
          <button
            key={index}
            onClick={() => setSelectedColor(color)}
            className={`
              w-8 h-8
              rounded-xl
              border
              transition-all duration-200
              ${isSelected
                ? "border-black ring-2 ring-black/20"
                : "border-gray-200"}
            `}
          >
            <div
              className="w-full h-full"
              style={{ backgroundColor: color }}
            />
          </button>
        );
      })}
    </div>
  );
}

function pixelClick(row, col) {
  if (!selectedColor) return;

  setBoard(prevBoard => {
    const newBoard = prevBoard.map(r => [...r]);
    newBoard[row][col] = selectedColor;
    return newBoard
  });
}

export function GameCanvas() {

  const gridSize = 20;

  const [board, setBoard] = useState(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
  )

  const [availableColors, setAvailableColors] = useState([
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#facc15"
  ]);

  const [selectedColor, setSelectedColor] = useState(null);

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
        <div className="h-full w-full rounded-xl">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              width: "min(80vh, 80vw)",
              aspectRatio: "1/1",
              // gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            { board.map((row, rowIndex ) =>
            row.map((cellColor, colIndex) => 
            <div 
            key={`${rowIndex}-${colIndex}`}
            onClick={() => pixelClick(rowIndex, colIndex)}
            className="border border-gray-200"
            style={{backgroundColor: cellColor || "white "}} 
            />
            ))}
          </div>
        </div>
      </div>



      <aside id="control-panel" className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 
             bg-white/90 backdrop-blur-md p-4 rounded-l-lg 
             shadow-lg w-64 z-20 flex-col">
        <div className="panel-section">
          <h2 className="text-xl font-bold mb-4">Controls</h2>
          <p>Player: Player1</p>
          <p>Active Players: 12</p>
          <p>Teams: 2</p>
          <p>Status: in progress</p>
          <p>Timer: 5 minutes left</p>
          <p>Websocket will update the game state in real-time</p>

          <br />
          <ColorButtons
            colors={availableColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

          <Link to='/leaderboard' className='w-full bg-gray-300 hover:bg-gray-400 rounded py-2 mb-2
          block text-center no-underline text-black'>Leaderboard</Link>
          <button className="w-full bg-gray-300 hover:bg-gray-400 rounded py-2">Leave Game</button>

        </div>

      </aside>

    </main>


    </>
  );
}