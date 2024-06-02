import React, { useEffect } from 'react';
import { auth } from '../../firebase.js';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      }).catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
      } else {
        console.log('No hay usuario autenticado');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
  );
};

export default Login;