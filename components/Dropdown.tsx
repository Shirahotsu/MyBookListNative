import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import {FontAwesome5} from '@expo/vector-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {Text} from './Themed';
import Spacing from '../constants/Spacing';

interface SelectedOption {
  label: string;
  value: any;
}

interface Props {
  label: string;
  data: Array<{label: string; value: any}>;
  selectedOption?: SelectedOption;
  onSelect: (item: {label: string; value: string}) => void;
}

const Dropdown: FC<Props> = ({label, data, onSelect, selectedOption}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
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
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      setDropdownLeft(_px);
      setDropdownWidth(_w);
    });
    setVisible(true);
  };

  const onItemPress = (item): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}): ReactElement<any, any> => (
    <TouchableOpacity style={s.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={s.overlay} onPress={() => setVisible(false)}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
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
                top: dropdownTop,
                left: dropdownLeft,
                width: dropdownWidth,
                backgroundColor: Colors[colorScheme].background,
              },
            ]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[s.button, {backgroundColor: Colors[colorScheme].tint}]}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={s.buttonText}>{(selected && selected.label) || label}</Text>
      <View style={s.icon}>
        <FontAwesomeIcon
          size={FontSize.h4}
          icon={visible ? faChevronUp : faChevronDown}
          color={Colors[colorScheme].text}
        />
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: '100%',
    paddingVertical: Spacing.md,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Dropdown;
