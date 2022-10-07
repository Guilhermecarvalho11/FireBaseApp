import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBV18vSynoKOPenIP4QT_aVXD2NoJ6PH8Q",
    authDomain: "cursoudemy-e2110.firebaseapp.com",
    projectId: "cursoudemy-e2110",
    storageBucket: "cursoudemy-e2110.appspot.com",
    messagingSenderId: "729204677386",
    appId: "1:729204677386:web:e2d237450d80ce7dbc78f3",
    measurementId: "G-HCDNJFGWB8"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)
  export { db, auth };