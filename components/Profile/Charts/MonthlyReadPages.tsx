import React, {useState, Fragment, useCallback, useMemo, useRef, Props, useEffect} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text, View} from '../../Themed';
import {Calendar} from 'react-native-calendars';
import testIDs from './testIDs';
import {theme} from './MonthlyCallendarConfig'
import FontSize from "../../../constants/FontSize";
import Colors from "../../../constants/Colors";
import {Direction} from "react-native-calendars/src/types";
import {LocaleConfig} from 'react-native-calendars';
import {loadProfileDetails} from "../../../firebase/profile.firebase";
import {profileStore} from "../../../store/profile.store";
import {observer} from "mobx-react";
import {observe, toJS} from "mobx";
import {DailyReadPages} from "../../../models/Profile.model";
import Spacing from "../../../constants/Spacing";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const INITIAL_DATE = new Date();


LocaleConfig.locales['pl'] = {
    monthNames: [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ],
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
    dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    dayNamesShort: ['Ndz', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So',],
    today: "Dziś"
};
LocaleConfig.defaultLocale = 'pl';

const MonthlyReadPages = () => {

    const convertDateToDashedDate = (date): string => {
        return date.toISOString().replace(/T.*/, '').split('-').join('-')
    }

    const [selected, setSelected] = useState(convertDateToDashedDate(INITIAL_DATE));
    const [markedDates, setMarkedDates] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {
        if (!isLoaded) {
            // await loadProfileDetails()

            const dailyReadPages = profileStore.dailyReadPages
            const convertedObject = {}
            dailyReadPages.forEach(item => {
                const key = convertFormSecondsToDashedDate(item.seconds)
                Object.assign(convertedObject, {
                    [key]: {
                        customStyles: {
                            container: {
                                backgroundColor: getMarkedDataColor(item.pages),
                            },
                        },
                        pages: item.pages
                    }
                })
            })
            setMarkedDates({...convertedObject})
            setIsLoaded(true)
        }
    }, []);


    const convertFormSecondsToDashedDate = (seconds: number) => {
        const date = new Date(seconds * 1000);
        return convertDateToDashedDate(date)
    }


    const getMarkedDataColor = (pages: number): string => {
        if (pages >= 100) {
            return '#4CAF50'
        }
        if (pages > 10) {
            return '#FFC107'
        }
        return '#3F51B5'
    }

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const Arrow = (direction: any) => {
        return (<FontAwesomeIcon size={FontSize.h4} icon={direction.props === 'left' ? faArrowLeft : faArrowRight}
                              color={Colors['dark'].tint}/>)
    }

    const SelectedData = () => {
        return (
            <View style={s.selectedDate}>
                <Text style={{fontSize: FontSize.h5, marginRight: Spacing.sm}}>Wybrano: </Text>
                {markedDates[selected] && (
                    <>
                        <Text style={{fontSize: FontSize.h5}}>Data: {selected}</Text>
                        <Text style={{fontSize: FontSize.h5}}>Przeczytane strony: {markedDates[selected].pages}</Text>
                    </>
                )}

            </View>
        )
    }

    const renderCalendarWithCustomMarkingType = () => {
        return (
            <View>
                <Fragment>
                    <Calendar
                        style={s.calendar}
                        hideExtraDays
                        enableSwipeMonths
                        current={convertDateToDashedDate(INITIAL_DATE)}
                        minDate={'2022-03-01'}
                        onDayPress={onDayPress}
                        markingType={'custom'}
                        theme={theme('dark')}
                        renderArrow={direction => <Arrow props={direction}/>}
                        markedDates={markedDates}
                    />
                </Fragment>
                <View>
                    <SelectedData/>
                </View>
            </View>
        );
    };


    const renderExamples = () => {
        return (
            <Fragment>
                {renderCalendarWithCustomMarkingType()}
            </Fragment>
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER}>
            {renderExamples()}
        </ScrollView>
    );
};

export default MonthlyReadPages;

const s = StyleSheet.create({
    calendar: {
        marginBottom: 10
    },
    selectedDate: {
        minHeight: 80,
        marginTop: Spacing.sm,
        marginBottom: Spacing.md,
        marginLeft: Spacing.xs,
    }
});
