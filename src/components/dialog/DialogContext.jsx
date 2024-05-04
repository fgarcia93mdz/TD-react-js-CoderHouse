import React, { createContext, useState } from 'react';

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [pasaje, setPasaje] = useState(null);

  const handleOpen = (pasajeData) => {
    setPasaje(pasajeData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPasaje(null);
  };

  return (
    <DialogContext.Provider value={{ open, pasaje, handleOpen, handleClose }}>
      {children}
    </DialogContext.Provider>
  );
};