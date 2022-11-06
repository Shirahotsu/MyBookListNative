import { StyleSheet} from 'react-native';
import FontSize from '../../constants/FontSize'

import {Text, TextProps} from '../Themed';

export default function Title(props: TextProps) {
    return (<Text {...props} style={s.title}/>)
}

const s = StyleSheet.create({
    title:{
        fontSize: FontSize.h4,
        fontVariant: ['small-caps'],
    }
})
