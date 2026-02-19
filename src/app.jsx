import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CollaborativeCanvas } from './collabCanvas/collabCanvas.jsx';
import { GameCanvas } from './gameCanvas/gameCanvas.jsx';
import { Login } from './getStarted/getStarted.jsx';
import { Leaderboard } from './leaderboard/leaderboard.jsx';
import { GameSelectionMenu } from './selectMenu/selectMenu.jsx';
import { Landing } from './landing/landing.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Landing /> } exact />
        <Route path='/leaderboard' element={ <Leaderboard /> } />
        <Route path='/gameMenu' element={ <GameSelectionMenu /> } />
        <Route path='/login' element={ <Login />} />                
        <Route path='/collabCanvas' element={ <CollaborativeCanvas /> } />
        <Route path='/gameCanvas' element={ <GameCanvas /> } />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <footer>
          <small>&copy; <span>2026</span></small> <span>|</span> <span><a href="https://github.com/aswens1/startup" className='!no-underline text-black'>Source Code</a></span>
      </footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <>
      <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
        <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center">
          <p className='text-lg'>404: Return to sender. Address unknown.</p>
        </div>
      </main>
    </>
  );
}