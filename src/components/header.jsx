import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/gameMenu">Join a Game</NavLink>
            <NavLink to="/collabCanvas">Collaborative Canvas</NavLink>
            <NavLink to="/gameCanvas">Play the Game</NavLink>
            </nav>
        </header>
    );
}