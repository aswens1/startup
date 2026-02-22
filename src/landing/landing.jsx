import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { useNavigate, NavLink } from "react-router-dom";


export function Landing() {
  return (
    <>
      <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
          <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center">
              <h1 className="font-['Jersey_10'] text-[7rem] tracking-wider leading-[0.9]" id="main-title">8 Bit Alley</h1>

              <Link to="/login"
              className="mt-8 font-['Jersey_10'] text-3xl tracking-widest px-10 py-3 
              border-4 border-black rounded-lg 
              shadow-[0_6px_0_#111] 
              hover:-translate-y-1 hover:shadow-[0_8px_0_#111] 
              active:translate-y-1 transition
              !no-underline text-black !hover:no-underline"
              >Get Started</Link>
          </div>
      </main>
    </>
  );
}