import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardVisa from "./assets/img/cards/visa.png"
import './App.css';

import NavBarPublic from './components/navbar/NavBarPublic';
import ItemListContainer from './components/home/ItemListContainer';

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

  return (
    <React.Fragment>
      <ToastContainer />
      <div>
        <NavBarPublic />
      </div>
      <div>
        <ItemListContainer text={text} author={author} />
      </div>
    </React.Fragment>
  )
}

export default App