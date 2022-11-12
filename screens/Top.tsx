import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {Button, Text, View} from '../components/Themed';
import BookItem from '../components/BookItem/BookItem';
import React, {useEffect} from 'react';
import Spacing from '../constants/Spacing';
import {
  loadFirst10Books,
  loadAdditional10Books,
} from '../firebase/bookList.firebase';
import {bookListStore} from '../store/bookList.store';
import {observer} from 'mobx-react';
import SortOptions from '../components/TopBooks/SortOptions';
import {Book} from '../models/Book.model';
import {bookDetailsStore} from '../store/bookDetails.store';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {getAverageScore} from '../utils/score';

export default function Top({navigation}: any) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadFirst10Books();
  }, []);

  const handleOnLoadMoreBooks = () => {
    loadAdditional10Books();
  };

  const handleOnBookItemClick = (book: Book) => {
    bookDetailsStore.setIsInBookshelfView(false);
    bookDetailsStore.setBookDetails(book);
    navigation.push('Details');
  };

  const BookListView = observer(() => {
    return (
      <>
        {bookListStore.bookList?.map((book, i) => (
          <View key={i} style={s.item}>
            <TouchableHighlight onPress={() => handleOnBookItemClick(book)}>
              <BookItem
                isFromMyBookList={false}
                title={book.title}
                booksRead={book.usersFinished}
                score={book.averageScore}
                number={i + 1}
              />
            </TouchableHighlight>
          </View>
        ))}
        {bookListStore.loadMoreBooks && (
          <Button
            title={'Pobierz więcej'}
            onPress={() => handleOnLoadMoreBooks()}
          />
        )}
      </>
    );
  });

  return (
    <SafeAreaView
      style={[s.container, {backgroundColor: Colors[colorScheme].background}]}>
      <ScrollView style={s.scroll}>
        <SortOptions />
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
  },
});
