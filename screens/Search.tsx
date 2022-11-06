import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

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
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const getAverageScore = (totalScore: number, scoreAmount: number) => {
  return parseFloat((totalScore / scoreAmount).toFixed(2));
};

export default function Search({navigation}: RootTabScreenProps<'Search'>) {
  const colorScheme = useColorScheme();

  const [inputSearchQuery, setinputSearchQuery] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [isLoading, setInputSearchQuery] = useState(false);
  const [showSearchHint, setShowSearchHint] = useState(true);

  const handleOnLoadMoreBooks = () => {
    loadAdditional50SearchResults(currentSearchQuery);
  };

  const handleOnBookItemClick = (book: Book) => {
    bookDetailsStore.setIsInBookshelfView(false);
    bookDetailsStore.setBookDetails(book);
    navigation.push('Details');
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const trimmedQuery = inputSearchQuery.trim();
    if (!trimmedQuery) {
      setCurrentSearchQuery('');
      return;
    }
    setCurrentSearchQuery(inputSearchQuery);
    setShowSearchHint(false);
    setInputSearchQuery(true);
    await loadFirst50SearchResults(inputSearchQuery);
    setInputSearchQuery(false);
  };

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
          Wpisz tekst powyżej i wyszukaj co Cię interesuje
        </Text>
      </View>
    ) : !isLoading ? (
      bookListStore.bookList.length > 0 ? (
        <View style={{flex:1}}>
          {bookListStore.bookList?.map((book, i) => (
            <View key={i} style={s.item}>
              <TouchableHighlight onPress={() => handleOnBookItemClick(book)}>
                <BookItem
                  isFromMyBookList={false}
                  title={book.title}
                  booksRead={book.usersFinished}
                  score={getAverageScore(book.totalScore, book.scoreAmount)}
                  number={i + 1}
                />
              </TouchableHighlight>
            </View>
          ))}
          {bookListStore.loadMoreBooks ? (
            <Button
              title={'Pobierz więcej'}
              onPress={() => handleOnLoadMoreBooks()}
            />
          ) : (
            bookListStore.bookList.length >= 50 && (
              <Text style={{textAlign: 'center'}}>
                To już jednak wszystkie wyniki :(
              </Text>
            )
          )}
        </View>
      ) : (
        <Text style={{textAlign: 'center'}}>
          Nie znaleziono żadnych wyników :c
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
        <View style={s.searchView}>
          <TextInput
            style={s.searchInput}
            value={inputSearchQuery}
            onChangeText={setinputSearchQuery}
            onKeyPress={e => handleOnKeyPress(e)}
          />
          <View
            style={[s.searchIcon, {backgroundColor: Colors[colorScheme].tint}]}>
            <TouchableHighlight onPress={() => handleSearch()}>
              <FontAwesomeIcon
                size={FontSize.h3}
                icon={faSearch}
                color={'white'}
              />
            </TouchableHighlight>
          </View>
        </View>
        <BookListView />
      </ScrollView>
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
});
