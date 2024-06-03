import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { db, auth } from '../../firebase.js';
import { Grid, TextField, Button, Typography, Box, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../user/UserContext.jsx';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48vh',
    padding: '16px',
    width: '100vw',
    marginTop: '20vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    padding: '50px',
    width: { xs: '50vw', sm: '100vw' },
    backgroundColor: '#ffffff',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
  },
  paper: {
    position: 'relative',
    padding: { xs: '10px', sm: '16px' },
    textAlign: 'center',
    color: '#757575',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  title: {
    color: '#3f51b5',
    margin: '16px 0',
  },
  price: {
    margin: '8px 0',
  },
  quantity: {
    margin: '8px 0',
  },
  pos: {
    marginBottom: 12,
  },
  messageBox: {
    padding: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    color: '#ffffff',
    backgroundColor: '#3f51b5',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  gridCompra: {
    backgroundColor: '#ffffff',
    padding: '16px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    width: { xs: "70vw", sm: '50vw' },
  },
  ruta: {
    marginTop: 10,
    fontSize: '1rem',
    color: '#3f51b5',
    marginBottom: 10,
  },
  horario: {
    marginTop: 5,
    fontSize: '1rem',
    fontStyle: 'italic',
    marginBottom: 5,
    color: 'green',
  },
  spanRuta: {
    fontWeight: 'bold',
    fontSize: '0.8em',
    fontStyle: 'italic',
  },
  ArrowForwardIcon: {
    position: 'relative',
    top: '5px',
    color: "black"
  },
  typography: {
    color: 'black',
    boxShadow: '0 0 10px rgba(255,0,0,0.5)',
    padding: '10px',
    borderRadius: '4px',
    alignContent: 'center',
    width: '24vw',
    '@media (max-width:600px)': {
      fontSize: '0.5rem',
      marginBottom: '20px',
    },
    '@media (min-width:600px)': {
      fontSize: '0.8rem',
      marginBottom: '20px',
    },
  },
  clearCart: {
    color: 'black',
    boxShadow: '0 0 10px rgba(255,0,255,0.5)',
    padding: '10px',
    borderRadius: '4px',
    alignContent: 'center',
    width: '10vw',
    '@media (max-width:600px)': {
      fontSize: '0.5rem',
      marginBottom: '20px',
    },
    '@media (min-width:600px)': {
      fontSize: '0.8rem',
      marginBottom: '20px',
    },
  },
});

const CartPage = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [isMounted, setIsMounted] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);

  const handlePurchase = async () => {

    const order = {
      name: name,
      phone: phone,
      email: email,
      items: cart,
      total: totalPrice,
      date: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      if (isMounted) {
        toast.success(`Compra realizada con éxito! Tu ID de orden es: ${docRef.id}`, {
          autoClose: false
        });
        clearCart();
        navigate(`/order/${docRef.id}`);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      }).catch((error) => {
        console.error(error);
      });
  };

  if (cart.length === 0) {
    return (
      <Box className={classes.root}>
        <Box className={classes.messageBox}>
          <Typography variant="h3" color="secondary">
            ¡Tu carrito está vacío!
            <br />
            Explora nuestra tienda y descubre productos increíbles.
          </Typography>
          <Button
            className={classes.button}
            onClick={() => navigate('/category/interurbanos')}
          >
            Ir a comprar pasajes
          </Button>
        </Box>
      </Box>
    );
  }

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className={classes.container}>
      <Box mb={2}>
        <Typography variant="h6">
          Productos en el carrito: <span style={{ fontWeight: 'bold' }}>{totalItems}</span>
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Paper className={classes.paper}>
              <IconButton
                style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                onClick={() => handleRemoveItem(item.id)}
              >
                <CloseIcon />
              </IconButton>
              <img src={item.imagen} alt={item.nombre} className={classes.image} />
              <Typography variant="h5" component="h2" className={classes.ruta}>
                <ModeOfTravelIcon /> {item.origen}  <ArrowForwardIcon className={classes.ArrowForwardIcon} /> {item.destino}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.horario}>
                Fecha de Partida: {new Date(item.fecha).toLocaleDateString("es-ES")}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.horario}>
                Horario de Salida: {item.horaSalida} - Horario de Llegada: {item.horaLlegada} <span className={classes.spanRuta}> ({item.horasViaje} hs de viaje)</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.price}>
                $ {item.precio} (por pasaje)
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.quantity}>
                Cantidad de pasajes: {item.quantity}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={8} mb={6}>
        <Typography color="primary" style={{ fontSize: '1rem' }}>
          Valor total: <span style={{ fontWeight: 'bold' }}>$ </span> <span style={{ fontWeight: 'bold' }}>{totalPrice}</span>
        </Typography>
        <Box mt={4}>
          <Button onClick={clearCart} className={classes.clearCart}>Vaciar carrito</Button>
        </Box>
      </Box>
      <Grid className={classes.gridCompra} container direction="column" spacing={2}>
        <form noValidate >
          <Typography variant="h6" component="h2">
            Formulario de Compra
          </Typography>
          <Typography variant="body2" component="p" className={classes.typography}>
            Por favor, rellena todos los campos para realizar la compra
          </Typography>
          <Grid item>
            <TextField fullWidth required value={name} onChange={(e) => setName(e.target.value)} label="Nombre y Apellido" defaultValue={user?.displayName} />
          </Grid>
          <Grid item style={{ marginTop: '1rem' }}>
            <TextField fullWidth required value={phone} onChange={(e) => setPhone(e.target.value)} label="Teléfono" />
          </Grid>
          <Grid item style={{ marginTop: '1rem' }}>
            <TextField fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} label="Correo electrónico" defaultValue={user?.email} />
          </Grid>
          {!user?.email && (
            <Grid item style={{ marginTop: '1rem' }}>
              <TextField fullWidth required value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} label="Confirmar correo electrónico" />
            </Grid>
          )}
          <Grid item style={{ marginTop: '2rem' }}>
            {user?.email ? (
              <>
                <Button
                  onClick={handlePurchase}
                  disabled={!user || (!user?.email && email !== confirmEmail) || !name || !phone}
                  color={(!user || (!user?.email && email !== confirmEmail) || !name || !phone) ? "default" : "primary"}
                  style={{
                    boxShadow: (!user || (!user?.email && email !== confirmEmail) || !name || !phone) ? "none" : "0 0 10px rgba(0,0,0,0.5)",
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  Realizar compra
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handlePurchase}
                  disabled={!user || (!user?.email && email !== confirmEmail) || !name || !phone}
                  color={(!user || (!user?.email && email !== confirmEmail) || !name || !phone) ? "default" : "primary"}
                  style={{
                    boxShadow: (!user || (!user?.email && email !== confirmEmail) || !name || !phone) ? "none" : "0 0 10px rgba(0,0,0,0.5)",
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  Realizar compra
                </Button>
                <Button
                  onClick={signInWithGoogle}
                >
                  Iniciar sesión con Google
                </Button>
              </>
            )}
          </Grid>
        </form>
      </Grid>
      <Button onClick={clearCart}>Vaciar carrito</Button>
    </div>
  );
};

export default CartPage;