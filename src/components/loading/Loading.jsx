import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Fade, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1200, 
    marginTop: '80px',
  },
  message: {
    marginTop: '50px', 
  },
}));

const Loading = ({ color = 'primary', size = 80, message = '', delay = 4000 }) => {
  const classes = useStyles();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeoutId = setTimeout(() => setShow(false), delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  return (
    <Fade in={show} unmountOnExit timeout={delay}>
      <Box className={classes.backdrop} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CircularProgress color={color} size={size} />
        {message && <Typography variant="body1" className={classes.message}>{message}</Typography>}
      </Box>
    </Fade>
  );
};

export default Loading;