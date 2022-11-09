import { ImageBackground, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, View } from "react-native";
import {useToast} from 'react-native-toast-notifications';

import {Button, TextInput, Text} from '../components/Themed';
import Spacing from '../constants/Spacing';
import {login} from '../firebase/main.firebase';
import React, {useState} from 'react';
import FontSize from "../constants/FontSize";

export default function LogIn({navigation}: any) {
  const image = require('../assets/images/auth-screen.png')
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
    <View style={s.container}>
      <ImageBackground source={image} resizeMode="cover" style={s.image}>
      <View style={s.basicInfo}>
        <TextInput
          onChangeText={setEmail}
          value={loginParams.email}
          placeholder={'Email'}
          style={{marginTop:Spacing.sm}}
        />
        <TextInput
          onChangeText={setPassword}
          value={loginParams.password}
          placeholder={'Password'}
          secureTextEntry={true}
          style={{marginTop:Spacing.sm}}
        />
        <View style={{marginTop:Spacing.md, marginBottom: Spacing.lg}}>
          <Button title={'Zaloguj się'} onPress={onLogIn} />
        </View>
        <View style={{marginTop:Spacing.xl, justifyContent:"space-around", alignItems: "center"}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: FontSize.h5}}>Nie masz konta?</Text>
            <TouchableOpacity
              onPress={() => {
              navigation.push('SignIn');
            }}
            >
              <Text style={{fontSize: FontSize.h5, marginLeft:Spacing.sm, borderBottomColor:'white', borderBottomWidth: 1}}>Zarejestruj się</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  basicInfo: {
    marginVertical: Spacing.xl,
    width: '100%'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    with: '100%'
  },
});
