export interface Profile {
    achievements: Achievements,
    bookShelf: Book[]
    dailyReadPages: DailyReadPages[]
    friends: Friend[]
    dayStreak: number
    level: number
    avatar: string | null,
    userId: string
    userName: string
}

export interface Achievements {
    books: BasicAchievement
    friends: FriendsAchievement
    pages: BasicAchievement
    score: BasicAchievement
    streak: BasicAchievement
}

export interface FriendsAchievement {
    level: 0 | 1 | 2 | 3 | 4 | 5,
    value: number
}

export interface BasicAchievement {
    level: BasicAchievementLevel,
    value: number
}

export type BasicAchievementLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10


export interface Book {
    id: string,
    pagesRead: number,
    status: BookStatus,
    myScore: number
}

export interface DailyReadPages {
    date: DateGT,
    pages: Number
}

export interface DateGT {
    nanoseconds: number
    seconds: number
}

export interface Friend {
    id:string,
    username: string,
    avatar:string | null,
}

export enum BookStatus {
    PlanToRead = 0,
    Reading,
    Completed,
}

export interface ProfileListItem {
    username:string,
    id: string,
    avatar: string | null
}
