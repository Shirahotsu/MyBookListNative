import React from 'react';
import {Observer} from 'mobx-react';
import {View} from '../Themed';
import AchievementItem from '../Achievements/AchievementItem';
import {getMaxValue} from '../../utils/achievement.util';
import {StyleSheet} from 'react-native';
import Spacing from '../../constants/Spacing';
import {friendProfileStore} from '../../store/friendProfile.store';

const FriendsAchievements = () => {
  return (
    <Observer>
      {() =>
        friendProfileStore.profile && (
          <View style={s.container}>
            <AchievementItem
              level={friendProfileStore.profile.achievements.books.level}
              type={'books'}
              image={`books/books${friendProfileStore.profile.achievements.books.level}`}
              title={'Książnik'}
              description={'Przeczytaj daną ilość książek'}
              currentValue={friendProfileStore.profile.achievements.books.value}
              maxValue={getMaxValue(
                'books',
                friendProfileStore.profile.achievements.books.level,
              )}
            />
            <AchievementItem
              level={friendProfileStore.profile.achievements.friends.level}
              type={'friends'}
              image={`friends/friends${friendProfileStore.profile.achievements.friends.level}`}
              title={'Koleszka'}
              description={'Dodaj nowych znajomych'}
              currentValue={
                friendProfileStore.profile.achievements.friends.value
              }
              maxValue={getMaxValue(
                'friends',
                friendProfileStore.profile.achievements.friends.level,
              )}
            />
            <AchievementItem
              level={friendProfileStore.profile.achievements.pages.level}
              type={'pages'}
              image={`pages/pages${friendProfileStore.profile.achievements.pages.level}`}
              title={'Stronny'}
              description={'Przeczytaj daną ilość stron'}
              currentValue={friendProfileStore.profile.achievements.pages.value}
              maxValue={getMaxValue(
                'pages',
                friendProfileStore.profile.achievements.pages.level,
              )}
            />
            <AchievementItem
              level={friendProfileStore.profile.achievements.score.level}
              type={'score'}
              image={`score/score${friendProfileStore.profile.achievements.score.level}`}
              title={'Krytyk'}
              description={'Oceń książki'}
              currentValue={friendProfileStore.profile.achievements.score.value}
              maxValue={getMaxValue(
                'score',
                friendProfileStore.profile.achievements.score.level,
              )}
            />
            {/*<AchievementItem*/}
            {/*    level={friendProfileStore.profile.achievements.streak.level}*/}
            {/*    image={`streak/streak${friendProfileStore.profile.achievements.streak.level}`}*/}
            {/*    title={'Silna wola'}*/}
            {/*    description={'Utrzymuj codzienną passę'}*/}
            {/*    currentValue={friendProfileStore.profile.achievements.streak.value}*/}
            {/*    maxValue={getMaxValue('streak', friendProfileStore.profile.achievements.streak.level)}/>*/}
          </View>
        )
      }
    </Observer>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: Spacing.md,
  },
});

export default FriendsAchievements;
