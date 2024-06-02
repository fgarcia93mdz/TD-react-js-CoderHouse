import { db } from '../src/firebase.js';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { uploadImage } from '../src/imageUpload.js'; 

const dataInterUrbana = [
  {
    "id": 1,
    "origen": "Mendoza",
    "destino": "San Rafael",
    "precio": 20,
    "horaSalida": "08:00",
    "horaLlegada": "09:30",
    "fecha": "2022-12-01",
    "empresa": "Flecha Bus",
    "plataforma": "Plataforma 1",
    "alaTerminal": "Oeste",
    "pasajesLibres": 30,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/flechabus_0244ed1d3c.jpg'
  },
  {
    "id": 2,
    "origen": "San Rafael",
    "destino": "Mendoza",
    "precio": 20,
    "horaSalida": "10:30",
    "horaLlegada": "12:00",
    "fecha": "2022-12-01",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 2",
    "alaTerminal": "Este",
    "pasajesLibres": 25,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg'
  },
  {
    "id": 3,
    "origen": "Mendoza",
    "destino": "Malargüe",
    "precio": 25,
    "horaSalida": "13:00",
    "horaLlegada": "16:00",
    "fecha": "2022-12-01",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 3",
    "alaTerminal": "Sur",
    "pasajesLibres": 20,
    "horasViaje": 3,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg'
  },
  {
    "id": 4,
    "origen": "Malargüe",
    "destino": "Mendoza",
    "precio": 25,
    "horaSalida": "17:00",
    "horaLlegada": "20:00",
    "fecha": "2022-12-01",
    "empresa": "Iselin",
    "plataforma": "Plataforma 4",
    "alaTerminal": "Oeste",
    "pasajesLibres": 15,
    "horasViaje": 3,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/iselin.jpg'
  },
  {
    "id": 5,
    "origen": "Mendoza",
    "destino": "San Martín",
    "precio": 15,
    "horaSalida": "21:00",
    "horaLlegada": "22:30",
    "fecha": "2022-12-01",
    "empresa": "Iselin",
    "plataforma": "Plataforma 5",
    "alaTerminal": "Este",
    "pasajesLibres": 10,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/iselin.jpg'
  },
  {
    "id": 6,
    "origen": "San Martín",
    "destino": "Mendoza",
    "precio": 15,
    "horaSalida": "23:00",
    "horaLlegada": "00:30",
    "fecha": "2022-12-02",
    "empresa": "Iselin",
    "plataforma": "Plataforma 6",
    "alaTerminal": "Sur",
    "pasajesLibres": 5,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/iselin.jpg'
  },
  {
    "id": 7,
    "origen": "Mendoza",
    "destino": "Tunuyán",
    "precio": 30,
    "horaSalida": "08:00",
    "horaLlegada": "10:00",
    "fecha": "2022-12-01",
    "empresa": "Fradaos",
    "plataforma": "Plataforma 7",
    "alaTerminal": "Oeste",
    "pasajesLibres": 30,
    "horasViaje": 2,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/fradaos_bcd8156f82.jpg'
  },
  {
    "id": 8,
    "origen": "Tunuyán",
    "destino": "Mendoza",
    "precio": 30,
    "horaSalida": "11:00",
    "horaLlegada": "13:00",
    "fecha": "2022-12-01",
    "empresa": "Worldline",
    "plataforma": "Plataforma 8",
    "alaTerminal": "Este",
    "pasajesLibres": 25,
    "horasViaje": 2,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/worldline_4949710b21.jpg'
  },
  {
    "id": 9,
    "origen": "Mendoza",
    "destino": "Uspallata",
    "precio": 35,
    "horaSalida": "14:00",
    "horaLlegada": "17:00",
    "fecha": "2022-12-01",
    "empresa": "Worldline",
    "plataforma": "Plataforma 9",
    "alaTerminal": "Sur",
    "pasajesLibres": 20,
    "horasViaje": 3,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/worldline_4949710b21.jpg'
  },
  {
    "id": 10,
    "origen": "Uspallata",
    "destino": "Mendoza",
    "precio": 35,
    "horaSalida": "18:00",
    "horaLlegada": "21:00",
    "fecha": "2022-12-01",
    "empresa": "Worldline",
    "plataforma": "Plataforma 10",
    "alaTerminal": "Oeste",
    "pasajesLibres": 15,
    "horasViaje": 3,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/worldline_4949710b21.jpg'
  },
  {
    "id": 11,
    "origen": "Mendoza",
    "destino": "Las Leñas",
    "precio": 40,
    "horaSalida": "22:00",
    "horaLlegada": "02:00",
    "fecha": "2022-12-01",
    "empresa": "Fradaos",
    "plataforma": "Plataforma 11",
    "alaTerminal": "Este",
    "pasajesLibres": 10,
    "horasViaje": 4,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/fradaos_bcd8156f82.jpg'
  },
  {
    "id": 12,
    "origen": "Las Leñas",
    "destino": "Mendoza",
    "precio": 40,
    "horaSalida": "03:00",
    "horaLlegada": "07:00",
    "fecha": "2022-12-02",
    "empresa": "Fradaos",
    "plataforma": "Plataforma 12",
    "alaTerminal": "Sur",
    "pasajesLibres": 5,
    "horasViaje": 4,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/fradaos_bcd8156f82.jpg'
  }
];

