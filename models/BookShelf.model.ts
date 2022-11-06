import {Book, Score} from "./Book.model";

export interface BookShelfItem extends Book {
    pagesRead: number,
    status: BookStatus|null,
    myScore: Score | null,
}

export enum BookStatus {
    PlanToRead = 0,
    Reading,
    Completed,
}
