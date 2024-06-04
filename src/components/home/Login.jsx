import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase.js';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';


const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(`¡Bienvenido, ${result.user.displayName}!`, { autoClose: 4000 });
        navigate('/');
      }).catch((error) => {
        console.error(error);
        toast.error('Error al iniciar sesión', { autoClose: 2000 });
      });
  }

  return (
    <button onClick={signInWithGoogle} style={{
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      Iniciar sesión <span style={{ marginLeft: "10px" }}><GoogleIcon /></span>
    </button>
  );
};

export default Login;