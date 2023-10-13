import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCySLosxYLZu5FbuGAKMN_DN9qLCytNDj0',
  authDomain: 'savingscapsule.firebaseapp.com',
  projectId: 'savingscapsule',
  storageBucket: 'savingscapsule.appspot.com',
  messagingSenderId: '327099602204',
  appId: '1:327099602204:web:86ebc0eaf408ad8aec16d9',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
