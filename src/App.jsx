import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardVisa from "./assets/img/cards/visa.png"
import './App.css';

import NavBarPublic from './components/navbar/NavBarPublic';
import Footer from './components/footer/Footer';
import ItemListContainer from './components/home/ItemListContainer';
import ListPasajes from './components/ListContainer/ListPasajes';
import { Routes, Route } from 'react-router-dom';

// Data - Json 
import interurbanoData from "./data/interurbanoData.json";
import middleDistance from "./data/middleDistance.json";
import longDistance from "./data/longDistance.json";

import Box from '@mui/material/Box';

import { DialogProvider } from './components/dialog/DialogContext';
import Dialog from './components/dialog/Dialog';

import { CartProvider } from './components/card/CartContext';

const getMonthName = () => {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const date = new Date();
  return monthNames[date.getMonth()];
}

function App() {
  const month = getMonthName();

  useEffect(() => {
    const card = 'Visa';
    const promotion = `Promociones de ${month}`;
    toast(
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={CardVisa} alt="Visa" style={{ width: '50px', height: '50px' }} />
          <span className='promotionSpan'> {promotion} </span>
        </div>
        <p className='promotionText'>¡Bienvenido, te recordamos las promociones, ofertas y descuentos con tarjeta {card}</p>
      </div>,
      {
        autoClose: 10000,
        className: 'toast-custom',
        bodyClassName: "toast-custom-body",
      }
    );
  }, [month]);

  const name = "Franco";
  const lastName = "Garcia";
  const companyName = "Terminal Digital";
  const author = `Realizado por ${name} ${lastName}`;
  const text = `¡Bienvenido al sistema de venta de pasajes de ${companyName}!`;

  const provincia = "Mendoza";
  const terminal = "Capital";

  return (
    <CartProvider>
      <DialogProvider>
        <React.Fragment>
          <ToastContainer />
          <Dialog />
          <NavBarPublic />
          <Box sx={{ marginBottom: "140px", minHeight: "50vh", maxHeight: "1000vh", maxWidth: "100vw" }}>
            <Routes>
              <Route
                exact
                path="/"
                element={<ItemListContainer greeting="¡Conociendo un poco más de Argentina!" />}
              />
              <Route
                exact
                path="/category/interurbanos"
                element={<ListPasajes data={interurbanoData} />}
              />
              <Route
                exact
                path="/category/media-distancia"
                element={<ListPasajes data={middleDistance} />}
              />
              <Route
                exact
                path="/category/larga-distancia"
                element={<ListPasajes data={longDistance} />}
              />
            </Routes>
          </Box>
          <Footer Terminal={terminal} Provincia={provincia} />
        </React.Fragment>
      </DialogProvider>
    </CartProvider>
  )
}

export default App