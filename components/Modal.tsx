import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal as DefaultModal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import Spacing from '../constants/Spacing';

const Modal = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setModalVisible(true);
    },
    close() {
      setModalVisible(false);
    },
  }));

  const handleOnModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <DefaultModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleOnModalClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {props.children}
            {/*<Pressable*/}
            {/*    style={[styles.button, styles.buttonClose]}*/}
            {/*    onPress={() => setModalVisible(false)}*/}
            {/*>*/}
            {/*    <Text style={styles.textStyle}>Hide Modal</Text>*/}
            {/*</Pressable>*/}
          </View>
        </View>
      </DefaultModal>
    </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: '#222222',
    borderRadius: 8,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Modal;
