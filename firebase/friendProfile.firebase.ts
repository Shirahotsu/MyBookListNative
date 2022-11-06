import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore, query, where,} from 'firebase/firestore/lite';
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {firebaseConfig} from "./firebaseConfig";
import {FriendProfileModel} from "../models/FriendProfile.model";
import {friendProfileStore} from "../store/friendProfile.store";
import {BookShelfItem} from "../models/BookShelf.model";
import {achievementsStore} from "../store/achievements.store";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const loadFriendProfileDetails = async (id:string):Promise<boolean> => {
    try {
        const docRef = doc(db, `profile/${id}`);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        if (data) {
            const friendProfile: FriendProfileModel = {
                userId: data.userId,
                achievements: data.achievements,
                avatar: null,
                bookShelf: data.bookShelf,
                userName: data.userName,
                dayStreak: data.dayStreak,
                level: data.level,
            }
            friendProfileStore.setProfile(friendProfile)
            return true
        }
        return false
    } catch (e){
        return false
    }
}

const loadBooksInFriendsBookshelf = async () => {
    const bookshelfBooksIds = friendProfileStore.bookshelfBooksIds
    if(!friendProfileStore.profile){
        return
    }
    if (bookshelfBooksIds.length < 1) {
        friendProfileStore.setBookshelf([])
        return
    }
    const bookshelfBookDetails = {}
    friendProfileStore.profile.bookShelf.forEach(book => {
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
    const bookshelf:BookShelfItem[] = []
    snapshot.forEach(doc => {
        bookshelf.push({
            ...bookshelfBookDetails[doc.id],
            title:doc.data().title,
            bookCover:doc.data().bookCover,
            pages:doc.data().pages,
            id:doc.id
        })
    })
    friendProfileStore.setBookshelf(bookshelf)
}

const loadFriendsAchievements = async () => {
}

export {
    loadFriendProfileDetails,
    loadBooksInFriendsBookshelf
}
