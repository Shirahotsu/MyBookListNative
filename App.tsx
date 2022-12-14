/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import Navigation from './navigation';
import useColorScheme from './hooks/useColorScheme';
import Colors from "./constants/Colors";
const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ToastProvider placement={'top'}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </ToastProvider>
    </SafeAreaView>
  );
};

export default App;
