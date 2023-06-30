import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY ?? 'AIzaSyDrZhGi-R_7CtRaCM3mRzRMgbJP-rZ70us',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN ?? 'hexblogposter.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID ?? 'hexblogposter',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET ?? 'hexblogposter.appspot.com',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID ?? '479227372846',
  appId: import.meta.env.VITE_APP_ID ?? '1:479227372846:web:d11889a237dec19cf606bf',
});

const firebaseDB = getFirestore(firebaseApp);

const articlesCollection = collection(firebaseDB, 'articles');

const auth = getAuth();

export {
  firebaseApp,
  auth,
  articlesCollection,
  firebaseDB,
};
