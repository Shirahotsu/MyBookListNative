/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Modal, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import BookDetails from '../screens/BookDetails';
import NotFoundScreen from '../screens/NotFoundScreen';
import MyList from '../screens/MyList';
import Top from '../screens/Top';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import {RootStackParamList, RootTabParamList} from '../types';
// import LinkingConfiguration from './LinkingConfiguration';
import LogIn from '../screens/LogIn';
import SignIn from '../screens/SingIn';
import {Observer, observer} from 'mobx-react';
import {userStore} from '../store/user.store';
import {View} from '../components/Themed';
import FriendScreen from '../screens/Friends.screen';
import FriendProfileScreen from '../screens/FriendProfile.screen';
import ChartsScreen from '../screens/Charts.screen';
import AchievementsScreen from '../screens/Achievements.screen';
import {achievementsStore} from '../store/achievements.store';
import AchievementModal from '../components/AchievementModal';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faHotjar} from "@fortawesome/free-brands-svg-icons";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";
import Spacing from '../constants/Spacing';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const AuthStack = createNativeStackNavigator();

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = observer(() => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={userStore.isLogged ? BottomTabNavigator : AuthStackView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{title: 'Oops!'}}
        />
      </Stack.Navigator>
    </View>
  );
});

function AuthStackView({navigation}: any) {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const TopStack = createNativeStackNavigator();

function TopStackScreen({navigation}: any) {
  return (
    <TopStack.Navigator initialRouteName="Top">
      <TopStack.Screen name="Top" component={Top} />
      <TopStack.Screen name="Details" component={BookDetails} />
    </TopStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();

function SearchStackScreen({navigation}: any) {
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Details" component={BookDetails} />
    </SearchStack.Navigator>
  );
}

const MyBookshelfStack = createNativeStackNavigator();

function MyBookshelfStackScreen({navigation}: any) {
  return (
    <MyBookshelfStack.Navigator initialRouteName="MyBookShelf">
      <MyBookshelfStack.Screen name="MyBookShelf" component={MyList} />
      <MyBookshelfStack.Screen name="Details" component={BookDetails} />
    </MyBookshelfStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen({navigation}: any) {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Friends" component={FriendScreen} />
      <ProfileStack.Screen
        name={'FriendProfile'}
        component={FriendProfileScreen}
      />
      <ProfileStack.Screen name={'Charts'} component={ChartsScreen} />
      <ProfileStack.Screen
        name={'Achievements'}
        component={AchievementsScreen}
      />
    </ProfileStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <>
      <BottomTab.Navigator
        backBehavior="history"
        initialRouteName="Profile"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}>
        <BottomTab.Screen
          name="MyList"
          component={MyBookshelfStackScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon size={30} icon={faBookOpen} color={color} />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="TopStack"
          component={TopStackScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon size={30} icon={faHotjar} color={color} />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="SearchStack"
          component={SearchStackScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon size={30} icon={faSearch} color={color} />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon size={30} icon={faUser} color={color} />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        {/*<BottomTab.Screen*/}
        {/*    name="Settings"*/}
        {/*    component={Settings}*/}
        {/*    options={{*/}
        {/*        tabBarIcon: ({color}) => <TabBarIcon name="cog" color={color}/>,*/}
        {/*        tabBarShowLabel: false*/}
        {/*    }}*/}
        {/*/>*/}
      </BottomTab.Navigator>
      <Observer>
        {() => (
          <View style={s.modalWrapper}>
            <Modal
              transparent={true}
              animationType="slide"
              visible={achievementsStore.newAchievementDialog.isVisible}>
              <View style={s.modalView}><AchievementModal /></View>
            </Modal>
          </View>
        )}
      </Observer>
    </>
  );
}

const s = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 300,
    position: 'absolute',
  },
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: Colors.dark.background,
    borderRadius: 20,
    padding: Spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
