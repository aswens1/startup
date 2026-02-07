import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="body bg-dark text-light">
            <header>
                <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
                <NavLink to="/gameMenu">Join a Game</NavLink>
                <NavLink to="/collabCanvas">Collaborative Canvas</NavLink>
                <NavLink to="/gameCanvas">Play the Game</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <small>&copy; <span>2026</span></small> <span>|</span> <span><a href="https://github.com/aswens1/startup">Alyse's github repo</a></span>
            </footer>
        </div>

    );
}