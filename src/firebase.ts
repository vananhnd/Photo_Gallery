import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBo7ee3tuB0LgTQjq_Ge8UKGkM-odVNHlg",
    authDomain: "photo-gallery-297e6.firebaseapp.com",
    projectId: "photo-gallery-297e6",
    storageBucket: "photo-gallery-297e6.appspot.com",
    messagingSenderId: "851332585339",
    appId: "1:851332585339:web:b9443e7a27ffa28611cfde",
    measurementId: "G-GGTX4LPLZW"
};
firebase.initializeApp(firebaseConfig);
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();