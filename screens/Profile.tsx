import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';

import {Button, ScrollView, Text, View} from '../components/Themed';
import BasicInfo from '../components/Profile/BasicInfo';
import Spacing from '../constants/Spacing';
import {logOut} from '../firebase/main.firebase';
import {userStore} from '../store/user.store';
import {useToast} from 'react-native-toast-notifications';
// import {FontAwesome5} from '@expo/vector-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import FontSize from '../constants/FontSize';
import React from 'react';
import Colors from '../constants/Colors';
import {RootTabScreenProps} from '../types';
import {achievementsStore} from '../store/achievements.store';
import { createMockBooks } from "../firebase/books.firebase.mock";

export default function Profile({navigation}: RootTabScreenProps<'Profile'>) {
  const colorScheme = useColorScheme();
  const toast = useToast();

  const handleOnLogOut = async () => {
    const response = await logOut();
    if (response) {
      userStore.removeUser();
      toast.show('Pomyślnie wylogowano', {type: 'success'});
    } else {
      toast.show('Błąd z wylogowaniem, spróbuj jeszcze raz', {type: 'danger'});
    }
  };

  const navigateTo = (link: string) => {
    navigation.push(link);
  };

  const showAchievementModal = () => {
    achievementsStore.showAchievementModal('pages', 4);
  };

  const LinkButton = ({label, link}) => {
    return (
      <TouchableOpacity onPress={() => navigateTo(link)}>
        <View style={s.linkButtonContainer}>
          <Text style={s.linkButtonText}>{label}</Text>
          <View style={s.iconView}>
            <FontAwesomeIcon
              size={FontSize.h5}
              icon={faChevronRight}
              color={Colors[colorScheme].text}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.basicInfo}>
        <BasicInfo />
        <View>
          <LinkButton label={'Znajomi'} link={'Friends'} />
          <View style={s.horizontalBar} />
          <LinkButton label={'Wykresy'} link={'Charts'} />
          <View style={s.horizontalBar} />
          <LinkButton label={'Osiągnięcia'} link={'Achievements'} />
        </View>
        <View style={s.logOutButton}>
          <Button title={'Wyloguj się'} onPress={() => handleOnLogOut()} />
        </View>

        <View style={s.logOutButton}>
          <Button
            title={'Show achievement'}
            onPress={() => showAchievementModal()}
          />
        </View>
        <View style={s.logOutButton}>
          <Button
            title={'createMockBooks'}
            onPress={() => createMockBooks()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  basicInfo: {
    marginVertical: Spacing.xl,
  },
  linkButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logOutButton: {
    marginTop: Spacing.xl,
  },
  linkButtonText: {
    fontSize: FontSize.h5,
  },
  iconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  horizontalBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#cecece',
  },
});
