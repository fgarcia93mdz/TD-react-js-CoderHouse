import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardVisa from "./assets/img/cards/visa.png"
import './App.css';
import NavBarPublic from './components/navbar/NavBarPublic';
import Footer from './components/footer/Footer';
import ItemListContainer from './components/home/ItemListContainer';
import ListPasajes from './components/ListContainer/ListPasajes';
import CartPage from './components/card/CartPage.jsx';
import Login from "../src/components/home/Login.jsx";
import { Routes, Route } from 'react-router-dom';
import { db } from '../src/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { UserProvider } from './components/user/UserProvider.jsx';
import { CartProvider } from './components/card/CartContext.jsx';


import Box from '@mui/material/Box';

import { DialogProvider } from './components/dialog/DialogContext';
import Dialog from './components/dialog/Dialog';

const getMonthName = () => {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const date = new Date();
  return monthNames[date.getMonth()];
}

function App() {
  const [interurbanoData, setInterurbanoData] = useState([]);
  const [middleDistanceData, setMiddleDistanceData] = useState([]);
  const [longDistanceData, setLongDistanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const interurbanoCollection = collection(db, 'dataInterUrbana');
      const middleDistanceCollection = collection(db, 'dataMiddle');
      const longDistanceCollection = collection(db, 'dataLong');

      const interurbanoSnapshot = await getDocs(interurbanoCollection);
      const middleDistanceSnapshot = await getDocs(middleDistanceCollection);
      const longDistanceSnapshot = await getDocs(longDistanceCollection);

      const interurbanoList = interurbanoSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const middleDistanceList = middleDistanceSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const longDistanceList = longDistanceSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setInterurbanoData(interurbanoList);
      setMiddleDistanceData(middleDistanceList);
      setLongDistanceData(longDistanceList);
    };

    fetchData();
  }, []);

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

  const provincia = "Mendoza";
  const terminal = "Capital";

  return (
    <UserProvider>
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
                  element={<ItemListContainer greeting="¡Conociendo un poco más mientras viajas!" />}
                />
                <Route
                  exact
                  path="/category/interurbanos"
                  element={<ListPasajes data={interurbanoData} />}
                />
                <Route
                  exact
                  path="/category/media-distancia"
                  element={<ListPasajes data={middleDistanceData} />}
                />
                <Route
                  exact
                  path="/category/larga-distancia"
                  element={<ListPasajes data={longDistanceData} />}
                />
                <Route
                  exact
                  path="/cart"
                  element={<CartPage />}
                />
                <Route
                  exact
                  path="/login"
                  element={<Login />}
                >
                </Route>
              </Routes>
            </Box>
            <Footer Terminal={terminal} Provincia={provincia} />
          </React.Fragment>
        </DialogProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default App