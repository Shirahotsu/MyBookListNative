import {StyleSheet, Text, View, ViewProps} from 'react-native';

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
interface BadgeProps extends ViewProps {
  value: string;
}
export default function BadgeThemed(props: BadgeProps) {
  return (
    <View {...props} style={[s.badge, props.style]}>
      <Text>{props.value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    backgroundColor: `${Colors.dark.tint}`,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    color: Colors.dark.text,
    borderRadius: 12,
  },
});
