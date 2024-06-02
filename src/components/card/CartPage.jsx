import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { db, auth } from '../../firebase.js';
import { Grid, TextField, Button, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../user/UserContext.jsx';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'center',
    height: '30vh',
    backgroundColor: '#f5f5f5',
  },
  paper: {
    padding: '16px',
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
    marginTop: '8px',
    color: '#ffffff',
    backgroundColor: '#3f51b5',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  gridCompra: {
    padding: '8px',
    backgroundColor: '#ffffff',
  },
  ruta: {
    marginTop: 20,
    fontSize: '1.8em',
    color: '#3f51b5',
    marginBottom: 20,
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
});

const CartPage = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [isMounted, setIsMounted] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.precio, 0);
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
        toast.success(`Compra realizada con éxito! Tu ID de orden es: ${docRef.id}`);
        clearCart();
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

  const handlePurchaseWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      handlePurchase();
    } catch (error) {
      console.error(error);
    }
  };

  if (cart.length === 0) {
    return (
      <Box className={classes.root}>
        <Box className={classes.messageBox}>
          <Typography variant="h6">Tu carrito está vacío.</Typography>
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

  return (
    <div>
      <p>Items en el carrito: {totalItems}</p>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Paper className={classes.paper}>
              <img src={item.imagen} alt={item.nombre} className={classes.image} />
              <Typography variant="h5" component="h2" className={classes.ruta}>
                <ModeOfTravelIcon /> {item.origen} <span className={classes.spanRuta}>(origen)</span>  <ArrowForwardIcon className={classes.ArrowForwardIcon} /> {item.destino} <span className={classes.spanRuta}>(destino)</span>
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
      <p>Total: {totalPrice}</p>
      <Grid className={classes.gridCompra} container direction="column" spacing={2}>
        <form noValidate >
          <Typography variant="h6" component="h2">
            Formulario de Compra
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Por favor, rellena todos los campos para realizar la compra.
          </Typography>
          <Grid item>
            <TextField required value={name} onChange={(e) => setName(e.target.value)} label="Nombre y Apellido" defaultValue={user?.displayName} />
          </Grid>
          <Grid item>
            <TextField required value={phone} onChange={(e) => setPhone(e.target.value)} label="Teléfono" />
          </Grid>
          <Grid item>
            <TextField required value={email} onChange={(e) => setEmail(e.target.value)} label="Correo electrónico" defaultValue={user?.email} />
          </Grid>
          {!user?.email && (
            <Grid item>
              <TextField required value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} label="Confirmar correo electrónico" />
            </Grid>
          )}
          <Grid item>
  {user?.email ? (
    <>
      <Button
        onClick={handlePurchase}
        disabled={!user || (!user?.email && email !== confirmEmail) || !name || !phone}
      >
        Realizar compra
      </Button>
    </>
  ) : (
    <>
      <Button
        onClick={handlePurchase}
        disabled={!user || (!user?.email && email !== confirmEmail) || !name || !phone}
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
    </div>
  );
};

export default CartPage;