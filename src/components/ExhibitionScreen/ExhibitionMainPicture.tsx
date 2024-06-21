import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

interface ExhibitionMainPictureProps {
  entered: boolean;
  handlePlayPause?: () => void;
  isPlaying: boolean;
  currentExhibitionIndex: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ExhibitionMainPicture: React.FC<ExhibitionMainPictureProps> = ({
  entered,
  handlePlayPause,
  isPlaying,
  currentExhibitionIndex,
}) => {
  const thumbanilGalleryImage = require('../../assets/imgs/thumbnail-gallery-image.png');

  const playButtonImage = require('../../assets/icons/play-btn.png');
  const pauseButtonImage = require('../../assets/icons/pause-btn.png');
  const backIcon = require('../../assets/icons/backspace-icon.png');

  const profileImage = require('../../assets/imgs/profile-img.png');

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={thumbanilGalleryImage}
        style={{
          width: SCREEN_WIDTH,
        }}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.overlayFlex}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
            }}>
            <Image source={backIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <Image source={isPlaying ? pauseButtonImage : playButtonImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.overlayFlex}>
          <View style={styles.overlayExhibitWrap}>
            <Text style={styles.overlayTitle}>{currentExhibitionIndex}</Text>
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
