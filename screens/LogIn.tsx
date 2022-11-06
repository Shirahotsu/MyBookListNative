import {ScrollView, StyleSheet} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

import {Button, TextInput, View} from '../components/Themed';
import Spacing from '../constants/Spacing';
import {login} from '../firebase/main.firebase';
import React, {useState} from 'react';

export default function LogIn({navigation}: any) {
  console.log('HALOOOO');
  const toast = useToast();

  const [loginParams, setLoginParams] = useState({
    email: 'arek.erdu@o2.pl',
    password: 'wsadwsad1',
  });

  const setEmail = value => {
    setLoginParams({...loginParams, email: value});
  };
  const setPassword = value => {
    setLoginParams({...loginParams, password: value});
  };

  const onLogIn = async () => {
    const response = await login(loginParams.email, loginParams.password);
    if (response.success) {
      toast.show('Pomyślnie zalogowano', {type: 'success'});
    } else {
      toast.show(String(response.value), {type: 'danger'});
    }
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.basicInfo}>
        {/*<Button title={'LOGIN'} onPress={() => {*/}
        {/*  login('arek.erdu@o2.pl', 'wsadwsad1').then()*/}
        {/*}}/>*/}
        {/*<Button title={'REGISTER'} onPress={() => {*/}
        {/*  register('arek.erdu@o2.pl', 'wsadwsad1').then()*/}
        {/*}}/>*/}
        <Button
          title={'REGISTER'}
          onPress={() => {
            navigation.push('SignIn');
          }}
        />
        <TextInput
          onChangeText={setEmail}
          value={loginParams.email}
          placeholder={'Email'}
        />
        <TextInput
          onChangeText={setPassword}
          value={loginParams.password}
          placeholder={'Password'}
        />
        <Button title={'Zaloguj się'} onPress={onLogIn} />
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
});
