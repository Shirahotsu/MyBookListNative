import {BookStatus} from "./BookShelf.model";

export interface Book {
    comments: Comment[]
    userRate: UserRate
    bookCover: string
    categories: string[]
    description: string
    title: string
    searchTitle: string
    totalScore: number
    scoreAmount: number
    usersFinished: number
    id: string
    released: Released,
    pages: number,
    myScore?:  Score| null,
    pagesRead?: number,
    status?: BookStatus | null,
}

export interface Comment {
    comment: string
    userId: string,
    userName: string
    released: Released
}

export interface UserRate {
    userId: string
    userScore: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export interface Released {
    seconds: number,
    nanoseconds?: number
}

export type Score = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
