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
        </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}