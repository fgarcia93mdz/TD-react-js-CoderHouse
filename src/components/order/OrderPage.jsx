import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const OrderPage = () => {
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
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        width: '40vw',
        borderRadius: '5px',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        margin: '2%',
      }}>
        <Typography variant="h5" style={{ color: '#000000' }}>Detalles de la Orden</Typography>
      </Box>
      <Box boxShadow={3} p={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Destino</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Plataforma</TableCell>
                <TableCell>Fecha de salida</TableCell>
                <TableCell>Hora de salida</TableCell>
                <TableCell>Hora de llegada</TableCell>
                <TableCell>Lugar de partida</TableCell>
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
                  <TableCell>{item.plataforma}</TableCell>
                  <TableCell>{item.fecha}</TableCell>
                  <TableCell>{item.horaSalida}</TableCell>
                  <TableCell>{item.horaLlegada}</TableCell>
                  <TableCell>{item.alaTerminal}</TableCell>
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