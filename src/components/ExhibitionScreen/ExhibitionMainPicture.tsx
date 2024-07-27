import {useExhibitionDetails} from '@hooks/useExhibitionDetails';
import {useNavigation} from '@react-navigation/native';
import {ExhibitionData} from '@types/mainExhibitionService.type';
import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

interface ExhibitionMainPictureProps {
  exhibitionData: ExhibitionData;
  entered: boolean;
  handlePlayPause?: () => void;
  isPlaying: boolean;
  currentExhibitionIndex: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ExhibitionMainPicture: React.FC<ExhibitionMainPictureProps> = ({
  exhibitionData,
  entered,
  handlePlayPause,
  isPlaying,
  currentExhibitionIndex,
}) => {
  const playButtonImage = require('../../assets/icons/play-btn.png');
  const pauseButtonImage = require('../../assets/icons/pause-btn.png');
  const backIcon = require('../../assets/icons/backspace-icon.png');

  const profileImage = require('../../assets/imgs/profile-img.png');

  const navigation = useNavigation();

  const exhibitionQuery = useExhibitionDetails(exhibitionData?.exhibition_id);
  const {data, isLoading} = exhibitionQuery;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={{uri: data?.thumbnail_url}} style={{width: width, height: 431}} resizeMode="cover" />
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
            <Text style={styles.overlayTitle}>{data?.title}</Text>
            <Text style={styles.overlayDateText}>{data?.date}</Text>
          </View>

          <View style={styles.overlayProfileWrap}>
            {data?.author_profile_url ? (
              <Image source={{uri: data?.author_profile_url}} style={styles.profileImage} />
            ) : (
              <Image source={profileImage} style={styles.profileImage} />
            )}
            <Text style={styles.overlayProfileText}>{data?.author_name}</Text>
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
    // textAlign: 'center',
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
  // 프로필 이미지
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D6D6D6',
  },
});

export default ExhibitionMainPicture;
