import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_VovcRuO43bVkhlymF6nIm8SO495iDlU",
    authDomain: "outly-ecommerce.firebaseapp.com",
    projectId: "outly-ecommerce",
    storageBucket: "outly-ecommerce.appspot.com",
    messagingSenderId: "956086261445",
    appId: "1:956086261445:web:55427bc8a9b9af99b3c2ac"
};


const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
    ignoreUndefinedProperties: true
});
export const db = getFirestore(app)