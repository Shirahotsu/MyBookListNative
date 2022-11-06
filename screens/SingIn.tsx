import {ScrollView, StyleSheet} from 'react-native';

import {Button, Text, View, TextInput} from '../components/Themed';
import Spacing from '../constants/Spacing';
import {register} from '../firebase/main.firebase';
import {
  createProfileDetails,
  loadProfileDetails,
} from '../firebase/profile.firebase';
import React, {useState} from 'react';
import {useToast} from 'react-native-toast-notifications';

export default function SignIn({navigation}: any) {
  const [loginParams, setLoginParams] = useState({
    email: '',
    password: '',
  });

  const toast = useToast();

  const setEmail = value => {
    setLoginParams({...loginParams, email: value});
  };
  const setPassword = value => {
    setLoginParams({...loginParams, password: value});
  };

  const onSignIn = async () => {
    console.log('%c onSignIn', 'color:fuchsia');
    const response = await register(loginParams.email, loginParams.password);
    if (response.success) {
      console.log('response', response);
      await createProfileDetails(response.value.user.uid);
      await loadProfileDetails();
      toast.show('Pomyślnie zarejestrowano się', {type: 'success'});
    } else {
      toast.show(String(response.value), {type: 'danger'});
    }
  };

  return (
    <View style={s.basicInfo}>
      <Text>SignIn</Text>
      <Button title={'Login'} onPress={() => navigation.push('Login')} />

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
      <Button title={'Zarejestruj się'} onPress={() => onSignIn()} />
    </View>
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
