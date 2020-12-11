import firebase from 'firebase/app';
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC3ZyNykZpVT9KjPlPVzMf8wjDKdvvzyLI",
    authDomain: "switter-cca2f.firebaseapp.com",
    databaseURL: "https://switter-cca2f.firebaseio.com",
    projectId: "switter-cca2f",
    storageBucket: "switter-cca2f.appspot.com",
    messagingSenderId: "6590613847",
    appId: "1:6590613847:web:5f6defb702b352a7305612"
  };
 
  // firebase.auth().createUserWithEmailAndPassword(email, password)
  // .then((user) => {
  //   console.log("Sing in");
  //   // ...
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //       console.log("error");
  // });

// firebase.auth().createUserWithEmailAndPassword(email, createUserWithEmailAndPassword)
// .then((user) => {
//     console.log(signIn);
// })
// .catch((e) => {
//   console.log(e)
// })
//Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

