import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";

import { Button, Text, TextInput } from "../components/Themed";
import Spacing from "../constants/Spacing";
import { login, register } from "../firebase/main.firebase";
import React, { useState } from "react";
import FontSize from "../constants/FontSize";
import { createProfileDetails, loadProfileDetails } from "../firebase/profile.firebase";

export default function LogIn({ navigation }: any) {
  const image = require("../assets/images/main-auth-bg.png");
  const toast = useToast();
  const [isInLoginView, setIsInLoginView] = useState(true);
  const [loginParams, setLoginParams] = useState({
    email: "",
    password: "",
  });

  const setEmail = value => {
    setLoginParams({ ...loginParams, email: value });
  };
  const setPassword = value => {
    setLoginParams({ ...loginParams, password: value });
  };

  const onLogIn = async () => {
    const response = await login(loginParams.email, loginParams.password);
    if (response.success) {
      toast.show("Pomyślnie zalogowano", { type: "success" });
    } else {
      toast.show(String(response.value), { type: "danger" });
    }
  };

  const onSignIn = async () => {
    console.log("%c onSignIn", "color:fuchsia");
    const response = await register(loginParams.email, loginParams.password);
    if (response.success) {
      console.log("response", response);
      await createProfileDetails(response.value.user.uid);
      await loadProfileDetails();
      toast.show("Pomyślnie zarejestrowano się", { type: "success" });
    } else {
      toast.show(String(response.value), { type: "danger" });
    }
  };

  const changeView = () => {
    setLoginParams({email: '', password: ''})
    setIsInLoginView(!isInLoginView);
  };

  return (
    <View style={s.container}>
      <ImageBackground source={image} resizeMode="cover" style={s.image}>
        <View style={{ marginTop: -150 }}>
          <View style={s.logo}>
            <ImageBackground source={require("../assets/images/main-logo.png")} resizeMode="cover" style={s.image} />
          </View>
          <View style={s.basicInfo}>
            <TextInput
              onChangeText={setEmail}
              value={loginParams.email}
              placeholder={"Email"}
              style={{ marginTop: Spacing.sm }}
            />
            <TextInput
              onChangeText={setPassword}
              value={loginParams.password}
              placeholder={"Password"}
              secureTextEntry={true}
              style={{ marginTop: Spacing.sm }}
            />
            <View style={{ marginTop: Spacing.md, marginBottom: Spacing.lg }}>
              {
                isInLoginView
                  ? <Button title={"Zaloguj się"} onPress={onLogIn} />
                  : <Button title={"Zarejestruj się"} onPress={onSignIn} />
              }

            </View>
            <View style={{ marginTop: Spacing.xl, justifyContent: "space-around", alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                {
                  isInLoginView ?
                    <>
                      <Text style={{ fontSize: FontSize.h5 }}>Nie masz konta?</Text>
                      <TouchableOpacity
                        onPress={() => {
                          changeView();
                        }}
                      >
                        <Text style={{
                          fontSize: FontSize.h5,
                          marginLeft: Spacing.sm,
                          borderBottomColor: "white",
                          borderBottomWidth: 1,
                        }}>Zarejestruj się</Text>
                      </TouchableOpacity>
                    </>
                    :
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          changeView();
                        }}
                      >
                        <Text style={{
                          fontSize: FontSize.h5,
                          marginLeft: Spacing.sm,
                          borderBottomColor: "white",
                          borderBottomWidth: 1,
                        }}>Wróć do logowania</Text>
                      </TouchableOpacity>
                    </>
                }

              </View>
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
  },

  basicInfo: {
    marginTop: 80,
    marginBottom: Spacing.xs,
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    with: "100%",
  },
  logo: {
    height: 128,
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: Spacing.xl,
  },
});