const dataLong = [
  {
    "id": 13,
    "origen": "Madrid, España",
    "destino": "París, Francia",
    "precio": 100,
    "horaSalida": "08:00",
    "horaLlegada": "20:00",
    "fecha": "2022-12-01",
    "empresa": "ChileBus",
    "plataforma": "Plataforma 1",
    "alaTerminal": "Oeste",
    "pasajesLibres": 50,
    "horasViaje": 12,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/chilebus_0a75cfe8bb.jpg' 
  },
  {
    "id": 14,
    "origen": "Barcelona, España",
    "destino": "Roma, Italia",
    "precio": 90,
    "horaSalida": "10:00",
    "horaLlegada": "22:00",
    "fecha": "2022-12-01",
    "empresa": "Walcamau",
    "plataforma": "Plataforma 2",
    "alaTerminal": "Este",
    "pasajesLibres": 45,
    "horasViaje": 12,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/walcamau_2c55ef4977.jpg' 
  },
  {
    "id": 15,
    "origen": "Valencia, España",
    "destino": "Lisboa, Portugal",
    "precio": 70,
    "horaSalida": "06:00",
    "horaLlegada": "16:00",
    "fecha": "2022-12-01",
    "empresa": "ChileBus",
    "plataforma": "Plataforma 3",
    "alaTerminal": "Sur",
    "pasajesLibres": 30,
    "horasViaje": 10,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/chilebus_0a75cfe8bb.jpg' 
  },
  {
    "id": 16,
    "origen": "Sevilla, España",
    "destino": "Londres, Reino Unido",
    "precio": 110,
    "horaSalida": "09:00",
    "horaLlegada": "23:00",
    "fecha": "2022-12-01",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 4",
    "alaTerminal": "Oeste",
    "pasajesLibres": 35,
    "horasViaje": 14,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 17,
    "origen": "Bilbao, España",
    "destino": "Berlín, Alemania",
    "precio": 120,
    "horaSalida": "07:00",
    "horaLlegada": "23:00",
    "fecha": "2022-12-01",
    "empresa": "Sendas",
    "plataforma": "Plataforma 5",
    "alaTerminal": "Este",
    "pasajesLibres": 40,
    "horasViaje": 16,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/sendas_72e27ef3bd.jpg' 
  },
  {
    "id": 18,
    "origen": "Málaga, España",
    "destino": "Ámsterdam, Países Bajos",
    "precio": 130,
    "horaSalida": "10:00",
    "horaLlegada": "08:00",
    "fecha": "2022-12-02",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 6",
    "alaTerminal": "Sur",
    "pasajesLibres": 50,
    "horasViaje": 22,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 19,
    "origen": "Granada, España",
    "destino": "Bruselas, Bélgica",
    "precio": 100,
    "horaSalida": "08:00",
    "horaLlegada": "22:00",
    "fecha": "2022-12-02",
    "empresa": "Sendas",
    "plataforma": "Plataforma 7",
    "alaTerminal": "Oeste",
    "pasajesLibres": 55,
    "horasViaje": 14,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/sendas_72e27ef3bd.jpg' 
  },
  {
    "id": 20,
    "origen": "Zaragoza, España",
    "destino": "Viena, Austria",
    "precio": 115,
    "horaSalida": "09:00",
    "horaLlegada": "09:00",
    "fecha": "2022-12-02",
    "empresa": "Walcamau",
    "plataforma": "Plataforma 8",
    "alaTerminal": "Este",
    "pasajesLibres": 60,
    "horasViaje": 24,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/walcamau_2c55ef4977.jpg' 
  },
  {
    "id": 21,
    "origen": "Alicante, España",
    "destino": "Praga, República Checa",
    "precio": 125,
    "horaSalida": "07:00",
    "horaLlegada": "21:00",
    "fecha": "2022-12-02",
    "empresa": "TurBus",
    "plataforma": "Plataforma 9",
    "alaTerminal": "Sur",
    "pasajesLibres": 65,
    "horasViaje": 14,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/turbus_0e07a55873.jpg' 
  },
  {
    "id": 22,
    "origen": "Córdoba, España",
    "destino": "Varsovia, Polonia",
    "precio": 130,
    "horaSalida": "08:00",
    "horaLlegada": "22:00",
    "fecha": "2022-12-02",
    "empresa": "TurBus",
    "plataforma": "Plataforma 10",
    "alaTerminal": "Oeste",
    "pasajesLibres": 70,
    "horasViaje": 14,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/turbus_0e07a55873.jpg' 
  },
  {
    "id": 23,
    "origen": "Madrid, España",
    "destino": "París, Francia",
    "precio": 100,
    "horaSalida": "08:00",
    "horaLlegada": "20:00",
    "fecha": "2022-12-01",
    "empresa": "ChileBus",
    "plataforma": "Plataforma 1",
    "alaTerminal": "Oeste",
    "pasajesLibres": 50,
    "horasViaje": 12,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/chilebus_0a75cfe8bb.jpg' 
  },
  {
    "id": 24,
    "origen": "Barcelona, España",
    "destino": "Roma, Italia",
    "precio": 90,
    "horaSalida": "10:00",
    "horaLlegada": "22:00",
    "fecha": "2022-12-01",
    "empresa": "Walcamau",
    "plataforma": "Plataforma 2",
    "alaTerminal": "Este",
    "pasajesLibres": 45,
    "horasViaje": 12,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/walcamau_2c55ef4977.jpg' 
  }
];

