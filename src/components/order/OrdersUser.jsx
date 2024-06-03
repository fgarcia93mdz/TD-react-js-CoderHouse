import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase.js';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    margin: '2%',
    width: { xs: "50vw", sm: "40vw" },
  },
  title: {
    color: '#000000',
  },
  hideOnMobile: {
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
});

const OrdersUser = () => {
  const classes = useStyles();
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ordersCollection = collection(db, 'orders');
        const q = query(ordersCollection, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => doc.data());
        if (isMounted) {
          setUserOrders(orders);
          setLoading(false);
        }
      } else {
        console.log('No hay usuario autenticado');
        setLoading(false); 
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (loading) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  );
}

  return (
    <div>
      <Box className={classes.root}>
        <Typography variant="h5" className={classes.title}>Mis Órdenes</Typography>
      </Box>
      <Box boxShadow={3} p={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Destino</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell className={classes.hideOnMobile}>Plataforma</TableCell>
                <TableCell className={classes.hideOnMobile}>Fecha de salida</TableCell>
                <TableCell>Hora de salida</TableCell>
                <TableCell className={classes.hideOnMobile}>Hora de llegada</TableCell>
                <TableCell className={classes.hideOnMobile}>Lugar de partida</TableCell>
                <TableCell>Pasajero</TableCell>
                <TableCell>Valor total</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userOrders.map((order, index) => (
                order.items.map((item, itemIndex) => (
                  <TableRow key={`${index}-${itemIndex}`}>
                    <TableCell>{item.destino}</TableCell>
                    <TableCell>{item.origen}</TableCell>
                    <TableCell>${item.precio}</TableCell>
                    <TableCell className={classes.hideOnMobile}>{item.plataforma}</TableCell>
                    <TableCell className={classes.hideOnMobile}>{item.fecha}</TableCell>
                    <TableCell>{item.horaSalida}</TableCell>
                    <TableCell className={classes.hideOnMobile}>{item.horaLlegada}</TableCell>
                    <TableCell className={classes.hideOnMobile}>{item.alaTerminal}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>$ {order.total}</TableCell>
                    <TableCell style={{ color: 'green' }}>Compra aprobada</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default OrdersUser;