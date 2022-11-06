import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, updateDoc} from 'firebase/firestore/lite';
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {toJS} from "mobx";
import {firebaseConfig} from "./firebaseConfig";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getBookListCount = async () => {
    const docRef = doc(db, 'quantities/1')
    const snap = await getDoc(docRef)
    // @ts-ignore
    return toJS(snap.data()).book
}

export {
    getBookListCount
}
