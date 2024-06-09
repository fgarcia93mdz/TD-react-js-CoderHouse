import React, { useContext, useState, useEffect } from 'react';
import { DialogContext } from '../dialog/DialogContext';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { Card, CardContent, Typography, Button, Grid, Container, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../loading/Loading';

const useStyles = makeStyles({
  card: {
    backgroundColor: '#c0dcff',
    border: '1px solid #ddd',
    borderRadius: 4,
    padding: 20,
    margin: 20,
    transition: 'transform .2s',
    minHeight: 300,
    maxHeight: 300,
    overflow: 'auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    '&:hover': {
      textDecoration: 'underline',
    },
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
  empresa: {
    fontSize: '1.3em',
    fontWeight: 'bold',
  },
  ruta: {
    margin: 20,
    fontSize: '1.3em',
    color: '#3f51b5',
  },
  precio: {
    marginTop: 15,
    fontSize: '1em',
    color: '#f50057',
  },
  horario: {
    marginTop: 10,
    fontSize: '1.2em',
    fontStyle: 'italic',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
});

function ListPasajes({ data }) {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { handleOpen } = useContext(DialogContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (pasaje) => {
    handleOpen(pasaje);
    navigate(`/category/${pasaje.servicio}/pasaje/${pasaje.id}`);
  };

  const classes = useStyles();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((pasaje) => {
    return (
      pasaje.empresa?.toLowerCase().includes(search.toLowerCase()) ||
      pasaje.fecha?.toLowerCase().includes(search.toLowerCase()) ||
      pasaje.horaSalida?.toLowerCase().includes(search.toLowerCase()) ||
      pasaje.destino?.toLowerCase().includes(search.toLowerCase()) ||
      pasaje.origen?.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <Loading message='Cargando información' />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="search"
            label="Buscar"
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ margin: '20px 0' }}
          />
        </Grid>
        {filteredData.map((pasaje) => (
          <Grid item xs={12} sm={4} key={pasaje.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div>
                  <Typography color="textSecondary" gutterBottom className={classes.empresa}>
                    🚌 <span>Empresa {pasaje.empresa}</span>
                  </Typography>
                  <Typography variant="h5" component="h2" className={classes.ruta}>
                    {pasaje.origen} - {pasaje.destino}
                  </Typography>
                  <Typography color="textSecondary" className={classes.horario}>
                    Salida: {pasaje.horaSalida} - Llegada: {pasaje.horaLlegada}
                  </Typography>
                  <Typography color="textSecondary" className={classes.precio}>
                    Precio: $ {pasaje.precio} (Arg)
                  </Typography>
                </div>
                <Button onClick={() => handleClick(pasaje)} variant="contained" color="primary" className={classes.button}>
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ListPasajes;