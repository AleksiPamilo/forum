import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDuhbq4sps4WG678gF3TzIqSwBIGs1p-ak",
    authDomain: "forum-d47ec.firebaseapp.com",
    projectId: "forum-d47ec",
    storageBucket: "forum-d47ec.appspot.com",
    messagingSenderId: "252354404368",
    appId: "1:252354404368:web:1fc36aa9105ac36a28aa95",
    measurementId: "G-KDDDDHDETJ"
};

let FirebaseInstance: FirebaseApp;

const InitializeApp = () => {
    if (!FirebaseInstance) {
        FirebaseInstance = initializeApp(firebaseConfig);
    }

    return FirebaseInstance;
};

const GetAuthInstance = () => {
    const firebaseInstance = InitializeApp();

    return getAuth(firebaseInstance);
};

const GetFirestoreInstance = () => {
    const firestoreInstance = InitializeApp();

    return getFirestore(firestoreInstance);
};

const GetStorageInstance = () => {
    const storageInstance = InitializeApp();

    return getStorage(storageInstance);
};

const FirebaseServices = {
    getAuthInstance: GetAuthInstance,
    getFirestoreInstance: GetFirestoreInstance,
    getStorageInstance: GetStorageInstance
};

export default FirebaseServices;