import React from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type FilterModalProps = {
  title: string;
  subTitle: string;
  visible: boolean;
  onConfirm?: () => void;
  onClose: () => void;
  button: string[];
};

function CommonModal({ title, subTitle, visible, onConfirm, onClose, button }: FilterModalProps): React.JSX.Element {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.outerContainer}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitleText}>{subTitle}</Text>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={onConfirm}>
              <View style={[styles.buttonBox, { backgroundColor: '#FFD600' }]}>
                <Text style={styles.buttonText}>{button[0]}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <View style={[styles.buttonBox, { backgroundColor: '#E9E9E9' }]}>
                <Text style={styles.buttonText}>{button[1]}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CommonModal;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background
  },
  modalView: {
    minHeight: 200,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    // gap: 4,
    padding: 20,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  titleText: {
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
    width: '100%',
    gap: 10,
    marginTop: 5,
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 150,
    padding: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
