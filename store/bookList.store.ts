import {Book} from "../models/Book.model";
import {action, computed, makeObservable, observable} from "mobx";
import {loadFirst10Books} from "../firebase/bookList.firebase";

const INITIAL_SORT_OPTION = {
    sortBy: 'totalScore',
    direction: 'desc'
}

class BookListStore {
    bookList: Book[] = []
    lastVisibleDoc: any = null
    loadMoreBooks: boolean = true
    sortOption = INITIAL_SORT_OPTION

    constructor() {
        makeObservable(this, {
            lastVisibleDoc: observable,
            bookList: observable,
            loadMoreBooks: observable,
            sortOption: observable,
            setBookList: action,
            addToBookList: action,
            setLoadMoreBooks: action,
            setSortBy: action,
            toggleSortDirection: action,
            setInitialSortOptionState: action,
            bookListLength: computed,
            lastBook: computed
        })
    }

    setBookList(bookList: Book[]) {
        this.bookList = bookList
    }

    setLastVisibleDoc(doc: any) {
        this.lastVisibleDoc = doc
    }

    setLoadMoreBooks(loadMoreBooks: boolean) {
        this.loadMoreBooks = loadMoreBooks
    }

    setInitialSortOptionState() {
        this.sortOption = INITIAL_SORT_OPTION
    }

    addToBookList(bookList: Book[]) {
        this.bookList?.push(...bookList)
    }

    setSortBy(sortBy: string) {
        this.sortOption.sortBy = sortBy
        this.reloadBookList()
    }

    toggleSortDirection() {
        if (this.sortOption.direction === 'asc') {
            this.sortOption.direction = 'desc'
        } else {
            this.sortOption.direction = 'asc'
        }
        this.reloadBookList()
    }

    reloadBookList() {
        loadFirst10Books()
    }

    get bookListLength() {
        return this.bookList.length
    }

    get lastBook() {
        return this.bookList[this.bookList.length - 1]
    }

}

export const bookListStore = new BookListStore()
