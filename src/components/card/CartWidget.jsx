 import React, { useContext } from 'react';
 import Button from '@mui/material/Button';
 import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
 import { CartContext } from './CartContext';

 const CartWidget = () => {
   const { cart } = useContext(CartContext);

   const itemCount = cart.reduce((total, item) => total + (Number.isFinite(item.quantity) ? item.quantity : 0), 0);
  
   return (
     <div>
       <Button disableRipple>
         <ShoppingCartIcon style={{
           color: "#0E315A",
           fontSize: "30px",
           position: "relative",
           top: "-5px",
         }} />
         <span style={{
           position: "relative",
           top: "-25px",
         }}>{itemCount}</span>
       </Button>
     </div>
   );
 };

 export default CartWidget;