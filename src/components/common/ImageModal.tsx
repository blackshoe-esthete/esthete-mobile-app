import React from 'react';
import {Modal, View, Image, TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native';

interface ImageModalProps {
  visible: boolean;
  image: string | undefined;
  photoId: string | undefined;
  onClose: () => void;
  onReport: () => void;
}

const ImageModal = ({visible, image, onClose, onReport}: ImageModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.outerContainer}>
        <View style={styles.modalView}>
          {image ? <Image source={{uri: image}} style={styles.image} /> : null}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.submitButton} onPress={onReport}>
              <Text style={styles.submitButtonText}>신고하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.submitButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background
  },
  modalView: {
    width: width * 0.95,
    height: height * 0.65,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
  image: {
    width: '100%',
    height: '87%',
    resizeMode: 'contain',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#FFD600',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: '49%',
    height: 50,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: '49%',
    height: 50,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ImageModal;
