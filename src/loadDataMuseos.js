import { db } from '../src/firebase.js';
import { doc, setDoc } from "firebase/firestore";


const dataMuseosProgramas = [
  {
    "id": 1,
    "nombre": "Museo de Bellas Artes",
    "ubicacion": "Buenos Aires",
    "direccion": "Av. del Libertador 1473",
    "precio": 0,
    "horarioApertura": "10:00",
    "horarioCierre": "18:00",
    "fecha": "2022-12-01",
    "entradasLibres": 100,
    "horasVisita": 2,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2F52461-Museum-Of-Fine-Arts.jpg?alt=media&token=d9a63a32-2b77-4339-a7fc-78c4d213c946"
  },
  {
    "id": 2,
    "nombre": "Museo del Prado",
    "ubicacion": "Madrid",
    "direccion": "C. de Ruiz de Alarcón 23",
    "precio": 15,
    "horarioApertura": "10:00",
    "horarioCierre": "20:00",
    "fecha": "2022-12-02",
    "entradasLibres": 50,
    "horasVisita": 3,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Fimage.jpg?alt=media&token=a7d1b515-49d7-41cc-868a-088313254d63"
  },
  {
    "id": 3,
    "nombre": "Museo del Louvre",
    "ubicacion": "París",
    "direccion": "Rue de Rivoli",
    "precio": 17,
    "horarioApertura": "09:00",
    "horarioCierre": "18:00",
    "fecha": "2022-12-03",
    "entradasLibres": 30,
    "horasVisita": 4,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Fparis-louvre-piramides-noche.jpg?alt=media&token=5e437042-2b76-4756-9920-e024c43eb13d"
  },
  {
    "id": 4,
    "nombre": "Museo de Arte Moderno",
    "ubicacion": "Nueva York",
    "direccion": "11 W 53rd St",
    "precio": 25,
    "horarioApertura": "10:30",
    "horarioCierre": "17:30",
    "fecha": "2022-12-04",
    "entradasLibres": 200,
    "horasVisita": 3,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Ff.elconfidencial.com_original_61e_105_9df_61e1059df8dcefb0603e3fccd20d3e10.jpg?alt=media&token=b86f3bbe-4bd3-4110-811c-9b15dc5bb0f9"
  },
  {
    "id": 5,
    "nombre": "Museo de Historia Natural",
    "ubicacion": "Londres",
    "direccion": "Cromwell Rd",
    "precio": 0,
    "horarioApertura": "10:00",
    "horarioCierre": "17:50",
    "fecha": "2022-12-05",
    "entradasLibres": 150,
    "horasVisita": 2,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Fimages.jpeg?alt=media&token=0ecf73a4-af1b-47de-8bea-e0c53a239662"
  },
  {
    "id": 6,
    "nombre": "Museo Nacional de Antropología",
    "ubicacion": "Ciudad de México",
    "direccion": "Av. Paseo de la Reforma",
    "precio": 4,
    "horarioApertura": "09:00",
    "horarioCierre": "19:00",
    "fecha": "2022-12-06",
    "entradasLibres": 100,
    "horasVisita": 3,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Fmuseo-nacional-de-antropologc3ada-ciudad-de-mc3a9xico.jpg?alt=media&token=4250ce07-1d1b-4c3c-b18f-93f370f7db73"
  },
  {
    "id": 7,
    "nombre": "Museo Hermitage",
    "ubicacion": "San Petersburgo",
    "direccion": "Palace Square, 2",
    "precio": 10,
    "horarioApertura": "10:30",
    "horarioCierre": "18:00",
    "fecha": "2022-12-07",
    "entradasLibres": 80,
    "horasVisita": 4,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Fhermitage-1.a7c71a004d042875e55d03cd7a3b2cca126.jpg?alt=media&token=b87242c8-9f6c-467a-ac60-790d6d972807"
  },
  {
    "id": 8,
    "nombre": "Museo Uffizi",
    "ubicacion": "Florencia",
    "direccion": "Piazzale degli Uffizi, 6",
    "precio": 20,
    "horarioApertura": "08:15",
    "horarioCierre": "18:50",
    "fecha": "2022-12-08",
    "entradasLibres": 60,
    "horasVisita": 2,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2FUffizi_Florencia-1300x731.webp?alt=media&token=a9b90ec8-20da-4cb5-a8f5-11d0d990f6ec"
  },
  {
    "id": 9,
    "nombre": "Museo del Vaticano",
    "ubicacion": "Ciudad del Vaticano",
    "direccion": "Viale Vaticano",
    "precio": 17,
    "horarioApertura": "09:00",
    "horarioCierre": "18:00",
    "fecha": "2022-12-09",
    "entradasLibres": 70,
    "horasVisita": 3,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2Fmuseos_vaticanos_roma.jpg?alt=media&token=b85ef199-59a8-45ea-b319-0d0f1e90fa2d"
  },
  {
    "id": 10,
    "nombre": "Museo de Arte Islámico",
    "ubicacion": "Doha",
    "direccion": "Corniche",
    "precio": 10,
    "horarioApertura": "09:00",
    "horarioCierre": "19:00",
    "fecha": "2022-12-10",
    "entradasLibres": 120,
    "horasVisita": 2,
    "servicio": "museos",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/api-testin-fgg.appspot.com/o/museos%2FDoha-Museum-of-Islamic-Art-Frontal-Reflection.jpg?alt=media&token=aeb89218-a3f2-4954-aa32-011ba6fbb3ca"
  }
];

dataMuseosProgramas.forEach(async (item) => {
  try {
    const docRef = doc(db, "dataMuseosProgramas", item.id.toString());
    await setDoc(docRef, item);
    console.log("Documento escrito con ID: ", item.id);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
});