const dataMiddle = [
  {
    "id": 25,
    "origen": "Mendoza",
    "destino": "San Rafael",
    "precio": 20,
    "horaSalida": "08:00",
    "horaLlegada": "09:00",
    "fecha": "2022-12-01",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 1",
    "alaTerminal": "Oeste",
    "pasajesLibres": 30,
    "horasViaje": 1,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 26,
    "origen": "San Rafael",
    "destino": "Mendoza",
    "precio": 20,
    "horaSalida": "10:00",
    "horaLlegada": "11:00",
    "fecha": "2022-12-01",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 2",
    "alaTerminal": "Este",
    "pasajesLibres": 25,
    "horasViaje": 1,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 27,
    "origen": "Mendoza",
    "destino": "Malargüe",
    "precio": 15,
    "horaSalida": "12:00",
    "horaLlegada": "13:30",
    "fecha": "2022-12-01",
    "empresa": "Flecha Bus",
    "plataforma": "Plataforma 3",
    "alaTerminal": "Sur",
    "pasajesLibres": 20,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/flechabus_0244ed1d3c.jpg' 
  },
  {
    "id": 28,
    "origen": "Malargüe",
    "destino": "Mendoza",
    "precio": 15,
    "horaSalida": "14:00",
    "horaLlegada": "15:30",
    "fecha": "2022-12-01",
    "empresa": "Flecha Bus",
    "plataforma": "Plataforma 4",
    "alaTerminal": "Oeste",
    "pasajesLibres": 15,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/flechabus_0244ed1d3c.jpg' 
  },
  {
    "id": 29,
    "origen": "Mendoza",
    "destino": "General Alvear",
    "precio": 20,
    "horaSalida": "16:00",
    "horaLlegada": "17:30",
    "fecha": "2022-12-01",
    "empresa": "Worldline",
    "plataforma": "Plataforma 5",
    "alaTerminal": "Este",
    "pasajesLibres": 10,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/worldline_4949710b21.jpg' 
  },
  {
    "id": 30,
    "origen": "General Alvear",
    "destino": "Mendoza",
    "precio": 20,
    "horaSalida": "18:00",
    "horaLlegada": "19:30",
    "fecha": "2022-12-01",
    "empresa": "Worldline",
    "plataforma": "Plataforma 6",
    "alaTerminal": "Sur",
    "pasajesLibres": 5,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/worldline_4949710b21.jpg' 
  },
  {
    "id": 31,
    "origen": "Mendoza",
    "destino": "Tunuyán",
    "precio": 25,
    "horaSalida": "20:00",
    "horaLlegada": "22:30",
    "fecha": "2022-12-01",
    "empresa": "Iselin",
    "plataforma": "Plataforma 7",
    "alaTerminal": "Oeste",
    "pasajesLibres": 0,
    "horasViaje": 2.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/iselin.jpg' 
  },
  {
    "id": 32,
    "origen": "Tunuyán",
    "destino": "Mendoza",
    "precio": 25,
    "horaSalida": "08:00",
    "horaLlegada": "10:30",
    "fecha": "2022-12-02",
    "empresa": "Iselin",
    "plataforma": "Plataforma 8",
    "alaTerminal": "Este",
    "pasajesLibres": 30,
    "horasViaje": 2.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/iselin.jpg' 
  },
  {
    "id": 33,
    "origen": "Mendoza",
    "destino": "Tupungato",
    "precio": 20,
    "horaSalida": "12:00",
    "horaLlegada": "14:00",
    "fecha": "2022-12-02",
    "empresa": "Iselin",
    "plataforma": "Plataforma 9",
    "alaTerminal": "Sur",
    "pasajesLibres": 25,
    "horasViaje": 2,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/iselin.jpg' 
  },
  {
    "id": 34,
    "origen": "Tupungato",
    "destino": "Mendoza",
    "precio": 20,
    "horaSalida": "16:00",
    "horaLlegada": "18:00",
    "fecha": "2022-12-02",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 10",
    "alaTerminal": "Oeste",
    "pasajesLibres": 20,
    "horasViaje": 2,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 35,
    "origen": "Mendoza",
    "destino": "San Rafael",
    "precio": 20,
    "horaSalida": "20:00",
    "horaLlegada": "21:00",
    "fecha": "2022-12-02",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 11",
    "alaTerminal": "Este",
    "pasajesLibres": 15,
    "horasViaje": 1,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 36,
    "origen": "San Rafael",
    "destino": "Mendoza",
    "precio": 20,
    "horaSalida": "22:00",
    "horaLlegada": "23:00",
    "fecha": "2022-12-02",
    "empresa": "Andesmar",
    "plataforma": "Plataforma 12",
    "alaTerminal": "Sur",
    "pasajesLibres": 10,
    "horasViaje": 1,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/andesmar_373e914d64.jpg' 
  },
  {
    "id": 37,
    "origen": "Mendoza",
    "destino": "Malargüe",
    "precio": 15,
    "horaSalida": "08:00",
    "horaLlegada": "09:30",
    "fecha": "2022-12-03",
    "empresa": "Flecha Bus",
    "plataforma": "Plataforma 13",
    "alaTerminal": "Oeste",
    "pasajesLibres": 30,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/flechabus_0244ed1d3c.jpg' 
  },
  {
    "id": 38,
    "origen": "Malargüe",
    "destino": "Mendoza",
    "precio": 15,
    "horaSalida": "10:00",
    "horaLlegada": "11:30",
    "fecha": "2022-12-03",
    "empresa": "Flecha Bus",
    "plataforma": "Plataforma 14",
    "alaTerminal": "Este",
    "pasajesLibres": 25,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/flechabus_0244ed1d3c.jpg' 
  },
  {
    "id": 39,
    "origen": "Mendoza",
    "destino": "General Alvear",
    "precio": 20,
    "horaSalida": "12:00",
    "horaLlegada": "13:30",
    "fecha": "2022-12-03",
    "empresa": "Worldline",
    "plataforma": "Plataforma 15",
    "alaTerminal": "Sur",
    "pasajesLibres": 20,
    "horasViaje": 1.5,
    "servicio": "interurbanos", "imageFile": '../src/assets/img/company/worldline_4949710b21.jpg' 
  }
];

