import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Image, Text, View, Alert, ScrollView} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {
  FilterAttributes,
  ImageFilterSettings,
  useExhibitionCreationStore,
  useFilterDetailsStore,
} from '../../store/exhibitionCreationStore';
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

// 최소 및 최대 밝기 값 설정
const MIN_BRIGHTNESS = 0.2; // 최소 밝기 임계값

const ExhibitionFilterApplyScreen: React.FC = () => {
  const {
    selectedImageUri,
    additionalImageUri,
    setCurrentGrayScale,
    sliderValues,
    setSliderValue,
    currentFilterIds,
    setCurrentFilterId,
    setImageFilterSettings,
  } = useExhibitionCreationStore();

  const {setSelectedFilterId, setSelectedFilterAttributes, selectedFilterAttributes, setCurrentFilterAttributes} =
    useFilterDetailsStore();

  const navigation = useNavigation();
  const route = useRoute();
  const {index} = route.params as RouteParams;

  // Use index-based state from the store
  const currentFilterId = currentFilterIds[index] || '0';
  const currentSliderValue = sliderValues[index] || 100;

  const [selectedFilter, setSelectedFilter] = useState<string>(currentFilterId);
  const [temporaryFilterAttributes, setTemporaryFilterAttributes] = useState<FilterAttributes>({});
  const [temporarySliderValue, setTemporarySliderValue] = useState<number>(currentSliderValue);

  useEffect(() => {
    // 올바른 필터 설정 및 슬라이더 값을 가져오기 위한 초기화
    setSelectedFilterId(currentFilterId);
    setTemporarySliderValue(currentSliderValue);
    applyFilterAttributes(currentFilterId); // 필터 속성을 가져와서 적용
  }, []);

  useEffect(() => {
    if (selectedFilterAttributes) {
      applyAdjustedAttributes(temporarySliderValue);
    }
  }, [temporarySliderValue, selectedFilterAttributes]);

  const applyFilterAttributes = async (id: string) => {
    try {
      const filterDetails = await getFilterDetails(id, filterServiceToken);
      setSelectedFilterAttributes(filterDetails.payload.filter_attributes);
      setTemporaryFilterAttributes(filterDetails.payload.filter_attributes);
    } catch (error) {
      if (id !== '0') {
        console.error('Failed to fetch filter details:', error);
      }
    }
  };

  const applyAdjustedAttributes = (scale: number) => {
    if (selectedFilterAttributes) {
      const scaleFactor = scale / 100; // 0-100 범위의 스케일 조정

      const adjustedAttributes: FilterAttributes = {
        brightness: adjustAttribute(selectedFilterAttributes.brightness, scaleFactor, false, true),
        sharpness: adjustAttribute(selectedFilterAttributes.sharpness, scaleFactor),
        exposure: adjustAttribute(selectedFilterAttributes.exposure, scaleFactor),
        contrast: adjustAttribute(selectedFilterAttributes.contrast, scaleFactor),
        saturation: adjustAttribute(selectedFilterAttributes.saturation, scaleFactor),
        hue: adjustAttribute(selectedFilterAttributes.hue, scaleFactor),
        temperature: adjustAttribute(selectedFilterAttributes.temperature, scaleFactor),
        grayScale: adjustAttribute(selectedFilterAttributes.grayScale, scaleFactor, true),
      };

      setTemporaryFilterAttributes(adjustedAttributes); // 임시 필터 속성 업데이트
      setCurrentFilterAttributes(adjustedAttributes); // 현재 필터 속성 업데이트
    }
  };

  const MAX_BRIGHTNESS = 10.0;
  const MIN_BRIGHTNESS = 0.4;

  const adjustAttribute = (
    value: number | undefined,
    scaleFactor: number,
    isInverse: boolean = false,
    isBrightness: boolean = false,
  ): number | undefined => {
    if (value === undefined) return undefined;

    let adjustedValue = isInverse ? Math.max(0, value * (1 - scaleFactor)) : Math.max(0, value * scaleFactor);

    if (isBrightness) {
      // Clamp brightness to be between MIN_BRIGHTNESS and MAX_BRIGHTNESS
      adjustedValue = Math.max(MIN_BRIGHTNESS, Math.min(adjustedValue, MAX_BRIGHTNESS));
    }

    return adjustedValue;
  };

  // 슬라이더 값 변경
  const handleSliderChange = async (value: number) => {
    setTemporarySliderValue(value);

    if (selectedFilterAttributes) {
      applyAdjustedAttributes(value);
      setCurrentFilterAttributes(temporaryFilterAttributes); // 필터 속성 업데이트
    }

    setCurrentGrayScale(value, index);
  };

  const onPressNext = () => {
    if (!selectedImageUri && additionalImageUri.length === 0) {
      Alert.alert('이미지를 선택해주세요');
      return;
    }

    const settings: ImageFilterSettings = {
      filterId: currentFilterId,
      filterAttributes: temporaryFilterAttributes,
      sliderValue: currentSliderValue,
    };

    setImageFilterSettings(settings, index);
    setCurrentFilterAttributes(temporaryFilterAttributes);
    setSliderValue(temporarySliderValue, index);
    setCurrentFilterId(selectedFilter, index);
    navigation.goBack();
  };

  const onPressFilter = async (id: string) => {
    try {
      await setSelectedFilter(id);
      await setSelectedFilterId(id);
      await applyFilterAttributes(id);
      await setTemporarySliderValue(100);
    } catch (error) {
      console.error('Error in onPressFilter:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* Top tab */}
        <View style={styles.topTab}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={cancelIcon} style={styles.cancelIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            width={SCREEN_WIDTH - 40}
            height={(SCREEN_WIDTH - 40) * 0.9}
            data={additionalImageUri.length > 0 ? [additionalImageUri[index].uri] : [selectedImageUri].filter(Boolean)}
            scrollAnimationDuration={1000}
            renderItem={({item}: {item: string}) =>
              temporarySliderValue === 0 ? (
                // 슬라이더 값이 0일 때 원본 이미지 표시
                <Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />
              ) : (
                // 슬라이더 값이 0이 아닐 때 필터 적용
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
              )
            }
          />
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <View>
            <View style={styles.sliderValueWrapper}>
              <Text style={styles.sliderValueText}>{Math.round(temporarySliderValue)}</Text>
            </View>
            <Slider
              value={temporarySliderValue}
              onValueChange={value => handleSliderChange(value[0])}
              minimumValue={0}
              maximumValue={100} // Set slider max value to 100
              step={1}
              thumbTintColor="#FFFFFF"
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              containerStyle={styles.slider}
            />
          </View>
        </View>

        {/* Filter Selection */}
        <FilterTab onPressFilter={onPressFilter} selectedFilter={selectedFilter} />

        {/* Completion */}
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
  carouselContainer: {
    width: SCREEN_WIDTH - 40,
    height: (SCREEN_WIDTH - 40) * 0.75,
    marginHorizontal: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
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
