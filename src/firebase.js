import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC3ZyNykZpVT9KjPlPVzMf8wjDKdvvzyLI",
    authDomain: "switter-cca2f.firebaseapp.com",
    databaseURL: "https://switter-cca2f.firebaseio.com",
    projectId: "switter-cca2f",
    storageBucket: "switter-cca2f.appspot.com",
    messagingSenderId: "6590613847",
    appId: "1:6590613847:web:5f6defb702b352a7305612"
  };

//Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
