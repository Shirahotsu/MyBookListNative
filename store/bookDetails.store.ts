import {action, computed, makeObservable, observable} from "mobx";
import {Book, Score} from "../models/Book.model";
import {BookStatus} from "../models/BookShelf.model";

class BookDetailsStore {
    bookDetails: Book | null = null
    isInBookshelfView: boolean = false

    constructor() {
        makeObservable(this, {
            bookDetails: observable,
            setBookDetails: action,
            setIsInBookshelfView: action,
            addComment: action,
            updateMyScore: action,
            updatePagesRead: action,
            updateStatus: action,
            updateTotalScore:action,
            updateScoreAmount:action,
            updateUsersFinished:action,
            totalScore:computed,
            scoreAmount:computed,
        })
    }

    setBookDetails(bookDetails: Book) {
        this.bookDetails = bookDetails
    }

    setIsInBookshelfView(isInBookshelfView: boolean){
        this.isInBookshelfView = isInBookshelfView
    }

    addComment(comment: any){
        this.bookDetails?.comments.push(comment)
    }

    updateMyScore(myScore: Score){
        if(!this.bookDetails) return
        this.bookDetails.myScore = myScore
    }
    updatePagesRead(pagesRead: number){
        if(!this.bookDetails) return
        this.bookDetails.pagesRead = pagesRead
    }
    updateStatus(status: BookStatus){
        if(!this.bookDetails) return
        this.bookDetails.status = status
        console.log(this.bookDetails.status)
    }
    updateTotalScore(totalScore:number){
        if(!this.bookDetails) return
        this.bookDetails.totalScore= totalScore
        console.log(this.bookDetails.totalScore)
    }
    updateScoreAmount(scoreAmount:number){
        if(!this.bookDetails) return
        this.bookDetails.scoreAmount = scoreAmount
        console.log(this.bookDetails.scoreAmount)
    }

    updateUsersFinished(usersFinished:number){
        if(!this.bookDetails) return
        this.bookDetails.usersFinished = usersFinished
    }

    get totalScore():number | unknown{
        return this.bookDetails?.totalScore
    }

    get scoreAmount():number | unknown{
        return this.bookDetails?.scoreAmount
    }
}

export const bookDetailsStore = new BookDetailsStore()
