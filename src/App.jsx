import React from 'react';
import './App.css';

import NavBarPublic from './components/navbar/NavBarPublic';
import ItemListContainer from './components/home/ItemListContainer';


function App() {

  const name = "Franco";
  const lastName = "Garcia";
  const companyName = "Terminal Digital";
  const author = "Realizado por " + name + ' ' + lastName;
  const text = '¡Bienvenido al sistema de venta de pasajes de ' + companyName + '!';

  return (
    <>
      <div>
       <NavBarPublic />
      </div>
      <div>
        <ItemListContainer text={text} author={author} />
      </div>
    </>
  )
}

export default App
