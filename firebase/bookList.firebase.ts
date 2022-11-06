import {initializeApp} from "firebase/app";
import {
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
} from 'firebase/firestore/lite';
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Book, Comment, Score} from "../models/Book.model";
import {bookListStore} from '../store/bookList.store'
import {getBookListCount} from './quantities.firebase'
import {bookDetailsStore} from "../store/bookDetails.store";
import {profileStore} from "../store/profile.store";
import {firebaseConfig} from "./firebaseConfig";
import {userStore} from "../store/user.store";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadFirst10Books = async () => {
    const {sortBy, direction} = bookListStore.sortOption
    const colRef = collection(db, 'book');
    const q = query(colRef, orderBy(sortBy, direction), limit(10));
    const snapshot = await getDocs(q)
    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    bookListStore.setBookList(bookList)
    bookListStore.setLoadMoreBooks(true)
}

const loadAdditional10Books = async () => {
    const {sortBy, direction} = bookListStore.sortOption
    const count = await getBookListCount()
    const colRef = collection(db, 'book');
    const q = query(colRef, orderBy(sortBy, direction), startAfter(bookListStore.lastVisibleDoc), limit(1));
    const snapshot = await getDocs(q)
    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    console.log('lastVis', (snapshot.docs[snapshot.docs.length - 1]))
    bookListStore.addToBookList(bookList)
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    if (bookListStore.bookListLength >= count) {
        bookListStore.setLoadMoreBooks(false)
    }
}

const addComment = async (commentMessage: string) => {
    const newComment: Comment = {
        released: {
            seconds: Math.round(Date.now() / 1000),
        },
        comment: commentMessage,
        userId: profileStore.profile.userId,
        userName: profileStore.profile.userName
    }
    const bookId = bookDetailsStore.bookDetails?.id
    // @ts-ignore
    const comments = [...bookDetailsStore.bookDetails?.comments, newComment]
    const docRef = doc(db, `book/${bookId}`);
    try {
        await updateDoc(docRef, {comments})
        bookDetailsStore.addComment(newComment)
        return true;
    } catch (e) {
        return false
    }
}

const loadFirst50SearchResults = async (queryText: string) => {
    const colRef = collection(db, 'book');
    const lowerCaseQueryText = queryText.toLocaleLowerCase()
    const q = query(colRef,
        where('searchTitle', '>=', lowerCaseQueryText),
        where('searchTitle', '<=', lowerCaseQueryText + '\uf8ff'),
        orderBy('searchTitle', 'desc'),
        limit(50)
    );
    const snapshot = await getDocs(q)
    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    bookListStore.setBookList(bookList)
    console.log(bookListStore.bookListLength <= 50)
    bookListStore.setLoadMoreBooks(!(bookListStore.bookListLength <= 50))
}

const loadAdditional50SearchResults = async (queryText: string) => {
    const colRef = collection(db, 'book');
    const lowerCaseQueryText = queryText.toLocaleLowerCase()
    const q = query(colRef,
        where('searchTitle', '>=', lowerCaseQueryText),
        where('searchTitle', '<=', lowerCaseQueryText + '\uf8ff'),
        orderBy('searchTitle', 'desc'),
        startAfter(bookListStore.lastVisibleDoc),
        limit(50)
    );

    const snapshot = await getDocs(q)

    if (snapshot.docs.length < 1) {
        bookListStore.setLoadMoreBooks(false)
        return
    }

    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    bookListStore.addToBookList(bookList)
}

const updateBookScore = async (bookId: string, score: Score) => {
    const userId = userStore.user.uid
    const docRef = doc(db, `book/${bookId}`);
    try {

        const result = await getDoc(docRef)
        const userRate = [...result.data().userRate]
        let { scoreAmount } = result.data()
        let { totalScore } = result.data()
        const isScoreFromCurrentUser = userRate.find(item => item.userId === userId)
        let newUserRate = userRate
        if (!isScoreFromCurrentUser) {
            newUserRate.push({
                userId: userId,
                userScore: score
            })
            totalScore = scoreAmount+score
            scoreAmount++
        } else {
            newUserRate = userRate.map(item => {
                if (item.userId === userId) {
                    const diff = score - item.userScore
                    totalScore = totalScore + diff
                    console.log(totalScore)
                    item = {
                        userId: userId,
                        userScore: score
                    }
                }
                return item
            })
        }
        await updateDoc(docRef, {userRate: newUserRate, scoreAmount, totalScore})
        bookDetailsStore.updateTotalScore(totalScore)
        bookDetailsStore.updateScoreAmount(scoreAmount)
    } catch (e) {
        return false
    }
}


export {
    loadFirst10Books,
    loadAdditional10Books,
    addComment,
    loadFirst50SearchResults,
    loadAdditional50SearchResults,
    updateBookScore
}
