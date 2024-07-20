import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Image, Text, View, Alert, ScrollView} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {useExhibitionCreationStore, useFilterDetailsStore} from '../../store/exhibitionCreationStore';
import cancelIcon from '@assets/icons/cancel_black.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import FilterTab from '@components/ExhibitionCreation/FilterTab';
import {getFilterDetails} from 'src/apis/exhibitionCreate';
import {filterServiceToken} from 'src/utils/dummy';
import {
  Sharpen,
  ColorMatrix,
  concatColorMatrices,
  grayscale,
  brightness,
  contrast,
  saturate,
  hueRotate,
  temperature,
} from 'react-native-image-filter-kit';

interface RouteParams {
  index: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExhibitionFilterApplyScreen: React.FC = () => {
  const {
    selectedImageUri,
    additionalImageUri,
    setCurrentGrayScale,
    sliderValue,
    setSliderValue,
    currentFilterId,
    setCurrentFilterId,
  } = useExhibitionCreationStore();
  const {
    selectedFilterId,
    setSelectedFilterId,
    setSelectedFilterAttributes,
    selectedFilterAttributes,
    setCurrentFilterAttributes,
    currentFilterAttributes,
  } = useFilterDetailsStore();
  const navigation = useNavigation();
  const route = useRoute();
  const {index} = route.params as RouteParams;
  const [selectedFilter, setSelectedFilter] = useState<string>(currentFilterId);
  const [temporaryFilterAttributes, setTemporaryFilterAttributes] = useState<FilterAttributes>(currentFilterAttributes);
  const [temporarySliderValue, setTemporarySliderValue] = useState<number>(sliderValue);

  useEffect(() => {
    applyAdjustedAttributes(temporarySliderValue);
  }, [temporarySliderValue]);

  const applyFilterAttributes = async (id: string) => {
    try {
      const filterDetails = await getFilterDetails(id, filterServiceToken);
      setSelectedFilterAttributes(filterDetails.payload.filter_attributes);
      setTemporaryFilterAttributes(filterDetails.payload.filter_attributes);
    } catch (error) {
      console.error('Failed to fetch filter details:', error);
    }
  };

  // 슬라이더 값 변경
  const handleSliderChange = (value: number) => {
    setTemporarySliderValue(value);
    setCurrentGrayScale(value, index);
  };

  const applyAdjustedAttributes = (scale: number) => {
    if (selectedFilterAttributes) {
      const adjustedAttributes = {
        brightness: (selectedFilterAttributes.brightness || 0) * scale,
        contrast: (selectedFilterAttributes.contrast || 0) * scale,
        saturation: (selectedFilterAttributes.saturation || 0) * scale,
        hue: (selectedFilterAttributes.hue || 0) * scale,
        temperature: (selectedFilterAttributes.temperature || 0) * scale,
        grayScale: scale < 0.5 ? scale * 2 : 1,
        sharpness: (selectedFilterAttributes.sharpness || 0) * scale,
      };

      setTemporaryFilterAttributes(adjustedAttributes);
    }
  };

  const onPressNext = () => {
    if (!selectedImageUri && additionalImageUri.length === 0) {
      Alert.alert('이미지를 선택해주세요');
      return;
    }
    setCurrentFilterAttributes(temporaryFilterAttributes); // 최종 필터 속성 저장
    setSliderValue(temporarySliderValue); // 최종 슬라이더 값 저장
    navigation.goBack();
  };

  const onPressFilter = async (id: string) => {
    setSelectedFilter(id);
    setCurrentFilterId(id);
    setSelectedFilterId(id);
    applyFilterAttributes(id);
    setTemporarySliderValue(50);
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
              <Sharpen
                image={
                  <ColorMatrix
                    matrix={concatColorMatrices([
                      brightness(temporaryFilterAttributes.brightness),
                      contrast(temporaryFilterAttributes.contrast),
                      saturate(temporaryFilterAttributes.saturation),
                      hueRotate(temporaryFilterAttributes.hue),
                      temperature(temporaryFilterAttributes.temperature),
                      grayscale(temporaryFilterAttributes.grayScale),
                    ])}
                    image={<Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />}
                  />
                }
                amount={temporaryFilterAttributes.sharpness}
              />
            )}
          />
        </View>

        {/* 슬라이더 */}
        <View style={styles.sliderContainer}>
          <View>
            <View style={styles.sliderValueWrapper}>
              <Text style={styles.sliderValueText}>{Math.round(temporarySliderValue)}</Text>
            </View>
            <Slider
              value={temporarySliderValue}
              onValueChange={value => handleSliderChange(value[0])}
              minimumValue={0}
              maximumValue={100} // 슬라이더의 최대값을 100으로 설정
              step={1}
              thumbTintColor="#FFFFFF"
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              containerStyle={styles.slider}
            />
          </View>
        </View>

        {/* 필터 선택 */}
        <FilterTab onPressFilter={onPressFilter} selectedFilter={selectedFilter} />

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
    paddingTop: (SCREEN_WIDTH - 40) * 0.2,
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
