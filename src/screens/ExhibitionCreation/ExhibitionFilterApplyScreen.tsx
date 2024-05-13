import React, {useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import useExhibitionCreationStore from '../../store/ExhibitionCreationStore';
import {Slider} from '@miblanchard/react-native-slider';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExhibitionFilterApplyScreen = () => {
  const {selectedImageUri, setSelectedImageUri, additionalImageUri, setAdditionalImageUri} =
    useExhibitionCreationStore();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const navigation = useNavigation();

  const handleSliderChange = (value: number) => {
    setSliderValue(prevState => value);
    // console.log(value);
  };
  const onPressNext = () => {
    if (!selectedImageUri && additionalImageUri.length === 0) {
      Alert.alert('이미지를 선택해주세요');
      return;
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* 상단 탭 */}
      <View style={styles.topTab}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: '#FFF'}}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNext}>
          <Text style={{color: '#FFD600'}}>다음</Text>
        </TouchableOpacity>
      </View>

      {/* 이미지 Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop={false}
          width={SCREEN_WIDTH - 40}
          height={(SCREEN_WIDTH - 40) * 0.75}
          data={
            additionalImageUri.length > 0
              ? additionalImageUri.map(image => image.uri)
              : [selectedImageUri].filter(Boolean)
          }
          scrollAnimationDuration={1000}
          onSnapToItem={index => setCurrentImageIndex(index)}
          renderItem={({item}) => <Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />}
        />
      </View>

      {/* 슬라이더 */}
      <View style={styles.sliderContainer}>
        <View>
          <View style={styles.sliderValueWrapper}>
            <Text style={styles.sliderValueText}>{Math.round(sliderValue * 100)}</Text>
          </View>
          <Slider
            value={sliderValue}
            onValueChange={value => handleSliderChange(value[0])}
            thumbTintColor="#FFFFFF"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            containerStyle={styles.slider}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTab: {
    flexDirection: 'row',
    marginTop: 60,
    paddingVertical: 13,
    paddingRight: 19,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextIcon: {width: 20, height: 30, transform: [{scaleX: -1}]},
  cancelIcon: {width: 30, height: 30},
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 17,
    paddingTop: 125,
    paddingHorizontal: 20,
  },
  sliderValueWrapper: {
    width: 35,
    position: 'absolute',
    top: -15,
    left: -10,
  },
  sliderValueText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
  slider: {
    width: Dimensions.get('window').width * 0.9,
    height: 30,
    justifyContent: 'center',
  },
  filterWrapper: {justifyContent: 'center', alignItems: 'center', gap: 15},
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#424242',
  },
  text: {
    color: '#E9E9E9',
    textAlign: 'center',
    fontSize: 14,
  },
  // carousel
  carouselContainer: {
    width: SCREEN_WIDTH - 40,
    height: (SCREEN_WIDTH - 40) * 0.75,
    marginHorizontal: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
});

export default ExhibitionFilterApplyScreen;
