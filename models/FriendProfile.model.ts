import {Achievements, Book} from "./Profile.model";
import {Score} from "./Book.model";
import {BookStatus} from "./BookShelf.model";

export interface FriendProfileModel{
    achievements: Achievements,
    bookShelf: Book[]
    dayStreak: number
    level: number
    avatar: string | null,
    userId: string
    userName: string
}

export interface BookshelfItem {
    title: string
    bookCover: string,
    status: BookStatus|null,
    myScore: Score | null,
    pagesRead: number,
    pages: number,
    id: string
}
