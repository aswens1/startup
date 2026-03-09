import React from 'react';
import { MessageDialog } from './messageDialog';

export function Unauthenticated({ userName: initialUserName, onLogin }) {
  const [userName, setUserName] = React.useState(initialUserName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function registerUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main className="min-h-0 flex-1 flex flex-col items-center px-4">
      <div className="bg-white/85 rounded-xl px-6 py-8 md:px-8 md:py-10 max-w-4xl w-full flex flex-col items-center text-center min-h-0 flex-1 overflow-y-auto max-h-[calc(100vh-12rem)]">

        <div className="auth-forms grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-8">

          {/* Login */}
          <div className="auth-form flex flex-col gap-3 text-left">
            <h2>Login</h2>

            <label htmlFor="login-username">Username:</label>
            <input
              type="text"
              id="login-username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={loginUser}
              disabled={!userName || !password}
            >
              Login
            </button>
          </div>

          {/* Register */}
          <div className="auth-form flex flex-col gap-3 text-left">
            <h2>Register</h2>

            <label htmlFor="register-username">Username:</label>
            <input
              type="text"
              id="register-username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            <label htmlFor="register-password">Password:</label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={registerUser}
              disabled={!userName || !password}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />

    </main>
  );
}