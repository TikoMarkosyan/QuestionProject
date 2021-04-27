import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAQLLVqZdZT2QMX25Pw3eBoKBhCpngcvk8",
    authDomain: "questionproject-b55a6.firebaseapp.com",
    databaseURL: "https://questionproject-b55a6-default-rtdb.firebaseio.com",
    projectId: "questionproject-b55a6",
    storageBucket: "questionproject-b55a6.appspot.com",
    messagingSenderId: "102139724666",
    appId: "1:102139724666:web:f0aa8a21541681354dccc3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    firebase.firestore();
} else {
    firebase.app()
}

export default firebase;