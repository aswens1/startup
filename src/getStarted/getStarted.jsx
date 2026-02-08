import React from 'react';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';

export function Login() {
  return (
    <>
    <Header />

    <main className="min-h-[calc(100vh-160px)] flex flex-col justify-center items-center pt-20 pb-20">

      <div className="bg-white/85 rounded-xl px-8 py-12 max-w-3xl w-full flex flex-col items-center text-center overflow-auto">

        <h1 className="get-started-title" id="main-title">8 Bit Alley</h1>

          <div className="auth-forms">
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

    <Footer />
    </>

  );
}