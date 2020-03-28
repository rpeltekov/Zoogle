import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAsAGBLGr31vrt0D7Iooi1abKZeoV0eAJ0",
    authDomain: "zoom-chat-bot.firebaseapp.com",
    databaseURL: "https://zoom-chat-bot.firebaseio.com",
    projectId: "zoom-chat-bot",
    storageBucket: "zoom-chat-bot.appspot.com",
    messagingSenderId: "374560055698",
    appId: "1:374560055698:web:d5ed7d683c1cd36fc5614b",
    measurementId: "G-KQDCMN0YRY"
};
firebase.initializeApp(config);
export default firebase;