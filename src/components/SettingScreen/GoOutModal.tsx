import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

type Response = {
  message: string;
}

type FilterModalProps = {
  title: string;
  subTitle: String;
  visible: boolean;
  onClose: () => void;
  button: string[];
  button1?: UseMutationResult<Response, Error, void>
  button2?: () => void;
};

const {width, height} = Dimensions.get('window');

function OutModal({
  title,
  subTitle,
  visible,
  onClose,
  button,
  button1,
  button2
}: FilterModalProps): React.JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.outerContainer}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitleText}>{subTitle}</Text>
          <View style={styles.buttonStyle}>
            <TouchableOpacity>
              <View style={[styles.buttonBox, {backgroundColor: '#FFD600'}]}>
                <Text style={styles.buttonText}>{button[0]}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <View style={[styles.buttonBox, {backgroundColor: '#E9E9E9'}]}>
                <Text style={styles.buttonText}>{button[1]}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default OutModal;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background
  },
  modalView: {
    width: width * 0.95,
    height: height * 0.3,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  titleText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  subTitleText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: '#424242',
  },
  buttonStyle: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    justifyContent: 'space-around',
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 6,
    width: 150,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
