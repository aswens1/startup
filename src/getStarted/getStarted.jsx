import { Unauthenticated } from './unauthenticated.jsx';
import { AuthState } from './authState.js';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function Login({ userName, authState, onAuthChange }) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if ( authState === AuthState.Authenticated ) {
      navigate('/dashboard');
    } 
  }, [authState, navigate]);

  return (
    <main className="min-h-0 flex-1 flex flex-col items-center py-10 px-4">

      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) =>
            onAuthChange(loginUserName, AuthState.Authenticated)
          }
        />
      )}

    </main>
  );
}