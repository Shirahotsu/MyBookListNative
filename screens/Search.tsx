import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight, TouchableOpacity,
} from "react-native";

import {Button, Text, TextInput, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import React, {useEffect, useState} from 'react';
import {
  loadAdditional10Books,
  loadAdditional50SearchResults,
  loadFirst50SearchResults,
} from '../firebase/bookList.firebase';
import {observer} from 'mobx-react';
import {bookListStore} from '../store/bookList.store';
import BookItem from '../components/BookItem/BookItem';
import {Book} from '../models/Book.model';
import {bookDetailsStore} from '../store/bookDetails.store';
import Spacing from '../constants/Spacing';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SearchInput from "../components/Search/SearchInput";

const getAverageScore = (totalScore: number, scoreAmount: number) => {
  if(totalScore === 0 || scoreAmount===0) return 0
  return parseFloat((totalScore / scoreAmount).toFixed(2));
};

export default function Search({navigation}: RootTabScreenProps<'Search'>) {
  const colorScheme = useColorScheme();

  // const [inputSearchQuery, setinputSearchQuery] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchHint, setShowSearchHint] = useState(true);

  const handleOnLoadMoreBooks = async () => {
    setIsLoading(true)
    await loadAdditional50SearchResults(currentSearchQuery);
    setIsLoading(false)
  };

  const handleOnBookItemClick = (book: Book) => {
    bookDetailsStore.setIsInBookshelfView(false);
    bookDetailsStore.setBookDetails(book);
    navigation.push('Search-Details');
  };

  const handleSearch = async (inputSearchQuery: string) => {
    const trimmedQuery = inputSearchQuery.trim();
    if (!trimmedQuery) {
      setCurrentSearchQuery('');
      return;
    }
    setCurrentSearchQuery(inputSearchQuery);
    setShowSearchHint(false);
    setIsLoading(true);
    await loadFirst50SearchResults(inputSearchQuery);
    setIsLoading(false);
  };

  const handleOnFabPress = () => {
    navigation.push('AddBook')
  }

  const BookListView = observer(() => {
    return showSearchHint ? (
      <View style={{alignItems: 'center', marginTop: Spacing.xl}}>
        <FontAwesomeIcon
          size={FontSize.h3}
          icon={faArrowUp}
          color={Colors[colorScheme].text}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.h2,
            marginTop: Spacing.sm,
          }}>
          Wpisz tekst powy??ej i wyszukaj co Ci?? interesuje
        </Text>
      </View>
    ) : !isLoading ? (
      bookListStore.bookList.length > 0 ? (
        <View style={{flex:1}}>
          {bookListStore.bookList?.map((book, i) => (
            <View key={i} style={s.item}>
              <TouchableOpacity onPress={() => handleOnBookItemClick(book)}>
                <BookItem
                  isFromMyBookList={false}
                  title={book.title}
                  booksRead={book.usersFinished}
                  score={book.averageScore}
                  number={i + 1}
                  bookCover={book.bookCover}
                />
              </TouchableOpacity>
            </View>
          ))}
          {bookListStore.loadMoreBooks ? (
            <Button
              title={'Pobierz wi??cej'}
              onPress={() => handleOnLoadMoreBooks()}
            />
          ) : (
            bookListStore.bookList.length >= 50 && (
              <Text style={{textAlign: 'center'}}>
                To ju?? jednak wszystkie wyniki :(
              </Text>
            )
          )}
        </View>
      ) : (
        <Text style={{textAlign: 'center'}}>
          Nie znaleziono ??adnych wynik??w :c
        </Text>
      )
    ) : (
      <Text style={{textAlign: 'center'}}>Wyszukiwanie...</Text>
    );
  });

  return (
    <SafeAreaView
      style={[s.container, {backgroundColor: Colors[colorScheme].background}]}>
      <ScrollView style={s.scroll}>
      <SearchInput onSearch={handleSearch}/>
        {/*<View style={s.searchView}>*/}
        {/*  <TextInput*/}
        {/*    style={s.searchInput}*/}
        {/*    value={inputSearchQuery}*/}
        {/*    onChangeText={setinputSearchQuery}*/}
        {/*  />*/}
        {/*  <View*/}
        {/*    style={[s.searchIcon, {backgroundColor: Colors[colorScheme].tint}]}>*/}
        {/*    <TouchableOpacity onPress={() => handleSearch()}>*/}
        {/*      <FontAwesomeIcon*/}
        {/*        size={FontSize.h3}*/}
        {/*        icon={faSearch}*/}
        {/*        color={'white'}*/}
        {/*      />*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <BookListView />
      </ScrollView>
      <View style={s.fab}>
        <TouchableOpacity onPress={()=>handleOnFabPress()}>
          <View style={{borderRadius: 100, width:50,  height: 50, backgroundColor: Colors.dark.tint, alignItems:"center", justifyContent: 'space-around'}}>
            <FontAwesomeIcon icon={faPlus} color={'white'} size={Spacing.xl}/>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: Spacing.sm,
    flex: 1,
  },
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
