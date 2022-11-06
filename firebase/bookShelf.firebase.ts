import {initializeApp} from "firebase/app";
import {collection, doc, getDocs, getFirestore, query, updateDoc, where} from 'firebase/firestore/lite';
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Book, Score} from "../models/Book.model";
import {bookDetailsStore} from "../store/bookDetails.store";
import {profileStore} from "../store/profile.store";
import {bookShelfStore} from "../store/bookShelf.store";
import {BookStatus} from "../models/BookShelf.model";
import {userStore} from "../store/user.store";
import {firebaseConfig} from "./firebaseConfig";
import {updateBookScore} from "./bookList.firebase";
import {loadProfileDetails} from "./profile.firebase";
import {toJS} from "mobx";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const loadBooksInMyBookshelf = async () => {
    const bookshelfBooksIds = profileStore.bookshelfBooksIds
    if (bookshelfBooksIds.length < 1) {
        bookShelfStore.clearBookshelf()
        return
    }
    const bookshelfBookDetails = {}
    profileStore.profile.bookShelf.forEach(book => {
        Object.assign(bookshelfBookDetails, {
            [book.id]: {
                pagesRead: book.pagesRead,
                status: book.status,
                myScore: book.myScore,
            }
        })
    })
    const colRef = collection(db, 'book');
    const q = query(colRef, where('id', 'in', bookshelfBooksIds));
    const snapshot = await getDocs(q)
    const bookShelf = []
    snapshot.forEach(doc => {
        bookShelf.push({...<Book>doc.data(), ...bookshelfBookDetails[doc.id]})
    })
    bookShelfStore.setBookShelf(bookShelf)
}

const changeBookStatus = async (bookId: string, status: BookStatus) => {
    const userId = userStore.user.uid
    let {usersFinished} = bookDetailsStore.bookDetails
    let changeUserFinished = false
    const newBookshelf = [...bookShelfStore.bookShelf].map(book => {
        if (book.id === bookId) {
            if (getIsComplationStatusChanged(book.status, status)) {
                usersFinished = getNewUsersFinishedNumber(status, usersFinished)
                changeUserFinished = true
            }
            book.status = status
        }
        return book
    })
    const profileDocRef = doc(db, `profile/${userId}`);
    const bookDocRef = doc(db, `book/${bookId}`)
    try {
        await updateDoc(profileDocRef, {bookShelf: newBookshelf})
        if (changeUserFinished) {
            await updateDoc(bookDocRef, {usersFinished})
        }
        bookDetailsStore.updateStatus(status)
        bookDetailsStore.updateUsersFinished(usersFinished)
        profileStore.updateProfileBookshelf(newBookshelf)
        return true;
    } catch (e) {
        return false
    }
}

const changeBookScore = async (bookId: string, score: Score) => {
    const userId = userStore.user.uid
    const newBookshelf = [...bookShelfStore.bookShelf].map(book => {
        if (book.id === bookId) {
            book.myScore = score
        }
        return book
    })
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {bookShelf: newBookshelf})
        await updateBookScore(bookId, score)
        bookDetailsStore.updateMyScore(score)
        profileStore.updateProfileBookshelf(newBookshelf)
        return true;
    } catch (e) {
        return false
    }
}

const changeBookPagesRead = async (bookId: string, pagesRead: number) => {
    const userId = userStore.user.uid
    const newBookshelf = [...bookShelfStore.bookShelf].map(book => {
        if (book.id === bookId) {
            book.pagesRead = pagesRead
        }
        return book
    })
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {bookShelf: newBookshelf})
        bookDetailsStore.updatePagesRead(pagesRead)
        profileStore.updateProfileBookshelf(newBookshelf)
        return true;
    } catch (e) {
        return false
    }
}

const getIsComplationStatusChanged = (oldStatus: BookStatus, newStatus: BookStatus) => {
    return oldStatus === BookStatus.Completed ? (newStatus !== oldStatus) : (newStatus === BookStatus.Completed)
}

const getNewUsersFinishedNumber = (status: BookStatus, usersFinished: number): number => {
    return status === BookStatus.Completed ? usersFinished + 1 : usersFinished - 1
}

const addToBookshelf = async (bookId: string) => {
    try {

        const userId = profileStore.profile.userId
        if (!userId) {
            await loadProfileDetails()
        }
        const bookshelfBook = {
            pagesRead: 0,
            status: null,
            myScore: null,
            id: bookId
        }
        const docRef = doc(db, `profile/${userId}`);
        const newBookshelf = [...profileStore.profile.bookShelf, bookshelfBook]
        await updateDoc(docRef, {bookShelf: newBookshelf})
        profileStore.updateProfileBookshelf(newBookshelf)
        return true
    } catch (e) {
        return false
    }
}

const removeFromBookshelf = async (bookId: string) => {
    try {
        const userId = profileStore.profile.userId
        const docRef = doc(db, `profile/${userId}`);
        const newBookshelf = [...profileStore.profile.bookShelf].filter(book=>book.id!==bookId)
        await updateDoc(docRef, {bookShelf: newBookshelf})
        profileStore.updateProfileBookshelf(newBookshelf)
        await loadBooksInMyBookshelf()
        return true
    } catch (e) {
        return false
    }
}

export {
    loadBooksInMyBookshelf,
    changeBookStatus,
    changeBookScore,
    changeBookPagesRead,
    addToBookshelf,
    removeFromBookshelf
}
