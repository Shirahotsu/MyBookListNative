/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: any;
  SignIn: any;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  MyBookShelf: NavigatorScreenParams<MyBookShelf> | undefined;
  TopStack: NavigatorScreenParams<TopStack> | undefined;
  SearchStack: NavigatorScreenParams<SearchStack> | undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type MyBookShelf = {
  MyBookShelf: undefined;
  Details: undefined;
};

export type TopStack = {
  Top: undefined;
  Details: undefined;
};

export type SearchStack = {
  Search: undefined;
  Details: undefined;
};

export type TopStackParamList = {
  TopStack: NavigatorScreenParams<TopStack> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TopStackScreenProps<Screen extends keyof TopStack> =
  CompositeScreenProps<
    BottomTabScreenProps<TopStack, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
