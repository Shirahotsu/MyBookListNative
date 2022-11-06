import {Image, StyleSheet} from 'react-native';

import {Text, View, Button, TextInput} from '../Themed';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import React, {useEffect, useState} from 'react';
import {
  loadProfileDetails,
  updateUserName,
} from '../../firebase/profile.firebase';
import {profileStore} from '../../store/profile.store';
import {Observer} from 'mobx-react';
import Modal from '../Modal';

export default function BasicInfo() {
  const [userName, setUserName] = useState({
    value: '',
  });
  const modalRef = React.createRef();

  useEffect(async () => {
    await loadProfileDetails();
    if (profileStore.profile.userName !== userName.value) {
      setUserName({value: profileStore.profile.userName});
    }
  }, []);

  const handleOnEditPress = () => {
    console.log('%c HANDLE', 'color:fuchsia');
    modalRef.current.open();
  };

  const handleOnSave = async () => {
    const result = await updateUserName(userName.value);
    modalRef.current.close();
  };

  const handleOnCancel = async () => {
    setUserName({value: profileStore.profile.userName});
    modalRef.current.close();
  };

  const handleUserNameChange = val => {
    setUserName({value: val});
  };

  return (
    <Observer>
      {() => (
        <View style={s.container}>
          <View style={s.avatarContainer}>
            <Image
              style={s.avatarImage}
              source={require('../../assets/images/avatar2.png')}
            />
          </View>
          <View style={s.infoContainer}>
            <Text onPress={() => handleOnEditPress()} style={s.infoText}>
              {profileStore.profile.userName}
            </Text>
            <Text style={s.infoText}>Poziom: {profileStore.userLevel}</Text>
            <View />
            {/*<Text style={s.infoText}>Dni pod rząd: {profileStore.profile.achievements.streak.value}</Text>*/}
          </View>
          <Modal ref={modalRef}>
            <View>
              <TextInput
                style={{width: 250}}
                value={userName.value}
                onChangeText={v => handleUserNameChange(v)}
              />
              <View style={s.buttonsView}>
                <View style={{marginRight: Spacing.sm}}>
                  <Button title={'Zapisz'} onPress={() => handleOnSave()} />
                </View>
                <Button
                  color={'#607D8B'}
                  title={'Anuluj'}
                  onPress={() => handleOnCancel()}
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </Observer>
  );
}

const s = StyleSheet.create({
  container: {
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
