module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        envName: 'APP_ENV',
        path: '.env',
      },
    ],
  ],
};
