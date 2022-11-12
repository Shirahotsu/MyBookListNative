import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import {userStore} from '../store/user.store';
// @ts-ignore
import {firebaseConfig} from './firebaseConfig';
import { getUserLoginError } from "../utils/responseErrors";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  // Check for user status
  if (user) {
    const loggedUser = {
      accessToken: user.accessToken,
      uid: user.uid,
    };
    userStore.setUser(loggedUser);
  } else {
  }
});

const login = async (email: string, password: string) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return {success: true, value: userCredential};
  } catch (e) {
    return {success: false, value: getUserLoginError(e)};
  }
};

const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return {success: true, value: userCredential};
  } catch (e) {
    return {success: false, value: e};
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (e) {
    return false;
  }
};

export {login, register, logOut};
