import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA5W4pf8vYwb7OVh8tsaeYF5LzxbVbYz6c",
    authDomain: "clone-2e316.firebaseapp.com",
    databaseURL: "https://clone-2e316.firebaseio.com",
    projectId: "clone-2e316",
    storageBucket: "clone-2e316.appspot.com",
    messagingSenderId: "914718282883",
    appId: "1:914718282883:web:72093e71a6def61538b7b6",
    measurementId: "G-J5P669YVZT"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth()


export { db, auth };