import {BookStatus} from "./BookShelf.model";

export default interface BookItemProps {
    title: string
    bookCover?: string
    isFromMyBookList?: boolean
    number?:number
    score?: number
    pagesRead?: number
    maxPages?: number
    booksRead?: number
    status?:BookStatus | null
}
