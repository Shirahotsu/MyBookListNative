import React, {useEffect} from 'react';
import {ScrollView, Text, View} from '../components/Themed';
import BasicInfo from '../components/Profile/BasicInfo';
import {Image, StyleSheet} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {friendProfileStore} from '../store/friendProfile.store';
import {observer, Observer} from 'mobx-react';
import {loadBooksInFriendsBookshelf} from '../firebase/friendProfile.firebase';
import BookItem from '../components/BookItem/BookItem';
import AchievementsScreen from './Achievements.screen';
import FriendsAchievements from '../components/Friend/FriendsAchievements';

const FriendProfileScreen = () => {
  useEffect(() => {
    loadBooksInFriendsBookshelf();
  }, []);

  const BasicInfo = () =>
    friendProfileStore.profile && (
      <View style={s.infoContainerView}>
        <View style={s.avatarContainer}>
          <Image
            style={s.avatarImage}
            source={require('../assets/images/avatar2.png')}
          />
        </View>
        <View style={s.infoContainer}>
          <Text style={s.infoText}>{friendProfileStore.profile.userName}</Text>
          <Text style={s.infoText}>Poziom: {friendProfileStore.userLevel}</Text>
          <View />
          {/*<Text style={s.infoText}>Dni pod rząd: {friendProfileStore.profile.achievements.streak.value}</Text>*/}
        </View>
      </View>
    );

  const Bookshelf = observer(() => {
    return (
      <View>
        {friendProfileStore.bookshelf.map(book => {
          return (
            <BookItem
              key={book.id}
              isFromMyBookList={true}
              title={book.title}
              pagesRead={book.pagesRead}
              maxPages={book.pages}
              score={book.myScore}
              status={book.status}
            />
          );
        })}
      </View>
    );
  });

  return (
    <ScrollView style={s.container}>
      <Observer>
        {() => (
          <View>
            <View style={s.basicInfo}>
              <BasicInfo />
            </View>
            <Text
              style={{
                fontSize: FontSize.h2,
                marginTop: Spacing.xl,
                marginBottom: Spacing.md,
              }}>
              KSIĄŻKI:
            </Text>
            <Bookshelf />
            <Text style={{fontSize: FontSize.h2, marginTop: Spacing.xl}}>
              OSIĄGNIĘCIA:
            </Text>
            <FriendsAchievements />
          </View>
        )}
      </Observer>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  basicInfo: {
    marginVertical: Spacing.xl,
  },
  infoContainerView: {
    flexDirection: 'row',
    width: '100%',
  },
  avatarContainer: {
    alignSelf: 'flex-end',
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 100,
  },
  avatarImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingHorizontal: Spacing.lg,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: FontSize.h4,
    // textOverflow: "ellipsis",
    width: 190,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.md,
  },
});

export default FriendProfileScreen;
