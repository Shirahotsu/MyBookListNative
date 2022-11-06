import {DayStreakModel} from "../models/DayStreak.model";
import {action, makeObservable, observable} from "mobx";
import {convertDateToSeconds, convertSecondsToDate} from "../utils/date";

class DayStreakStore {

    dayStreak: DayStreakModel = {
        lastDateUpdate: 0,
        startDate: 0
    }

    constructor() {
        makeObservable(this, {
            dayStreak: observable,
            checkIsStreak: action
        })
    }


    checkIsStreak(){
    }

}

export const dayStreakStore = new DayStreakStore()
