import React from 'react';
import { Typography, Container, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HourglassEmpty } from '@material-ui/icons';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '20px 0',
    background: 'linear-gradient(to right, #9fa8da, #9fa8da, #c5cae9, #c5cae9, #c5cae9)',
    color: '#00000',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  iconLocation: {
    verticalAlign: 'middle',
    marginRight: '5px',
    color: '#3f51b5',
  },
  gradientPaper: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    padding: '20px',
  },
  rotatingIcon: {
    animation: '$rotation 20s infinite linear',
  },
  '@keyframes rotation': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(359deg)',
    },
  },
});

const API_URL = process.env.NODE_ENV === 'development' ? '/api' : 'https://cors-anywhere.herokuapp.com/https://www.cultura.gob.ar';

const ItemListContainer = ({ greeting }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Box marginTop={5}>
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          {greeting}
        </Typography>
      </Box>
      <Box marginTop={10}>
        <Typography variant="h4" align="center" marginTop="20px" color="textSecondary" gutterBottom>
          Museos De Argentina
        </Typography>
      </Box>
      <Box marginTop={10} display="flex" justifyContent="center">
        <Paper elevation={3} className={classes.gradientPaper}>
          <Typography variant="h5" align="center" gutterBottom>
            <HourglassEmpty className={classes.rotatingIcon} /> Próximamente los museos de Argentina más visitados
          </Typography>
          <Typography variant="body1" align="center">
            Estamos trabajando en nuevas características. ¡Manténgase al tanto!
          </Typography>
        </Paper>
      </Box>
      <Box marginTop={10}>
        <Typography variant="h4" align="center" marginTop="20px" color="textSecondary" gutterBottom>
          Programas Turísticos Nacionales
        </Typography>
      </Box>
      <Box marginTop={10} display="flex" justifyContent="center">
        <Paper elevation={3} className={classes.gradientPaper}>
          <Typography variant="h5" align="center" gutterBottom>
            <HourglassEmpty className={classes.rotatingIcon} /> Próximamente los programas turísticos nacionales más destacados
          </Typography>
          <Typography variant="body1" align="center">
            Estamos trabajando en nuevas características. ¡Manténgase al tanto!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ItemListContainer;