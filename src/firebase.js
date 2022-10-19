import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDEOIyGqz0H2NvA_XE8stiVlhjS33e5CBQ",
    authDomain: "netflix-app-1957d.firebaseapp.com",
    projectId: "netflix-app-1957d",
    storageBucket: "netflix-app-1957d.appspot.com",
    messagingSenderId: "1024183202105",
    appId: "1:1024183202105:web:53eba87a5d54f2980878e8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;