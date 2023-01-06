import React, { FC, Fragment, ReactElement, useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight, faCalendar } from "@fortawesome/free-solid-svg-icons";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Spacing from "../constants/Spacing";
import { Calendar } from "react-native-calendars";
import { theme } from "./Profile/Charts/MonthlyCallendarConfig";
import { TextInput } from "./Themed";

interface SelectedOption {
  label: string;
  value: any;
}

interface Props {
  label: string;
  data: Array<{ label: string; value: any }>;
  selectedOption?: SelectedOption;
  onSelect: (item: { label: string; value: string }) => void;
}

const INITIAL_DATE = new Date();

const Datepicker: FC<Props> = ({ label, data, onSelect, selectedOption }) => {
  const DatepickerInput = useRef();
  const [visible, setVisible] = useState(false);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (selectedOption) {
      setSelected(selectedOption);
    }
  }, []);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
    setTimeout(() => {
      visible ?  setVisibleCalendar(false) : setVisibleCalendar(true);
    }, 100);

  };

  const openDropdown = (): void => {
    DatepickerInput.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      setDropdownLeft(_px);
      setDropdownWidth(_w);
    });
    setVisible(true);
  };

  const onDayPress = (item): void => {
    console.log('date', item);
    setSelected(item.dateString);
    onSelect(item.dateString);
    setVisible(false);
    setVisibleCalendar(false);
  };

  const convertDateToDashedDate = (date: Date): string => {
    return date.toISOString().replace(/T.*/, "").split("-").join("-");
  };

  const Arrow = (direction: any) => {
    return (<FontAwesomeIcon size={FontSize.h4} icon={direction.props === "left" ? faArrowLeft : faArrowRight}
                             color={Colors["dark"].tint} />);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={s.overlay} onPress={() => {
          setVisible(false);
          setVisibleCalendar(false);
        }}>
          <View
            style={[
              s.dropdown,
              {
                top: dropdownTop - 35,
                left: dropdownLeft,
                width: dropdownWidth,
                height: 35,
              },
            ]}
          />
          <View
            style={[
              s.dropdown,
              {
                top: dropdownTop-4,
                left: dropdownLeft,
                width: dropdownWidth,
                backgroundColor: Colors[colorScheme].background,
              },
            ]}>
              <Fragment>
                {
                  visibleCalendar &&
                  <Calendar
                    style={{
                      borderStyle: "solid",
                      borderColor: Colors[colorScheme].tint,
                      borderWidth: 1,
                      borderTopWidth: 0,
                      borderRadius: 4,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      shadowColor: '#000000',
                    }}
                    hideExtraDays
                    enableSwipeMonths
                    current={convertDateToDashedDate(INITIAL_DATE)}
                    onDayPress={onDayPress}
                    markingType={"custom"}
                    theme={theme("dark")}
                    renderArrow={direction => <Arrow props={direction} />}
                  />
                }

              </Fragment>

          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DatepickerInput}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <TextInput value={selected} style={{ marginTop: Spacing.md }} placeholder={"Data wydania"} editable={false} />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: "100%",
    height: "100%",
    paddingVertical: Spacing.md,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Datepicker;
