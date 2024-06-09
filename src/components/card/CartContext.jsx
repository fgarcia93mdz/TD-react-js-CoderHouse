import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(oldCart => {
      const foundItem = oldCart.find(i => i.id === item.id);
      if (foundItem) {
        return oldCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      } else {
        return [...oldCart, item];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(oldCart => oldCart.filter(item => item.id !== itemId));
    localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id !== itemId)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart, removeFromCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};