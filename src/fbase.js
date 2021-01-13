import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyC3ZyNykZpVT9KjPlPVzMf8wjDKdvvzyLI",
	authDomain: "switter-cca2f.firebaseapp.com",
	databaseURL: "https://switter-cca2f.firebaseio.com",
	projectId: "switter-cca2f",
	storageBucket: "switter-cca2f.appspot.com",
	messagingSenderId: "6590613847",
	appId: "1:6590613847:web:5f6defb702b352a7305612",
}

//Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const firebaseInstance = firebase

export const AuthService = firebase.auth()

export const dbService = firebase.firestore()

export const storageService = firebase.storage()
// Get a reference to the storage service, which is used to create references in your storage bucket
