import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, Typography } from '@material-ui/core';
import { DialogContext } from './DialogContext';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  dialog: {
    width: '50%',
    height: '90%',
    margin: 'auto',
  },
  title: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  content: {
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginTop: 20,
    color: 'white',
    padding: '10px 20px',
    borderRadius: 4,
    textDecoration: 'none',
    transition: 'background-color .2s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  ruta: {
    marginTop: 20,
    fontSize: '1.8em',
    color: '#3f51b5',
    marginBottom: 20,
  },
  horario: {
    marginTop: 20,
    fontSize: '1.4em',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  empresa: {
    marginTop: 20,
    fontSize: '1.6em',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  precio: {
    marginTop: 20,
    fontSize: '1.4em',
    color: '#008000',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(0,100,0,0.5)',
    padding: 10,
    width: '20%',
  },
  pasajesLibres: {
    marginTop: 20,
    fontSize: '1.4em',
    color: '#ff0000',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(100,0,0,0.5)',
    padding: 10,
    width: '40%',
  },
  spanRuta: {
    fontWeight: 'bold',
    fontSize: '0.8em',
    fontStyle: 'italic',
  },
  ArrowForwardIcon: {
    position: 'relative',
    top: '5px',
    color: "black"
  },
  mediosPago: {
    marginTop: 20,
    fontSize: '1em',
    color: '#000000',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(50,50,150,0.5)',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
    top: '5px',
  },
  counterHeader: {
    marginTop: 20,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counterContainer: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    marginTop: 20,
  },
  counterButton: {
    color: '#3f51b5',
    margin: '0 10px',
  },
  counterText: {
    fontSize: '1rem',
    color: '#3f51b5',
    border: '1px solid #3f51b5',
    borderRadius: 5,
    padding: '5px 10px',
  },
});
function Dialog() {

  const navigate = useNavigate();
  const classes = useStyles();
  const { open, pasaje, handleClose } = useContext(DialogContext);
  const [pasajesSeleccionados, setPasajesSeleccionados] = useState(1);

  const handleBack = () => {
    handleClose();
    navigate(-1);
  };


  return (
    <>
      <MuiDialog open={open} onClose={handleClose} fullScreen className={classes.dialog}>
        {pasaje && (
          <>
            <DialogTitle className={classes.title}>Detalles del pasaje Nº {pasaje.id}</DialogTitle>
            <DialogContent className={classes.content}>
              <Typography variant="h5" component="h2" className={classes.ruta}>
                <ModeOfTravelIcon /> {pasaje.origen} <span className={classes.spanRuta}>(origen)</span>  <ArrowForwardIcon className={classes.ArrowForwardIcon} /> {pasaje.destino} <span className={classes.spanRuta}>(destino)</span>
              </Typography>
              <Typography color="textSecondary" className={classes.horario}>
                Fecha de Partida: {new Date(pasaje.fecha).toLocaleDateString("es-ES")}
              </Typography>
              <Typography color="textSecondary" className={classes.horario}>
                Horario de Salida: {pasaje.horaSalida} - Horario de Llegada: {pasaje.horaLlegada} <span className={classes.spanRuta}> ({pasaje.horasViaje} hs de viaje)</span>
              </Typography>
              <Typography color="textSecondary" className={classes.empresa}>
                Empresa {pasaje.empresa} - {pasaje.plataforma} - Ala {pasaje.alaTerminal}
              </Typography>
              <Typography color="textSecondary" className={classes.precio}>
                <AttachMoneyIcon className={classes.ArrowForwardIcon} /> {pasaje.precio} (Arg)
              </Typography>
              <Typography color="textSecondary" className={classes.mediosPago}>
                Medios de pago
                <span>
                  <AccountBalanceWalletIcon className={classes.icon} /> Efectivo
                </span>
                <span>
                  <CreditCardIcon className={classes.icon} /> Tarjeta de crédito
                </span>
                <span>
                  <CreditCardIcon className={classes.icon} /> Tarjeta de débito
                </span>
              </Typography>
              <Typography color="textSecondary" className={classes.pasajesLibres}>
                <AirlineSeatReclineExtraIcon className={classes.ArrowForwardIcon} /> {pasaje.pasajesLibres} pasajes disponibles
              </Typography>
              <div className={classes.counterContainer}>
                <Typography color="textSecondary" className={classes.counterHeader}>
                  Seleccione la cantidad de pasajes:
                </Typography>
                <Button className={classes.counterButton} onClick={() => setPasajesSeleccionados(pasajesSeleccionados > 1 ? pasajesSeleccionados - 1 : 1)}>
                  <RemoveIcon />
                </Button>
                <span className={classes.counterText}> {pasajesSeleccionados} </span>
                <Button className={classes.counterButton} onClick={() => setPasajesSeleccionados(pasajesSeleccionados + 1)}>
                  <AddIcon />
                </Button>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleBack} color="primary">
                Cerrar
              </Button>
              <Button color="primary" autoFocus>
                Comprar
              </Button>
            </DialogActions>
          </>
        )}
      </MuiDialog>
      <ToastContainer />
    </>

  );
};

export default Dialog;