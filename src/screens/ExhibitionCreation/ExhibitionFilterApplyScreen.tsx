import React, {useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Image, Text, View, Alert, ScrollView} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import useExhibitionCreationStore from '../../store/ExhibitionCreationStore';
import cancelIcon from '@assets/icons/cancel_black.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import FilterTab from '@components/ExhibitionCreation/FilterTab';

interface RouteParams {
  index: number;
}

interface CarouselImage {
  uri: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExhibitionFilterApplyScreen: React.FC = () => {
  const {selectedImageUri, additionalImageUri} = useExhibitionCreationStore();
  const navigation = useNavigation();
  const route = useRoute();
  const {index} = route.params as RouteParams;
  const [sliderValue, setSliderValue] = useState<number>(0);

  // 슬라이더 값 변경
  const handleSliderChange = (value: number) => {
    setSliderValue(prevState => value);
  };

  const onPressNext = () => {
    if (!selectedImageUri && additionalImageUri.length === 0) {
      Alert.alert('이미지를 선택해주세요');
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* 상단 탭 */}
        <View style={styles.topTab}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={cancelIcon} style={styles.cancelIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* 이미지 Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            width={SCREEN_WIDTH - 40}
            height={(SCREEN_WIDTH - 40) * 0.9}
            data={additionalImageUri.length > 0 ? [additionalImageUri[index].uri] : [selectedImageUri].filter(Boolean)}
            scrollAnimationDuration={1000}
            renderItem={({item}: {item: string}) => (
              <Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />
            )}
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

        {/* 필터 선택 */}
        <FilterTab />

        {/* 완료 */}

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={onPressNext} style={styles.completeButton}>
            <Text style={{textAlign: 'center'}}>완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  // 완료 버튼
  completeButton: {
    width: 80,
    height: 40,
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD600',
    borderRadius: 10,
  },
});

export default ExhibitionFilterApplyScreen;
