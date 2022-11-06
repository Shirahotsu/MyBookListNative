import {action, computed, makeObservable, observable} from "mobx";
import {DailyReadPages, Friend, Profile as ProfileInterface, ProfileListItem} from '../models/Profile.model'
import {BookShelfItem} from "../models/BookShelf.model";

const emptyUserProfile: ProfileInterface = {
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
    userName: 'Nowy użytkownik',
    dayStreak: 0,
    level: 1,
}

export class ProfileStore {
    profile: ProfileInterface = emptyUserProfile
    filteredFriends: Friend[] = []
    profileList: ProfileListItem[] = []
    searchText: string = ''
    loadMoreProfiles: boolean = true
    lastVisibleDoc: any = null
    userLevel: number = 0

    constructor() {
        makeObservable(this, {
            profile: observable,
            filteredFriends: observable,
            profileList: observable,
            loadMoreProfiles: observable,
            lastVisibleDoc: observable,
            userLevel: observable,
            setProfile: action,
            changeUserName: action,
            updateProfileBookshelf: action,
            setLoadMoreProfiles: action,
            setLastVisibleDoc: action,
            addToProfileList: action,
            clearProfileList: action,
            addToFriends: action,
            removeFromFriends: action,
            dailyReadPages: computed,
            bookshelfBooksIds: computed
        })
    }

    get dailyReadPages(): DailyReadPages[] {
        return this.profile.dailyReadPages
    }

    get bookshelfBooksIds(): string[] {
        return this.profile.bookShelf.map(book => book.id)
    }

    setProfile(newProfile: ProfileInterface) {
        this.profile = newProfile
        this.setInitialFilterableFriends()
        this.setUserLevel()
    }

    setUserLevel(){
        let level = 0
        Object.values(this.profile.achievements).forEach(value => {
            const lvl = parseInt(value.level)
            if(lvl){
                level = level+lvl
            }
        })
        this.userLevel = level
    }

    setInitialFilterableFriends() {
        this.filteredFriends = this.profile.friends
    }

    setProfileList(profileList: ProfileListItem[]) {
        this.profileList = profileList
    }

    setLoadMoreProfiles(loadMoreProfiles: boolean) {
        this.loadMoreProfiles = loadMoreProfiles
    }

    setLastVisibleDoc(doc: any) {
        this.lastVisibleDoc = doc
    }

    addToProfileList(profiles: ProfileListItem[]) {
        this.profileList?.push(...profiles)
    }

    addToFriends(friend: Friend){
        this.profile.friends.push(friend)
    }

    removeFromFriends(id:string){
        this.profile.friends = this.profile.friends.filter(f=>f.id!==id)
        this.filterFriends(this.searchText)
    }

    clearProfileList() {
        this.profileList = []
    }

    filterFriends(text: string) {
        const friends = [...this.profile.friends]
        this.searchText = text
        if (!text || text.trim().length < 1) {
            this.filteredFriends = friends
        } else {
            this.filteredFriends = friends.filter(friend => friend.username.toLowerCase().includes(text.toLowerCase()))
        }
    }

    changeUserName(newUserName: string) {
        this.profile.userName = newUserName
    }

    updateProfileBookshelf(newBookshelf: BookShelfItem[]) {
        this.profile.bookShelf = newBookshelf
    }

}

export const profileStore = new ProfileStore()
