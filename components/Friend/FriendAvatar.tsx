import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { getUserAvatar } from "../../firebase/profile.firebase";

const FriendAvatar = ({ avatar }: any) => {
  useEffect(() => {
    loadAvatar();
  }, []);

  const [image, setImage] = useState(null);

  const loadAvatar = async () => {
    const avatarImg: string | null = avatar;
    if (avatarImg) {
      const avatar = await getUserAvatar(avatarImg);
      setImage(avatar);
    } else {
      setImage(null);
    }
  };

  return (
    image !== null
      ? <Image
        style={s.avatarImage}
        source={{ uri: image }}
      />
      : <Image
        style={s.avatarImage}
        source={require("../../assets/images/defaultAvatar.jpg")}
      />
  );
};

const s = StyleSheet.create({
  avatarImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});

export default FriendAvatar;
