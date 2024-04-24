import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  }
});

const ItemListContainer = ({ greeting }) => {
  const classes = useStyles();
  const [museos, setMuseos] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [museoPage, setMuseoPage] = useState(0);
  const [programaPage, setProgramaPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    axios.get(`https://www.cultura.gob.ar/api/v2.0/museos/?limit=${limit}&offset=${museoPage * limit}`)
      .then(response => {
        setMuseos(response.data.results);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los museos:', error);
      });

    axios.get(`https://www.cultura.gob.ar/api/v2.0/programas/?limit=${limit}&offset=${programaPage * limit}`)
      .then(response => {
        setProgramas(response.data.results);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los programas:', error);
      });
  }, [museoPage, programaPage]);

  const handleNextMuseoPage = () => {
    setMuseoPage(prevPage => prevPage + 1);
  };

  const handlePreviousMuseoPage = () => {
    setMuseoPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextProgramaPage = () => {
    setProgramaPage(prevPage => prevPage + 1);
  };

  const handlePreviousProgramaPage = () => {
    setProgramaPage(prevPage => Math.max(prevPage - 1, 0));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        {greeting}
      </Typography>
      <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
        Museos De Argentina
      </Typography>
      <Box display="flex" flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
        {museos.map((museo, index) => (
          <Card className={classes.root} key={index}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {museo.nombre}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <LocationOnIcon className={classes.iconLocation} /> {museo.direccion}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handlePreviousMuseoPage} disabled={museoPage === 0}>
          Anterior
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextMuseoPage} style={{ marginLeft: '10px' }}>
          Siguiente
        </Button>
      </Box>
      <Box marginTop={4}>
        <hr />
        <Typography variant="h4" align="center" marginTop="20px" color="textSecondary" gutterBottom>
          Programas Nacionales
        </Typography>
      </Box>
      <Box display="flex" flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
        {programas.map((programa, index) => (
          <Card className={classes.root} key={index}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {programa.nombre}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" dangerouslySetInnerHTML={{ __html: programa.descripcion }} />
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handlePreviousProgramaPage} disabled={programaPage === 0}>
          Anterior
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextProgramaPage} style={{ marginLeft: '10px' }}>
          Siguiente
        </Button>
      </Box>
    </Container>
  );
};

export default ItemListContainer;