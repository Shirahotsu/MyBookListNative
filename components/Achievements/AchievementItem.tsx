import React from 'react';
import {Text, View} from '../Themed';
import ProgressBar from './ProgressBar';
import {Image, StyleSheet, useColorScheme} from 'react-native';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
// import {FontAwesome5} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface Props {
  image: string;
  level: number;
  title: string;
  description: string;
  maxValue: number;
  currentValue: number;
  type: string;
}

const images = {
  books: {
    1: require('../../assets/achievements/books/books1.png'),
    2: require('../../assets/achievements/books/books2.png'),
    3: require('../../assets/achievements/books/books3.png'),
    4: require('../../assets/achievements/books/books4.png'),
    5: require('../../assets/achievements/books/books5.png'),
    6: require('../../assets/achievements/books/books6.png'),
    7: require('../../assets/achievements/books/books7.png'),
    8: require('../../assets/achievements/books/books8.png'),
    9: require('../../assets/achievements/books/books9.png'),
    10: require('../../assets/achievements/books/books10.png'),
  },
  friends: {
    1: require('../../assets/achievements/friends/friends1.png'),
    2: require('../../assets/achievements/friends/friends2.png'),
    3: require('../../assets/achievements/friends/friends3.png'),
    4: require('../../assets/achievements/friends/friends4.png'),
    5: require('../../assets/achievements/friends/friends5.png'),
  },
  pages: {
    1: require('../../assets/achievements/pages/pages1.png'),
    2: require('../../assets/achievements/pages/pages2.png'),
    3: require('../../assets/achievements/pages/pages3.png'),
    4: require('../../assets/achievements/pages/pages4.png'),
    5: require('../../assets/achievements/pages/pages5.png'),
    6: require('../../assets/achievements/pages/pages6.png'),
    7: require('../../assets/achievements/pages/pages7.png'),
    8: require('../../assets/achievements/pages/pages8.png'),
    9: require('../../assets/achievements/pages/pages9.png'),
    10: require('../../assets/achievements/pages/pages10.png'),
  },
  score: {
    1: require('../../assets/achievements/score/score1.png'),
    2: require('../../assets/achievements/score/score2.png'),
    3: require('../../assets/achievements/score/score3.png'),
    4: require('../../assets/achievements/score/score4.png'),
    5: require('../../assets/achievements/score/score5.png'),
    6: require('../../assets/achievements/score/score6.png'),
    7: require('../../assets/achievements/score/score7.png'),
    8: require('../../assets/achievements/score/score8.png'),
    9: require('../../assets/achievements/score/score9.png'),
    10: require('../../assets/achievements/score/score10.png'),
  },
  streak: {
    1: require('../../assets/achievements/streak/streak1.png'),
    2: require('../../assets/achievements/streak/streak2.png'),
    3: require('../../assets/achievements/streak/streak3.png'),
    4: require('../../assets/achievements/streak/streak4.png'),
    5: require('../../assets/achievements/streak/streak5.png'),
    6: require('../../assets/achievements/streak/streak6.png'),
    7: require('../../assets/achievements/streak/streak7.png'),
    8: require('../../assets/achievements/streak/streak8.png'),
    9: require('../../assets/achievements/streak/streak9.png'),
    10: require('../../assets/achievements/streak/streak10.png'),
  },
};

const AchievementItem = (props: Props) => {
  const colorScheme = useColorScheme();
  return (
    <View style={s.mainContainer}>
      <View style={s.imageContainer}>
        {props.level > 0 ? (
          <Image style={s.image} source={images[props.type][props.level]} />
        ) : (
          <View style={s.iconView}>
            {/*<FontAwesome5*/}
            {/*  size={64}*/}
            {/*  name={'question'}*/}
            {/*  color={Colors[colorScheme].text}*/}
            {/*/>*/}
          </View>
        )}
      </View>
      <View style={s.infoContainer}>
        <View style={s.textContainer}>
          <View style={s.titleContainer}>
            <Text style={s.title}>{props.title}</Text>
            <Text style={s.level}>lv. {props.level}</Text>
          </View>

          <Text style={s.description}>{props.description}</Text>
        </View>
        <View style={s.progressBarContainer}>
          <View style={s.progressBar}>
            <ProgressBar
              maxValue={props.maxValue}
              currentValue={props.currentValue}
            />
          </View>
          <View style={s.progressBarInfo}>
            <Text>{props.currentValue} / </Text>
            <Text>{props.maxValue}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'nowrap',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    height: 100,
  },
  imageContainer: {
    height: 80,
    width: 80,
  },
  iconView: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: Spacing.sm,
    justifyContent: 'space-between',
    height: 80,
  },
  textContainer: {},
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: FontSize.h3,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: Spacing.xs,
  },
  level: {
    fontSize: FontSize.h3,
    fontWeight: 'bold',
  },
  description: {},
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    marginRight: Spacing.xs,
  },
  progressBarInfo: {
    maxWidth: 100,
    minWidth: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default AchievementItem;
