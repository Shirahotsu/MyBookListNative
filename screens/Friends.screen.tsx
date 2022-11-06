import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Image, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
// import {FontAwesome5} from '@expo/vector-icons';
import {Button, ScrollView, Text, TextInput, View} from '../components/Themed';
import {profileStore} from '../store/profile.store';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import {
  addUserToFriends,
  loadProfileList,
  removeUserFromFriends,
} from '../firebase/profile.firebase';
import Colors from '../constants/Colors';
import {Friend} from '../models/Profile.model';
import {useToast} from 'react-native-toast-notifications';
import {loadFriendProfileDetails} from '../firebase/friendProfile.firebase';
import {RootTabScreenProps} from '../types';
import {achievementsStore} from '../store/achievements.store';

const FriendScreen = ({navigation}: RootTabScreenProps<'Profile'>) => {
  let timer;
  const toast = useToast();
  const [isInAddingMode, setIsInAddingMode] = useState(false);

  useEffect(() => {}, []);

  const handleOnIconClick = async (friend: Friend, mode: string) => {
    if (mode === 'add') {
      const result = await addUserToFriends(friend);
      if (result) {
        achievementsStore.updateAchievementValue(1, 'friends');
        toast.show('Dodano znajomego :)', {type: 'success'});
      } else {
        toast.show('Ups... coś poszło nie tak', {type: 'danger'});
      }
    } else {
      const result = await removeUserFromFriends(friend);
      if (result) {
        achievementsStore.updateAchievementValue(-1, 'friends');
        toast.show('Usunięto znajomego :c', {type: 'success'});
      } else {
        toast.show('Ups... coś poszło nie tak', {type: 'danger'});
      }
    }
  };

  const handleOnUserTextPress = async (friend: Friend, mode: string) => {
    if (mode === 'add') {
      return;
    }
    const response = await loadFriendProfileDetails(friend.id);
    if (response) {
      navigation.push('FriendProfile');
    } else {
      toast.show('Ups... coś poszło nie tak', {type: 'danger'});
    }
  };

  const Friend = ({friend, mode = 'view'}) => {
    return (
      <View style={s.friendView}>
        <View style={s.avatarContainer}>
          <Image
            style={s.avatarImage}
            source={require('../assets/images/avatar2.png')}
          />
        </View>

        <View style={s.usernameView}>
          <TouchableOpacity onPress={() => handleOnUserTextPress(friend, mode)}>
            <Text style={{fontSize: FontSize.h4}}>{friend.username}</Text>
          </TouchableOpacity>
        </View>
        <Pressable onPress={() => handleOnIconClick(friend, mode)}>
          <View style={s.removeFriendIconView}>
            {/*<FontAwesome5*/}
            {/*  size={FontSize.h4}*/}
            {/*  name={mode === 'add' ? 'plus' : 'trash'}*/}
            {/*  color={mode === 'add' ? Colors.dark.tint : '#f44336'}*/}
            {/*/>*/}
          </View>
        </Pressable>
      </View>
    );
  };

  const searchUsers = value => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      profileStore.filterFriends(value);
    }, 300);
  };

  const searchNewUsers = async value => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (value.trim().length < 1) {
        return;
      }
      loadProfileList(value);
    }, 500);
  };
  const changeToAddingMode = () => {
    setIsInAddingMode(true);
    profileStore.clearProfileList();
  };

  const changeToViewFriendsMode = () => {
    setIsInAddingMode(false);
    profileStore.filterFriends('');
  };

  const MyFriendsView = observer(() => {
    return (
      <>
        <View style={{marginBottom: Spacing.md}}>
          <TextInput
            placeholder={'Wyszukaj'}
            onChangeText={v => searchUsers(v)}
          />
        </View>
        {profileStore.filteredFriends.length > 0 ? (
          profileStore.filteredFriends.map(friend => (
            <Friend key={friend.id} friend={friend} />
          ))
        ) : (
          <View>
            <Text>NIC</Text>
          </View>
        )}
      </>
    );
  });

  const FriendsToAddView = observer(() => {
    return (
      <>
        <View style={{marginBottom: Spacing.md}}>
          <TextInput
            placeholder={'Wyszukaj'}
            onChangeText={v => searchNewUsers(v)}
          />
        </View>
        {profileStore.profileList.length > 0 ? (
          profileStore.profileList.map(friend => (
            <Friend key={friend.id} friend={friend} mode={'add'} />
          ))
        ) : (
          <View>
            <Text>NIC</Text>
          </View>
        )}
      </>
    );
  });

  return (
    <ScrollView style={{paddingHorizontal: Spacing.sm}}>
      <View style={{marginTop: Spacing.md, marginBottom: Spacing.lg}}>
        {isInAddingMode ? (
          <Button
            title={'Wróć do listy znajomych'}
            onPress={() => changeToViewFriendsMode()}
          />
        ) : (
          <Button
            title={'Dodaj nowego znajomego'}
            onPress={() => changeToAddingMode()}
          />
        )}
      </View>
      {isInAddingMode ? <FriendsToAddView /> : <MyFriendsView />}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  friendView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarView: {
    width: 50,
    height: 50,
  },
  usernameView: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  removeFriendIconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 100,
  },
  avatarImage: {
    resizeMode: 'cover',
    // width: '100%',
    // height: '100%'
  },
});

export default FriendScreen;
