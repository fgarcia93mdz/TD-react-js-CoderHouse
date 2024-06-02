import React from 'react';
import { Typography, Container, Box, Paper, Card, CardActionArea, CardContent, CardMedia, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';


const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  root: {
    minWidth: 200,
    maxHeight: 300,
    margin: '20px 0',
    color: '#00000',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    width: '20vw',
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

const ItemListContainer = ({ greeting }) => {
  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, 'dataMuseosProgramas');
      const dataSnapshot = await getDocs(dataCollection);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      setData(dataList);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box marginTop={5}>
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          {greeting}
        </Typography>
      </Box>
      <Box marginTop={10}>
        <Typography variant="h4" align="center" marginTop="20px" color="textSecondary" gutterBottom>
          Museos
        </Typography>
      </Box>
      <Box marginTop={10}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <div className={classes.container}>
            {data.filter(item => item.servicio === 'museos').map((museo, index) => (
              <Card className={classes.root} key={index}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={museo.imageUrl}
                    title={museo.nombre}
                  />
                  <CardContent className={classes.gradientPaper}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                      {museo.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                      {museo.ubicacion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                      {museo.direccion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                      Precio: {museo.precio === 0 ? 'Gratis' : `$${museo.precio}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                      Horario: {museo.horarioApertura} - {museo.horarioCierre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                      Entradas libres: {museo.entradasLibres}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                      Duración de la visita: {museo.horasVisita} horas
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default ItemListContainer;