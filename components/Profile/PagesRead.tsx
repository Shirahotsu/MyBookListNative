import {StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import Spacing from '../../constants/Spacing';
// import WeeklyReadPages from '../../components/Profile/Charts/WeeklyReadPages';
// import MonthlyReadPages from './Charts/MonthlyReadPages';
// import AnnualReadPages from './Charts/AnnualReadPages';

export default function PagesRead() {
  return (
    <View style={s.container}>
      {/*<WeeklyReadPages/>*/}
      {/*<MonthlyReadPages />*/}
      {/*<AnnualReadPages />*/}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
});
