import React, { useState } from "react";
import { TextInput, View } from "../Themed";
import Colors from "../../constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontSize from "../../constants/FontSize";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spacing from "../../constants/Spacing";
import { loadFirst50SearchResults } from "../../firebase/bookList.firebase";
import useColorScheme from "../../hooks/useColorScheme";

const SearchInput = ({ onSearch }: any) => {
  const colorScheme = useColorScheme();

  const [inputSearchQuery, setInputSearchQuery] = useState('');

  const handleSearch = async () => {
    onSearch(inputSearchQuery)
  };

  return (
    <View style={s.searchView}>
      <TextInput
        style={s.searchInput}
        value={inputSearchQuery}
        onChangeText={setInputSearchQuery}
      />
      <View
        style={[s.searchIcon, {backgroundColor: Colors[colorScheme].tint}]}>
        <TouchableOpacity onPress={() => handleSearch()}>
          <FontAwesomeIcon
            size={FontSize.h3}
            icon={faSearch}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  searchView: {
    flexWrap: 'nowrap',
    flex: 1,
    flexDirection: 'row',
    padding: Spacing.xs,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: Spacing.xs,
  },
  fab:{
    position: "absolute",
    bottom: 20,
    right: 20,
  }
});

export default SearchInput;
