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
    setDoc, startAfter,
    updateDoc,
    where
} from 'firebase/firestore/lite';
import {userStore} from "../store/user.store";
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Achievements, Friend, Profile, ProfileListItem} from "../models/Profile.model";
import {profileStore} from "../store/profile.store";
import {firebaseConfig} from "./firebaseConfig";
import {toJS} from "mobx";
import {bookListStore} from "../store/bookList.store";
import {Book} from "../models/Book.model";
import {achievementsStore} from "../store/achievements.store";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const emptyUserProfile: Profile = {
    userId: '',
    achievements: {
        books: {
            level: 0,
            value: 0
        },
        friends: {
            level: 0,
            value: 0
        },
        pages: {
            level: 0,
            value: 0
        },
        score: {
            level: 0,
            value: 0
        },
        streak: {
            level: 0,
            value: 0
        },
    },
    avatar: null,
    bookShelf: [],
    dailyReadPages: [],
    friends: [],
    userName: 'Nowy użytkownik',
    dayStreak: 0,
    level: 1,
}

const loadProfileDetails = async () => {
    // collection.
    // const test = await collection(app, )
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    if (data) {
        const userProfile: Profile = {
            userId: data.userId,
            achievements: data.achievements,
            avatar: null,
            bookShelf: data.bookShelf,
            dailyReadPages: data.dailyReadPages,
            userName: data.userName,
            dayStreak: data.dayStreak,
            level: data.level,
            friends: data.friends,
        }
        profileStore.setProfile(userProfile)
        achievementsStore.setAchievements(userProfile.achievements)
        console.log(toJS(profileStore.profile.friends))
    }
}

const createProfileDetails = async (newUserId: string | null = null) => {
    const userId = newUserId ?? userStore.user.uid
    const newUserProfile = {...emptyUserProfile, userId}
    await setDoc(doc(db, 'profile', userId), newUserProfile)
}

const updateUserName = async (userName: string) => {
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {userName})
        profileStore.changeUserName(userName)
        return true;
    } catch (e) {

    }
}


const loadProfileList = async (username: string) => {
    const colRef = collection(db, 'profile');
    const q = query(colRef,
        where('userName', '>=', username),
        where('userName', '<=', username + '\uf8ff'),
        orderBy('userName', 'desc'),
        limit(100)
    );
    const snapshot = await getDocs(q)
    const userFriendListIds = [...profileStore.profile.friends].map(f=>f.id)
    const profileList: ProfileListItem[] = []
    snapshot.forEach(doc => {
        if(!userFriendListIds.includes(doc.id)){
            profileList.push({
                avatar: doc.data().avatar,
                username: doc.data().userName,
                id: doc.id
            })
        }
    })
    profileStore.setProfileList(profileList)
}

// const loadAdditional50SearchResults = async (username: string) => {
//     const colRef = collection(db, 'book');
//     const lowerCaseQueryText = username.toLocaleLowerCase()
//     const q = query(colRef,
//         where('userName', '>=', lowerCaseQueryText),
//         where('userName', '<=', lowerCaseQueryText + '\uf8ff'),
//         orderBy('userName', 'desc'),
//         startAfter(profileStore.lastVisibleDoc),
//         limit(50)
//     );
//
//     const snapshot = await getDocs(q)
//
//     if (snapshot.docs.length < 1) {
//         profileStore.setLoadMoreProfiles(false)
//         return
//     }
//
//     const profileList: ProfileListItem[] = []
//     snapshot.forEach(doc => {
//         profileList.push({
//             avatar: doc.data().avatar,
//             username: doc.data().userName,
//             id: doc.id
//         })
//     })
//     profileStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
//     profileStore.addToProfileList(profileList)
// }

const addUserToFriends = async (friend:Friend)=>{
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`)
    const result = await getDoc(docRef)
    const friendList = [...result.data().friends]
    friendList.push(friend)
    try {
        await updateDoc(docRef, {friends: friendList})
        profileStore.addToFriends(friend)
        const newProfileList = [...profileStore.profileList].filter(p=>p.id!==friend.id)
        profileStore.setProfileList(newProfileList)
        return true;
    } catch (e) {
        return false
    }
}

const removeUserFromFriends = async (friend:Friend)=>{
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`)
    const result = await getDoc(docRef)
    const friendList = [...result.data().friends]
    const newFriendList =  friendList.filter(item => item.id !== friend.id)
    try {
        await updateDoc(docRef, {friends: newFriendList})
        profileStore.removeFromFriends(friend.id)
        return true;
    } catch (e) {
        return false
    }
}

const updateAchievements = async (achievements:Achievements) => {
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`)
    try {
        await updateDoc(docRef, {achievements: achievements})
        return true;
    } catch (e) {
        return false
    }
}


export {
    loadProfileDetails,
    updateUserName,
    createProfileDetails,
    loadProfileList,
    addUserToFriends,
    removeUserFromFriends,
    updateAchievements
}
