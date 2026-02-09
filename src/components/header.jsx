import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <nav className='flex justify-center gap-8'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/gameMenu">Join a Game</NavLink>
            <NavLink to="/collabCanvas">Collaborative Canvas</NavLink>
            <NavLink to="/gameCanvas">Play the Game</NavLink>
            </nav>
        </header>
    );
}