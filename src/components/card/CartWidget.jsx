import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  return (
    <div>
      <ShoppingCartIcon style={{
        color: "#0E315A",
        fontSize: "30px",
        position: "relative",
        top: "-5px",
      }} />
      <span style={{
        position: "relative",
        top: "-25px",
      }}>5</span>
    </div>
  );
};

export default CartWidget;