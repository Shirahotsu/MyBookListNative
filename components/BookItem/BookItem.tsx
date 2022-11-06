import {Image, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import {Text, View} from '../Themed';
import Title from './Title';
import Spacing from '../../constants/Spacing';
// import {FontAwesome5} from '@expo/vector-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStar,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import {faBookReader} from "@fortawesome/free-solid-svg-icons";
import useColorScheme from '../../hooks/useColorScheme';
import FontSize from '../../constants/FontSize';
import BookItemProps from '../../models/BookItemProps.model';
import {BookStatus} from '../../models/BookShelf.model';

export default function BookItem(props: BookItemProps) {
  const colorScheme = useColorScheme();
  const bookCover: string = props.bookCover ?? '';
  const isFromMyBookList: boolean = props.isFromMyBookList ?? false;
  const score: number | string = props.score ?? '-';
  const pagesRead: number | string = props.pagesRead ?? '0';
  const maxPages: number | string = props.maxPages ?? '0';

  const getStatusTextFormEnum = (status: BookStatus | undefined | null) => {
    switch (status) {
      case BookStatus.Completed:
        return 'PRZECZYTANO';
      case BookStatus.PlanToRead:
        return 'DO PRZECZYTANIA';
      case BookStatus.Reading:
        return 'W TRAKCIE';
      default:
        return '';
    }
  };

  return (
    <View style={s.bookItemContainer}>
      <View style={s.bookImageContainer}>
        <Image
          style={s.bookImage}
          source={require('../../assets/images/book-img-1.jpg')}
        />
      </View>
      <View style={s.bookInfo}>
        <View>
          {!isFromMyBookList && <Text style={s.bookNr}>#{props.number}</Text>}
          <Title numberOfLines={1}>{props.title}</Title>
          <Text
            numberOfLines={1}
            style={{fontSize: FontSize.small, opacity: 0.8}}>
            {getStatusTextFormEnum(props.status)}
          </Text>
        </View>
        <View>
          <View style={s.bookNumberInfo}>
            <View style={s.bookIcon}>
              <FontAwesomeIcon
                size={FontSize.h4}
                icon={faStar}
                color={Colors[colorScheme].text}
              />
            </View>
            <Title>{score}</Title>
          </View>
          <View style={s.bookNumberInfo}>
            <View style={s.bookIcon}>
              <FontAwesomeIcon
                size={FontSize.h4}
                icon={isFromMyBookList ? faCheckCircle : faBookReader}
                color={Colors[colorScheme].text}
              />
            </View>
            <Title>
              {isFromMyBookList ? `${pagesRead}/${maxPages}` : props.booksRead}
            </Title>
          </View>
        </View>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  bookItemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
  },
  bookImageContainer: {
    flex: 0.3,
    alignSelf: 'flex-end',
    width: '100%',
    height: '100%',
  },
  bookImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  bookInfo: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bookNr: {
    fontSize: FontSize.h1,
    marginBottom: Spacing.xs,
    fontWeight: 'bold',
  },
  bookNumberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookIcon: {
    marginRight: Spacing.xs,
  },
});
