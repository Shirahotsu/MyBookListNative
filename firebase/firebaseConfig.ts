const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
const FIREBASE_MESSAAGING_SENDER_ID = process.env.FIREBASE_MESSAAGING_SENDER_ID;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'my-book-list-a44ff.firebaseapp.com',
  projectId: 'my-book-list-a44ff',
  storageBucket: 'my-book-list-a44ff.appspot.com',
  messagingSenderId: FIREBASE_MESSAAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};
