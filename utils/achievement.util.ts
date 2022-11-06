import {BasicAchievementLevel} from "../models/Profile.model";
import {AchievementType} from "../models/Achievement.model";


const achievementInfo = {
    books: {
        maxValue: [1, 3, 5, 10, 15, 20, 30, 40, 50, 100],
    },
    friends: {
        maxValue: [1, 3, 5, 10, 20],
    },
    pages: {
        maxValue: [1, 10, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
    },
    score: {
        maxValue: [1, 3, 5, 10, 15, 20, 25, 30, 40, 50],
    },
    streak: {
        maxValue: [3, 7, 14, 30, 60, 90, 120, 180, 270, 365],
    }
}


export const getMaxValue = (type: AchievementType, level: BasicAchievementLevel): number => {
    if (type === 'friends' && level === 5) {
        return 20
    }
    if (level === 10) {
        return achievementInfo[type].maxValue[9]
    }
    return achievementInfo[type].maxValue[level]
}

export const isLevelingUp = (type: AchievementType, level: BasicAchievementLevel, value: number): boolean => {
    if (type === 'friends' && level === 5 || level === 10) {
        return false
    }
    const maxValue = getMaxValue(type, level)
    return value >= maxValue
}

export const getLevelByValue = (type: AchievementType, value: number): BasicAchievementLevel => {
    const levelByValue = achievementInfo[type].maxValue.findIndex(v => value < v)
    if (type === 'friends') {
        return levelByValue === -1 ? 5 : <BasicAchievementLevel>levelByValue
    }
    return levelByValue === -1 ? 10 : <BasicAchievementLevel>levelByValue
}
