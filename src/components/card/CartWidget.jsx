import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  
  return (
    <div>
      <Button>
        <ShoppingCartIcon style={{
          color: "#0E315A",
          fontSize: "30px",
          position: "relative",
          top: "-5px",
        }} />
        <span style={{
          position: "relative",
          top: "-25px",
        }}>2</span>
      </Button>
    </div>
  );
};

export default CartWidget;