// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDmezaCo9DOFtbXS5FoYRS-XZxuII0Wfzs',

  authDomain: 'petpup-4aeee.firebaseapp.com',

  projectId: 'petpup-4aeee',

  storageBucket: 'petpup-4aeee.appspot.com',

  messagingSenderId: '91159465097',

  appId: '1:91159465097:web:ba403524e3163340cb0a58',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIRESTORE_DB = initializeFirestore(FIREBASE_APP, {
  experimentalAutoDetectLongPolling: true,
});

// IOS 253656573885-gebbdagh8adjrk7veedgqap4968mt1tu.apps.googleusercontent.com
// ANDROID 253656573885-emhgjtl5379qqa535gm9fkjc0uvjcskn.apps.googleusercontent.com
