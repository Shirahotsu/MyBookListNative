import React from 'react';
import {View} from "../components/Themed";
import AchievementItem from "../components/Achievements/AchievementItem";
import {Achievements} from "../models/Profile.model";
import {getMaxValue} from "../utils/achievement.util";
import {StyleSheet} from "react-native";
import Spacing from "../constants/Spacing";
import {Observer} from 'mobx-react'
import {achievementsStore} from "../store/achievements.store";

const mock: Achievements = {
    books: {
        level: 3,
        value: 5
    },
    friends: {
        level: 0,
        value: 0
    },
    pages: {
        level: 4,
        value: 199
    },
    score: {
        level: 10,
        value: 50
    },
    streak: {
        level: 5,
        value: 65
    },
}

const AchievementsScreen = () => {
    return (
        <Observer>
            {() => (
                <View style={s.container}>
                    <AchievementItem
                        level={achievementsStore.achievements.books.level}
                        type={'books'}
                        image={`books/books${achievementsStore.achievements.books.level}`}
                        title={'Książnik'}
                        description={'Przeczytaj daną ilość książek'}
                        currentValue={achievementsStore.achievements.books.value}
                        maxValue={getMaxValue('books', achievementsStore.achievements.books.level)}/>
                    <AchievementItem
                        level={achievementsStore.achievements.friends.level}
                        type={'friends'}
                        image={`friends/friends${achievementsStore.achievements.friends.level}`}
                        title={'Koleszka'}
                        description={'Dodaj nowych znajomych'}
                        currentValue={achievementsStore.achievements.friends.value}
                        maxValue={getMaxValue('friends', achievementsStore.achievements.friends.level)}/>
                    <AchievementItem
                        level={achievementsStore.achievements.pages.level}
                        type={'pages'}
                        image={`pages/pages${achievementsStore.achievements.pages.level}`}
                        title={'Stronny'}
                        description={'Przeczytaj daną ilość stron'}
                        currentValue={achievementsStore.achievements.pages.value}
                        maxValue={getMaxValue('pages', achievementsStore.achievements.pages.level)}/>
                    <AchievementItem
                        level={achievementsStore.achievements.score.level}
                        type={'score'}
                        image={`score/score${achievementsStore.achievements.score.level}`}
                        title={'Krytyk'}
                        description={'Oceń książki'}
                        currentValue={achievementsStore.achievements.score.value}
                        maxValue={getMaxValue('score', achievementsStore.achievements.score.level)}/>
                    {/*<AchievementItem*/}
                    {/*    level={achievementsStore.achievements.streak.level}*/}
                    {/*    image={`streak/streak${achievementsStore.achievements.streak.level}`}*/}
                    {/*    title={'Silna wola'}*/}
                    {/*    description={'Utrzymuj codzienną passę'}*/}
                    {/*    currentValue={achievementsStore.achievements.streak.value}*/}
                    {/*    maxValue={getMaxValue('streak', achievementsStore.achievements.streak.level)}/>*/}
                </View>
            )}
        </Observer>
    );
};
const s = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: Spacing.md,
    }
})
export default AchievementsScreen;
