import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore/lite";
// @ts-ignore
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID } from "react-native-dotenv";
import { Book, Comment, Score } from "../models/Book.model";
import { bookListStore } from "../store/bookList.store";
import { getBookListCount } from "./quantities.firebase";
import { bookDetailsStore } from "../store/bookDetails.store";
import { profileStore } from "../store/profile.store";
import { firebaseConfig } from "./firebaseConfig";
import { userStore } from "../store/user.store";
import { convertDateToSeconds } from "../utils/date";
import { getAverageScore } from "../utils/score";
import { Alert, Platform } from "react-native";
import storage from '@react-native-firebase/storage';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadFirst10Books = async () => {
  const { sortBy, direction } = bookListStore.sortOption;
  const colRef = collection(db, "book");
  const q = query(colRef, orderBy(sortBy, direction), limit(10));
  const snapshot = await getDocs(q);
  const bookList: Book[] = [];
  snapshot.forEach(doc => {
    bookList.push({ ...<Book>doc.data(), id: doc.id });
  });
  console.log(bookList);
  bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1]);
  bookListStore.setBookList(bookList);
  bookListStore.setLoadMoreBooks(true);
};

const loadAdditional10Books = async () => {
  const { sortBy, direction } = bookListStore.sortOption;
  const colRef = collection(db, "book");
  const q = query(colRef, orderBy(sortBy, direction), startAfter(bookListStore.lastVisibleDoc), limit(10));
  const snapshot = await getDocs(q);
  const bookList: Book[] = [];
  snapshot.forEach(doc => {
    bookList.push({ ...<Book>doc.data(), id: doc.id });
  });
  bookListStore.addToBookList(bookList);
  bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1]);
  console.log('snapshot.docs.length', snapshot.docs.length);
  if (snapshot.docs.length < 1) {
    bookListStore.setLoadMoreBooks(false);
  }
};

const addComment = async (commentMessage: string) => {
  const newComment: Comment = {
    released: {
      seconds: Math.round(Date.now() / 1000),
    },
    comment: commentMessage,
    userId: profileStore.profile.userId,
    userName: profileStore.profile.userName,
  };
  const bookId = bookDetailsStore.bookDetails?.id;
  // @ts-ignore
  const comments = [...bookDetailsStore.bookDetails?.comments, newComment];
  const docRef = doc(db, `book/${bookId}`);
  try {
    await updateDoc(docRef, { comments });
    bookDetailsStore.addComment(newComment);
    return true;
  } catch (e) {
    return false;
  }
};

const loadFirst50SearchResults = async (queryText: string) => {
  const colRef = collection(db, "book");
  const lowerCaseQueryText = queryText.toLocaleLowerCase();
  const q = query(colRef,
    where("searchTitle", ">=", lowerCaseQueryText),
    where("searchTitle", "<=", lowerCaseQueryText + "\uf8ff"),
    orderBy("searchTitle", "desc"),
    limit(50),
  );
  const snapshot = await getDocs(q);
  const bookList: Book[] = [];
  snapshot.forEach(doc => {
    bookList.push({ ...<Book>doc.data(), id: doc.id });
  });
  bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1]);
  bookListStore.setBookList(bookList);
  bookListStore.setLoadMoreBooks(!(bookListStore.bookListLength <= 50));
};

const loadAdditional50SearchResults = async (queryText: string) => {
  const colRef = collection(db, "book");
  const lowerCaseQueryText = queryText.toLocaleLowerCase();
  const q = query(colRef,
    where("searchTitle", ">=", lowerCaseQueryText),
    where("searchTitle", "<=", lowerCaseQueryText + "\uf8ff"),
    orderBy("searchTitle", "desc"),
    startAfter(bookListStore.lastVisibleDoc),
    limit(50),
  );

  const snapshot = await getDocs(q);

  if (snapshot.docs.length < 1) {
    bookListStore.setLoadMoreBooks(false);
    return;
  }

  const bookList: Book[] = [];
  snapshot.forEach(doc => {
    bookList.push({ ...<Book>doc.data(), id: doc.id });
  });
  bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1]);
  bookListStore.addToBookList(bookList);
};

const updateBookScore = async (bookId: string, score: Score) => {
  const userId = userStore.user.uid;
  const docRef = doc(db, `book/${bookId}`);
  try {

    const result = await getDoc(docRef);
    const userRate = [...result.data().userRate];
    let { scoreAmount } = result.data();
    let { totalScore } = result.data();
    const isScoreFromCurrentUser = userRate.find(item => item.userId === userId);
    let newUserRate = userRate;
    if (!isScoreFromCurrentUser) {
      newUserRate.push({
        userId: userId,
        userScore: score,
      });
      totalScore = totalScore + score;
      scoreAmount++;
    } else {
      newUserRate = userRate.map(item => {
        if (item.userId === userId) {
          const diff = score - item.userScore;
          totalScore = totalScore + diff;
          console.log(totalScore);
          item = {
            userId: userId,
            userScore: score,
          };
        }
        return item;
      });
    }
    await updateDoc(docRef, { userRate: newUserRate, scoreAmount, totalScore, averageScore: getAverageScore(totalScore, scoreAmount) });
    bookDetailsStore.updateTotalScore(totalScore);
    bookDetailsStore.updateScoreAmount(scoreAmount);
  } catch (e) {
    return false;
  }
};

const addBook = async (newBook: any, image: any) => {
  const response = await uploadBookCover(image)
  if (!response.response) {
    return false
  }
  const colRef = collection(db, `book`);
  const seconds = convertDateToSeconds(new Date());
  const book: Book = {
    title: newBook.title,
    comments: [],
    userRate: [],
    bookCover: response.name,
    categories: newBook.categories,
    description: newBook.description,
    searchTitle: newBook.title.toLowerCase(),
    totalScore: 0,
    scoreAmount: 0,
    usersFinished: 0,
    averageScore: 0,
    released: { seconds: seconds },
    pages: newBook.pages,
    id: "",
  };

  try {
    const response = await addDoc(colRef, book);
    const id = response.id;
    const docRef = doc(db, `book/${id}`);
    await updateDoc(docRef, { id:id });
    const bookQuantitiesRef = doc(db, "quantities/1");
    const bookQuantitiesResult = await getDoc(bookQuantitiesRef);
    const bookQuantities = bookQuantitiesResult.data().book;
    await updateDoc(bookQuantitiesRef, { book: bookQuantities + 1 });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }


};

const uploadBookCover = async (image: any) => {
  const uid = new Date().getTime();
  const { uri } = image;``
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  const task = storage()
    .ref('book-covers/'+uid)
    .putFile(uploadUri);

  try {
    await task;
    return {response: true, name: 'book-covers/'+uid}
  } catch (e) {
    console.error(e);
    return {response: false, name: '' }
  }


}


export {
  loadFirst10Books,
  loadAdditional10Books,
  addComment,
  loadFirst50SearchResults,
  loadAdditional50SearchResults,
  updateBookScore,
  addBook,
};