dataInterUrbana.forEach(async (item) => {
  try {
    const imageUrl = await uploadImage(item.id, item.imageFile);
    const { imageFile, ...itemWithoutImageFile } = item; 
    const dataWithImage = { ...itemWithoutImageFile, imageUrl }; 
    const docRef = doc(db, "dataInterUrbana", item.id.toString());
    await setDoc(docRef, dataWithImage, item);
    console.log("Documento escrito con ID: ", item.id);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
});

dataLong.forEach(async (item) => {
  try {
    const imageUrl = await uploadImage(item.id, item.imageFile);
    const { imageFile, ...itemWithoutImageFile } = item; 
    const dataWithImage = { ...itemWithoutImageFile, imageUrl }; 
    const docRef = doc(db, "dataLong", item.id.toString());
    await setDoc(docRef, dataWithImage, item);
    console.log("Documento escrito con ID: ", item.id);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
});

dataMiddle.forEach(async (item) => {
  try {
    const imageUrl = await uploadImage(item.id, item.imageFile);
    const { imageFile, ...itemWithoutImageFile } = item; 
    const dataWithImage = { ...itemWithoutImageFile, imageUrl };
    const docRef = doc(db, "dataMiddle", item.id.toString());
    await setDoc(docRef, dataWithImage, item);
    console.log("Documento escrito con ID: ", item.id);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
});

