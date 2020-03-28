import firebase from "firebase";
const config = {
  apiKey: "AIzaSyB71FMEwCrDwdvkXsfKxqRW_46WPeeY2E0",
  authDomain: "zoomwebapp.firebaseapp.com",
  databaseURL: "https://zoomwebapp.firebaseio.com",
  projectId: "zoomwebapp",
  storageBucket: "zoomwebapp.appspot.com",
  messagingSenderId: "830730885397",
  appId: "1:830730885397:web:d5d45b2af2a8b22a9e711c",
  measurementId: "G-Q7L4ZP18EW"
};
firebase.initializeApp(config);
export default firebase;
