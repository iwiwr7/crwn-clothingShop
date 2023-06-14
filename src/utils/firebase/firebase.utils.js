import { initializeApp, } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCeim67Biv7qkmr6P7bbb43Ts2UjssqNcE",
    authDomain: "crwn-clothing-db-75b84.firebaseapp.com",
    projectId: "crwn-clothing-db-75b84",
    storageBucket: "crwn-clothing-db-75b84.appspot.com",
    messagingSenderId: "1092744301453",
    appId: "1:1092744301453:web:dec95aec2c25b8fac3cbc4"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user ', error.message)
        }
    }

    return userDocRef;

};