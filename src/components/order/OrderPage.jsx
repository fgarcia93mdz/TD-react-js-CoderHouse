import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    margin: '2%',
    width: {xs: "50vw", sm: "40vw"},
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


const OrderPage = () => {
  const classes = useStyles();
  
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOrder(docSnap.data());
    } 
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return (
    <div>
      <Box className={classes.root}>
        <Typography variant="h5" className={classes.title}>Detalles de la Orden</Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {order ? order.items.map((item) => (
                <TableRow key={item.id}>
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
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default OrderPage;