import Colors from '../../../constants/Colors'
const theme = (theme: 'dark' | 'light') =>  ({
    backgroundColor: Colors[theme].background,
        calendarBackground: Colors[theme].background,
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: Colors[theme].background,
        selectedDayTextColor: Colors[theme].text,
        todayTextColor: Colors[theme].text,
        dayTextColor: Colors[theme].text,
        textDisabledColor: '#d9e1e8',
        dotColor: Colors[theme].background,
        selectedDotColor: Colors[theme].background,
        arrowColor: Colors[theme].tint,
        disabledArrowColor: '#d9e1e8',
        monthTextColor: Colors[theme].text,
        indicatorColor: Colors[theme].text,
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
})

 export {
    theme
 }
