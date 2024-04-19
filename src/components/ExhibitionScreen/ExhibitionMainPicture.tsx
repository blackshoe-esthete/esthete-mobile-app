import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';

const ExhibitionMainPicture = ({entered}: {entered: boolean}) => {
  const thumbanilGalleryImage = require('../../assets/images/thumbnail-gallery-image.png');
  let playButton;
  if (entered) {
    playButton = require('../../assets/icons/pause-btn.png');
  } else {
    playButton = require('../../assets/icons/play-btn.png');
  }
  const backIcon = require('../../assets/icons/backspace-icon.png');

  const profileImage = require('../../assets/images/profile.png');
  return (
    <View style={styles.container}>
      <Image source={thumbanilGalleryImage} />
      <View style={styles.overlayContainer}>
        <View style={styles.overlayFlex}>
          <Image source={backIcon} />
          <Image source={playButton} />
        </View>

        <View style={styles.overlayFlex}>
          <View style={styles.overlayExhibitWrap}>
            <Text style={styles.overlayTitle}>전시회명</Text>
            <Text style={styles.overlayDateText}>2023.12.25</Text>
          </View>

          <View style={styles.overlayProfileWrap}>
            <Image source={profileImage} />
            <Text style={styles.overlayProfileText}>작가명</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    width: width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(3, 3, 3, 0.3)',
    justifyContent: 'space-between',
  },
  overlayFlex: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  overlayTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  overlayProfileText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    marginLeft: 10,
  },
  overlayProfileWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayExhibitWrap: {
    display: 'flex',
  },
  overlayDateText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 3,
  },
});

export default ExhibitionMainPicture;
