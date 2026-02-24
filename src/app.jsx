import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { AuthState } from './getStarted/authState.js';

import { CollaborativeCanvas } from './collabCanvas/collabCanvas.jsx';
import { GameCanvas } from './game/gameCanvas.jsx';
import { Login } from './getStarted/getStarted.jsx';
import { Leaderboard } from './leaderboard/leaderboard.jsx';
import { GameSelectionMenu } from './selectMenu/selectMenu.jsx';
import { Landing } from './landing/landing.jsx';
import { Dashboard } from './dashboard/dashboard.jsx';

function NavDropdown({ label, isAuthenticated }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  return (
    <div className="nav-dropdown" ref={ref}>
      <button
        type="button"
        className={`nav-dropdown-trigger ${open ? 'is-open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <span className="nav-dropdown-chevron" aria-hidden>▾</span>
      </button>
      {open && (
        <ul className="nav-dropdown-menu" role="menu">
          {isAuthenticated && (
            <>
              <li><NavLink to="/dashboard" className="nav-link" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
              <li><NavLink to="/gameMenu" className="nav-link" onClick={() => setOpen(false)}>Join a Game</NavLink></li>
              <li><NavLink to="/leaderboard" className="nav-link" onClick={() => setOpen(false)}>Leaderboard</NavLink></li>
              <li><NavLink to="/collabCanvas" className="nav-link" onClick={() => setOpen(false)}>Collaborative Canvas</NavLink></li>
              <li><NavLink to="/gameCanvas" className="nav-link" onClick={() => setOpen(false)}>Play the Game</NavLink></li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}


export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const isAuthenticated = authState === AuthState.Authenticated;

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    setUserName('');
    setAuthState(AuthState.Unauthenticated);
    navigate('/');
  }
  

  return (
      <div className="app-layout">
        <header>
          <nav className="app-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/howToPlay" className="nav-link">How to Play</NavLink>
            {authState === AuthState.Authenticated && (
              <NavDropdown label="More" isAuthenticated={isAuthenticated}/>
            )}

            {authState === AuthState.Authenticated && (
              <button
                onClick={() => logout()}
                className='nav-link'
                style={{ background:'none', border:'none', cursor:'pointer' }}
                >Logout</button>
            )}
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/gameMenu" element={<GameSelectionMenu />} />
            <Route path="/dashboard" element={<Dashboard userName={userName} />} />
            <Route path="/howToPlay" element={<HowToPlay />} />
            <Route
              path='/login'
              element={
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                  }}
                />
              }
            />
            <Route path="/collabCanvas" element={<CollaborativeCanvas />} />
            <Route path="/gameCanvas" element={<GameCanvas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer>
          <small>&copy; <span>2026</span></small> <span>|</span>{' '}
          <span>
            <a href="https://github.com/aswens1/startup" className="footer-link">
              Source Code
            </a>
          </span>
        </footer>
      </div>
  );
}

// function HowToPlay() {
//   return (
//     <div className="hero">
//       <div className="content">
//         <h1>{title}</h1>
//         <p>Placeholder — add content when ready.</p>
//       </div>
//     </div>
//   );
// }

function HowToPlay() {
  return (
    <>
      <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
        <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-start flex-col text-left">
          <h1 className='text-center'>How to Play</h1>
          <p className='text-lg'>Welcome to 8 Bit Alley! Login to get started!</p>
          <p>The first thing you'll see is the dashboard! This displays your stats: number of pixels coloured, games played, win rate, and streak.</p>
          <p>Click 'Play a Game' to go to the game menu! Here, you can browse existing games and join them, or create one yourself!</p>
        </div>
      </main>
    </>
  )
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