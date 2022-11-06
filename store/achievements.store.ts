import {Achievements, BasicAchievement, BasicAchievementLevel, FriendsAchievement} from "../models/Profile.model";
import {action, makeObservable, observable} from "mobx";
import {AchievementType, NewAchievementDialog} from "../models/Achievement.model";
import {getLevelByValue} from "../utils/achievement.util";
import {updateAchievements} from "../firebase/profile.firebase";

const INITIAL_NEW_ACHIEVEMENT: NewAchievementDialog = {
    message: '',
    type: 'books',
    level: 1,
    isVisible: false
}

class AchievementsStore {
    achievements: Achievements = {
        streak: {
            value: 0,
            level: 0
        },
        books: {
            value: 0,
            level: 0
        },
        friends: {
            value: 0,
            level: 0
        },
        pages: {
            value: 0,
            level: 0
        },
        score: {
            value: 0,
            level: 0
        },
    }

    newAchievementDialog: NewAchievementDialog = INITIAL_NEW_ACHIEVEMENT

    constructor() {
        makeObservable(this, {
            achievements: observable,
            newAchievementDialog: observable,
            setAchievements: action,
            updateAchievement: action,
            setNewAchievementDialog: action,
            clearNewAchievementDialog: action,
            showAchievementModal: action,
            hideAchievementModal: action,
        })
    }

    setAchievements(achievements: Achievements) {
        this.achievements = achievements
    }

    async updateAchievement(type: AchievementType, achievement: BasicAchievement | FriendsAchievement) {
        // @ts-ignore
        if ((type === 'friends' && achievement.level === 5) || achievement.level === 10) {
            return
        }
        this.achievements[type] = achievement
        await updateAchievements(this.achievements)
    }

    setNewAchievementDialog(newAchievementDialog: NewAchievementDialog) {
        this.newAchievementDialog = newAchievementDialog
    }

    clearNewAchievementDialog() {
        this.newAchievementDialog = INITIAL_NEW_ACHIEVEMENT
    }

    async updateAchievementValue(value: number, type: AchievementType) {
        const currentLevel = this.achievements[type].level
        const currentValue = this.achievements[type].value
        const newValue = currentValue + value
        const levelFromValue = getLevelByValue(type, newValue)
        const newLevel = levelFromValue > currentLevel ? levelFromValue : currentLevel
        const achievement: BasicAchievement = {
            value: newValue < 0 ? 0 : newValue,
            level: newLevel
        }
        if(levelFromValue > currentLevel){
            this.showAchievementModal(type, levelFromValue)
        }
        await this.updateAchievement(type, achievement)
    }

    async updateAchievementOnBookRemove(removeScore: boolean, removeBook: boolean, removePages: number) {
        if (removeScore) {
            this.achievements.score.value--
        }
        if (removeBook) {
            this.achievements.books.value--
        }
        if (removePages > 0) {
            this.achievements.pages.value = this.achievements.pages.value - removePages
        }
        await updateAchievements(this.achievements)
    }

    showAchievementModal(type:AchievementType, level:BasicAchievementLevel) {
        this.newAchievementDialog.type = type
        this.newAchievementDialog.level = level
        this.newAchievementDialog.isVisible = true
    }

    hideAchievementModal() {
        this.newAchievementDialog.isVisible = false
        setTimeout(()=>{
            this.newAchievementDialog = INITIAL_NEW_ACHIEVEMENT
        }, 4000)
    }

}

export const achievementsStore = new AchievementsStore()
