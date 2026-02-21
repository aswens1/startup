import React from 'react';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { useNavigate, NavLink } from "react-router-dom";

import { AuthState } from './authState.js';

export function Login() {





  return (
    <>
      <main className="min-h-0 flex-1 flex flex-col items-center py-10 px-4">

      <div className="bg-white/85 rounded-xl px-6 py-8 md:px-8 md:py-10 max-w-4xl w-full flex flex-col items-center text-center min-h-0 flex-1 overflow-y-auto max-h-[calc(100vh-12rem)]">

          <div className="auth-forms grid grid-cols-1 md:grid-cols-2 max-w-4xl">
              {/* <!-- login --> */}
              <div>
                  <form action="/login" method="post" className="auth-form">
                      <h2>Login</h2>
                      <label for="login-username">Username:</label>
                      <input type="text" id="login-username" name="username" required />
                      <label for="login-password">Password:</label>
                      <input type="password" id="login-password" name="password" required />
                      <button type="submit">Login</button>
                  </form>
              </div>

              {/* <!-- register --> */}
              <div>
                  <form action="/register" method="post" className="auth-form">
                      <h2>Register</h2>
                      <label for="register-username">Username:</label>
                      <input type="text" id="register-username" name="username" required />
                      <label for="register-password">Password:</label>
                      <input type="password" id="register-password" name="password" required />
                      <button type="submit">Register</button>
                  </form>
              </div>
          </div>

      </div>


      </main>

    </>

  );
}