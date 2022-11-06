/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  Button as DefaultButton,
  TextInput as DefaultTextInput,
  ScrollView as DefaultScrollView,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Spacing from '../constants/Spacing';

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeProps & DefaultButton['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function Button(props: ButtonProps) {
  const {lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'tint');

  return <DefaultButton color={color} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const borderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'tint',
  );

  return (
    <DefaultTextInput
      style={[
        {
          color,
          padding: Spacing.sm,
          borderWidth: 1,
          borderColor,
          borderStyle: 'solid',
          borderRadius: 4,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function ScrollView(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return (
    <DefaultScrollView style={[{backgroundColor}, style]} {...otherProps} />
  );
}
