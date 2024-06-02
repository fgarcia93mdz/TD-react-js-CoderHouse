import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../src/firebase.js'; 
import fs from 'fs';
import { Blob } from 'node:buffer';

export const uploadImage = async (docId, imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const imageFile = new Blob([imageBuffer]);

  const storageRef = ref(storage, 'images/' + docId);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snapshot) => {
      }, 
      (error) => {
        reject(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};