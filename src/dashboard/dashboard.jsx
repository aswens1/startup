import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { useNavigate, NavLink } from "react-router-dom";


export function Dashboard() {
  return (
    <>

        <main className="min-h-[calc(100vh-160px)] flex justify-center pt-20 pb-20">
            <div className="bg-white/85 rounded-xl px-8 py-16 max-w-3xl w-full flex justify-center flex-col items-center text-center">
                Welcome to 8bit alley!
            </div>
        </main>
    </>
  );
}