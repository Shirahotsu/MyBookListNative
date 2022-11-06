import {action, computed, makeObservable, observable} from "mobx";
import {BookshelfItem, FriendProfileModel} from "../models/FriendProfile.model";

class FriendProfileStore {
    profile: FriendProfileModel | null = null
    bookshelf: BookshelfItem[] = []
    userLevel:number = 0

    constructor() {
        makeObservable(this, {
            profile: observable,
            bookshelf: observable,
            userLevel: observable,
            setProfile: action,
            bookshelfBooksIds: computed
        })
    }

    setProfile(profile:FriendProfileModel){
        this.profile = profile
        this.setUserLevel()
    }

    setUserLevel(){
        let level = 0
        if(!this.profile){
            return
        }
        Object.values(this.profile.achievements).forEach(value => {
            const lvl = parseInt(value.level)
            if(lvl){
                level = level+lvl
            }
        })
        this.userLevel = level
    }

    setBookshelf(bookshelf:BookshelfItem[]){
        this.bookshelf = bookshelf
    }

    get bookshelfBooksIds(): string[] {
        return this.profile?.bookShelf.map(book => book.id) || []
    }
}

export const friendProfileStore = new FriendProfileStore()
