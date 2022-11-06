import {BookShelfItem} from "../models/BookShelf.model";
import {action, makeObservable, observable} from "mobx";

class BookShelfStore {
    bookShelf: BookShelfItem[] = []

    constructor() {
        makeObservable(this, {
            bookShelf:observable,
            setBookShelf: action,
            clearBookshelf: action
        })
    }

    setBookShelf(bookShelf: BookShelfItem[]) {
        this.bookShelf = bookShelf
    }

    clearBookshelf() {
        this.bookShelf = []
    }

    loadBookShelf(){

    }
}


export const bookShelfStore = new BookShelfStore()
