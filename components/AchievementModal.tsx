import React from "react";
import { Button, Text, View } from "./Themed";
import { Image, StyleSheet } from "react-native";
import { achievementsStore } from "../store/achievements.store";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { AchievementType } from "../models/Achievement.model";

const AchievementModal = () => {

  const achievementImage = {
    books: {
      1: require("../assets/achievements/books/books1.png"),
      2: require("../assets/achievements/books/books2.png"),
      3: require("../assets/achievements/books/books3.png"),
      4: require("../assets/achievements/books/books4.png"),
      5: require("../assets/achievements/books/books5.png"),
      6: require("../assets/achievements/books/books6.png"),
      7: require("../assets/achievements/books/books7.png"),
      8: require("../assets/achievements/books/books8.png"),
      9: require("../assets/achievements/books/books9.png"),
      10: require("../assets/achievements/books/books10.png"),
    },
    friends: {
      1: require("../assets/achievements/friends/friends1.png"),
      2: require("../assets/achievements/friends/friends2.png"),
      3: require("../assets/achievements/friends/friends3.png"),
      4: require("../assets/achievements/friends/friends4.png"),
      5: require("../assets/achievements/friends/friends5.png"),
    },
    pages: {
      1: require("../assets/achievements/pages/pages1.png"),
      2: require("../assets/achievements/pages/pages2.png"),
      3: require("../assets/achievements/pages/pages3.png"),
      4: require("../assets/achievements/pages/pages4.png"),
      5: require("../assets/achievements/pages/pages5.png"),
      6: require("../assets/achievements/pages/pages6.png"),
      7: require("../assets/achievements/pages/pages7.png"),
      8: require("../assets/achievements/pages/pages8.png"),
      9: require("../assets/achievements/pages/pages9.png"),
      10: require("../assets/achievements/pages/pages10.png"),
    },
    score: {
      1: require("../assets/achievements/score/score1.png"),
      2: require("../assets/achievements/score/score2.png"),
      3: require("../assets/achievements/score/score3.png"),
      4: require("../assets/achievements/score/score4.png"),
      5: require("../assets/achievements/score/score5.png"),
      6: require("../assets/achievements/score/score6.png"),
      7: require("../assets/achievements/score/score7.png"),
      8: require("../assets/achievements/score/score8.png"),
      9: require("../assets/achievements/score/score9.png"),
      10: require("../assets/achievements/score/score10.png"),
    },
    streak: {
      1: require("../assets/achievements/streak/streak1.png"),
      2: require("../assets/achievements/streak/streak2.png"),
      3: require("../assets/achievements/streak/streak3.png"),
      4: require("../assets/achievements/streak/streak4.png"),
      5: require("../assets/achievements/streak/streak5.png"),
      6: require("../assets/achievements/streak/streak6.png"),
      7: require("../assets/achievements/streak/streak7.png"),
      8: require("../assets/achievements/streak/streak8.png"),
      9: require("../assets/achievements/streak/streak9.png"),
      10: require("../assets/achievements/streak/streak10.png"),
    },
  };

  const closeModal = () => {
    achievementsStore.hideAchievementModal();
  };

  const getAchievementLabel = (type: AchievementType | undefined) => {
    switch (type) {
      case "friends":
        return "KOLESZKA";
      case "books":
        return "KSIĄŻNIK";
      case "score":
        return "KRYTYK";
      case "streak":
        return "SILNA WOLA";
      case "pages":
      default:
        return "STRONNY";
    }
  };

  return (
    <View>
      <View>
        <Text style={s.title}>Gratulacje!</Text>
        <Text style={s.subTitle}>Osiągnąłeś nowy poziom!</Text>
      </View>
      <View style={s.imageContainerWrapper}>
        <View style={s.imageContainer}>
          <Image
            style={s.image}
            source={achievementImage[achievementsStore.newAchievementDialog.type][achievementsStore.newAchievementDialog.level]} />
        </View>
      </View>

      <View style={s.descriptionContainer}>
        <Text style={s.descriptionText}>Osiągnąłeś poziom {achievementsStore.newAchievementDialog.level}</Text>
        <Text style={s.descriptionText}>w
          kategorii {getAchievementLabel(achievementsStore.newAchievementDialog.type)}</Text>
        <Text style={s.descriptionSubText}>Tak trzymaj, a niedługo będziesz mistrzem czytelnictwa :D</Text>
      </View>
      <View>
        <Button title={"SUPER!"} onPress={() => closeModal()} />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  mainContainer: {},
  title: {
    fontSize: FontSize.h1,
    textTransform: "uppercase",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  subTitle: {
    fontSize: FontSize.h2,
    textTransform: "uppercase",
    marginBottom: Spacing.md,
  },
  imageContainerWrapper: {
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: Spacing.md,

  },
  imageContainer: {
    width: 256,
    height: 256,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {
    marginBottom: Spacing.md,
    flexDirection: "column",
  },
  descriptionText: {
    fontSize: FontSize.h5,
    marginBottom: Spacing.sm,
  },
  descriptionSubText: {
    marginBottom: Spacing.sm,
  },
  buttonContainer: {},
});

export default AchievementModal;
