import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import Spacing from '../constants/Spacing';
import {RootTabScreenProps} from '../types';
import BookItem from '../components/BookItem/BookItem';
import React, {useEffect} from 'react';
import BookItemProps from '../models/BookItemProps.model';
import {loadBooksInMyBookshelf} from '../firebase/bookShelf.firebase';
import {observer} from 'mobx-react';
import {bookDetailsStore} from '../store/bookDetails.store';
import {bookShelfStore} from '../store/bookShelf.store';
import {backgroundColor} from 'react-native-calendars/src/style';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {Book} from '../models/Book.model';
import {loadProfileDetails} from '../firebase/profile.firebase';
import {profileStore} from '../store/profile.store';

export default function MyList({navigation}: RootTabScreenProps<'MyList'>) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const userId = profileStore.profile.userId;
    if (!userId) {
      await loadProfileDetails();
    }
    await loadBooksInMyBookshelf();
  };

  const handleOnBookItemClick = (book: Book) => {
    bookDetailsStore.setIsInBookshelfView(true);
    bookDetailsStore.setBookDetails(book);
    navigation.navigate('Details');
  };

  const BookshelfView = observer(() => {
    return (
      <>
        {bookShelfStore.bookShelf.map((book, i) => (
          <View key={i} style={s.item}>
            <TouchableHighlight onPress={() => handleOnBookItemClick(book)}>
              <BookItem
                isFromMyBookList={true}
                title={book.title}
                pagesRead={book.pagesRead}
                maxPages={book.pages}
                score={book.myScore}
                status={book.status}
                bookCover={book.bookCover}
              />
            </TouchableHighlight>
          </View>
        ))}
      </>
    );
  });

  return (
    <SafeAreaView
      style={[s.container, {backgroundColor: Colors[colorScheme].background}]}>
      <ScrollView style={s.scroll}>
        <BookshelfView />
      </ScrollView>
    </SafeAreaView>
  );
}

const data1: BookItemProps[] = [
  {
    title: 'Super pierwszy tytuł nwm jaki dokladnaie',
    pagesRead: 12,
    maxPages: 120,
    score: 7,
  },
];

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
