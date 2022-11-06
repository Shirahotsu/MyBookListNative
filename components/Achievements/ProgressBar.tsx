import React from 'react';
import {View} from '../Themed';
import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
  maxValue: number;
  currentValue: number;
}

const ProgressBar = (props: Props) => {
  const getCurrentBarWidth = (): number => {
    return (props.currentValue / props.maxValue) * 100;
  };

  return (
    <View style={s.barContainer}>
      <View style={[s.currentBar, {width: getCurrentBarWidth() + '%'}]} />
    </View>
  );
};

const s = StyleSheet.create({
  barContainer: {
    overflow: 'hidden',
    borderRadius: 12,
    height: 20,
    width: '100%',
    backgroundColor: '#424242',
  },
  currentBar: {
    height: 20,
    borderRadius: 12,
    backgroundColor: Colors.dark.tint,
  },
});

export default ProgressBar;
