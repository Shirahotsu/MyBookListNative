import { Text, View } from "../Themed";
// import {FontAwesome5} from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { StyleSheet, TouchableHighlight } from "react-native";
import Spacing from "../../constants/Spacing";
import { useEffect } from "react";
import { bookListStore } from "../../store/bookList.store";
import { observer } from "mobx-react";
import { faArrowDown, faArrowUp, faBookReader } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";


export default function SortOptions({onLoad}:any) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    bookListStore.setInitialSortOptionState();
  }, []);

  const handleOnSortByChange = async (sortBy: string) => {
    await bookListStore.setSortBy(sortBy);
    onLoad(true);
    onLoad(false);
  };

  const handleOnDirectionChange = async () => {
    await bookListStore.toggleSortDirection();
    onLoad(true);
    onLoad(false);
  };

  const ButtonGroup = observer(() => {
    return (
      <>
        <TouchableHighlight onPress={() => handleOnSortByChange('averageScore')}>
          <View
            style={[
              s.sortByButton,
              {
                backgroundColor:
                  bookListStore.sortOption.sortBy === 'averageScore'
                    ? Colors[colorScheme].tint
                    : 'white',
                borderColor:
                  bookListStore.sortOption.sortBy === 'averageScore'
                    ? Colors[colorScheme].tint
                    : Colors.dark.background,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
              },
            ]}>
            <FontAwesomeIcon
              size={FontSize.h3}
              icon={faStar}
              color={
                bookListStore.sortOption.sortBy === 'totalScore'
                  ? 'white'
                  : '#222222'
              }
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleOnSortByChange('usersFinished')}>
          <View
            style={[
              s.sortByButton,
              {
                backgroundColor:
                  bookListStore.sortOption.sortBy === 'usersFinished'
                    ? Colors[colorScheme].tint
                    : 'white',
                borderColor:
                  bookListStore.sortOption.sortBy === 'usersFinished'
                    ? Colors[colorScheme].tint
                    : Colors.dark.background,
                borderBottomRightRadius: 8,
                borderTopRightRadius: 8,
              },
            ]}>
            <FontAwesomeIcon
              size={FontSize.h3}
              icon={faBookReader}
              color={
                bookListStore.sortOption.sortBy === 'usersFinished'
                  ? 'white'
                  : '#222222'
              }
            />
          </View>
        </TouchableHighlight>
      </>
    );
  });

  const SortDirectionIcon = observer(() => {
    return (
      <View style={s.sortDirectionIcon}>
        <TouchableHighlight onPress={() => handleOnDirectionChange()}>
          <FontAwesomeIcon
            size={FontSize.h3}
            icon={
              bookListStore.sortOption.direction === 'asc'
                ? faArrowUp
                : faArrowDown
            }
            color={Colors[colorScheme].text}
          />
        </TouchableHighlight>
      </View>
    );
  });

  return (
    <View style={s.filtersContainer}>
      <Text style={{marginRight: Spacing.sm}}>Sortuj po:</Text>
      <ButtonGroup />
      <SortDirectionIcon />
    </View>
  );
}

const s = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: Spacing.sm,
  },
  sortByButton: {
    height: 34,
    width: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    // border: 'solid 1px',
  },
  sortDirectionIcon: {
    marginLeft: Spacing.md,
  },
});
