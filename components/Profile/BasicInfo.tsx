import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Button, Text, TextInput, View } from "../Themed";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import React, { useEffect, useState } from "react";
import { getUserAvatar, loadProfileDetails, updateUserAvatar, updateUserName } from "../../firebase/profile.firebase";
import { profileStore } from "../../store/profile.store";
import { Observer } from "mobx-react";
import Modal from "../Modal";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import {useToast} from 'react-native-toast-notifications';
import { createMockBooks } from "../../firebase/books.firebase.mock";
import { achievementsStore } from "../../store/achievements.store";

export default function BasicInfo() {
  const [userName, setUserName] = useState({
    value: "",
  });
  const [isMockDisabled, setIsMockDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const modalRef = React.createRef();
  const toast = useToast();

  useEffect(() => {
    handelOnUseEffect();
  }, []);

  const handelOnUseEffect = async () => {
    await loadProfileDetails();
    if (profileStore.profile.userName !== userName.value) {
      setUserName({ value: profileStore.profile.userName });
    }
    const avatarImg: string | null = profileStore.profile.avatar;
    if (avatarImg) {
      const avatar = await getUserAvatar(avatarImg)
      setImage(avatar);
    } else {
      setImage(null);
    }
  };

  const handleOnEditPress = () => {
    modalRef.current.open();
  };

  const handleOnSave = async () => {
    const result = await updateUserName(userName.value);
    modalRef.current.close();
  };

  const handleOnCancel = async () => {
    setUserName({ value: profileStore.profile.userName });
    modalRef.current.close();
  };

  const handleUserNameChange = val => {
    setUserName({ value: val });
  };

  const selectImage = async () => {
    const options: ImageLibraryOptions = {
      maxWidth: 2000,
      maxHeight: 2000,
    };

    console.log(options);

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        if (!source && !source.uri) {
          toast.show('Nie udało się dodać zdjęcia2', { type: 'danger' });
          return
        }
        const updateUserAvatarResponse = await updateUserAvatar(source.uri)
        if (updateUserAvatarResponse.response) {
          setImage(source.uri);
          toast.show('Pomyślnie zmieniono avatar', { type: 'success' });
        } else {
          setImage(profileStore.profile.avatar ?? null)
          toast.show('Nie udało się dodać zdjęcia', { type: 'danger' });
        }
      }
    });
  };

  const showAchievementModal = () => {
    achievementsStore.showAchievementModal('pages', 4);
  };

  return (
    <Observer>
      {() => (
        <View style={{flexDirection: "row", width: "100%", flexWrap: profileStore?.profile?.userId === 'f3RZyFngfgOpls3hD6DnMNeWfUV2'? 'wrap': 'nowrap' }}>



          <View style={s.avatarContainer}>
            <TouchableOpacity onPress={selectImage}>
              {
                image !== null
                  ? <Image
                    style={s.avatarImage}
                    source={{ uri: image }}
                  />
                  : <Image
                    style={s.avatarImage}
                    source={require("../../assets/images/defaultAvatar.jpg") }
                  />
              }
            </TouchableOpacity>
          </View>

          <View style={s.infoContainer}>
            <Text onPress={() => handleOnEditPress()} style={s.infoText}>
              {profileStore.profile.userName}
            </Text>
            <Text style={s.infoText}>Poziom: {profileStore.userLevel}</Text>
            <View />
            {/*<Text style={s.infoText}>Dni pod rząd: {profileStore.profile.achievements.streak.value}</Text>*/}
          </View>

          {
            profileStore?.profile?.userId === 'f3RZyFngfgOpls3hD6DnMNeWfUV2' &&
            <View style={{width: '100%', height: 200}}>
              <View style={{marginBottom: Spacing.sm}}>
                <Button
                  title={'Show achievement'}
                  onPress={() => showAchievementModal()}
                />
              </View>
              <View style={{marginBottom: Spacing.sm}}>
                <Button
                  title={'unlock'}
                  onPress={() => setIsMockDisabled(false)}
                />
              </View>
              <View style={{marginBottom: Spacing.sm}}>
                <Button
                  disabled={isMockDisabled}
                  title={'createMockBooks'}
                  onPress={() => createMockBooks()}
                />
              </View>
            </View>
          }

          <Modal ref={modalRef}>
            <View>
              <TextInput
                style={{ width: 250 }}
                value={userName.value}
                onChangeText={v => handleUserNameChange(v)}
              />
              <View style={s.buttonsView}>
                <View style={{ marginRight: Spacing.sm }}>
                  <Button title={"Zapisz"} onPress={() => handleOnSave()} />
                </View>
                <Button
                  color={"#607D8B"}
                  title={"Anuluj"}
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
    flexDirection: "row",
    width: "100%",
  },
  avatarContainer: {
    alignSelf: "flex-end",
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: 100,
  },
  avatarImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    paddingHorizontal: Spacing.lg,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: FontSize.h4,
    // textOverflow: "ellipsis",
    width: 190,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Spacing.md,
  },
});
