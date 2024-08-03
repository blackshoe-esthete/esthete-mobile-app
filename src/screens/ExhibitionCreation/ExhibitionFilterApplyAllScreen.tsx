import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Image, Text, View, Alert, ScrollView} from 'react-native';
import {
  useExhibitionCreationStore,
  useFilterDetailsStore,
  FilterAttributes,
  ImageFilterSettings,
} from '../../store/exhibitionCreationStore';
import {Slider} from '@miblanchard/react-native-slider';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import FilterTab from '@components/ExhibitionCreation/FilterTab';
import {
  Sharpen,
  ColorMatrix,
  concatColorMatrices,
  hueRotate,
  saturate,
  brightness,
  contrast,
  temperature,
  grayscale,
} from 'react-native-image-filter-kit';
import {filterServiceToken} from 'src/utils/dummy';
import {getFilterDetails} from 'src/apis/exhibitionCreate';

const SCREEN_WIDTH = Dimensions.get('window').width;

// 최소 및 최대 밝기 값 설정
const MIN_BRIGHTNESS = 0.2; // 최소 밝기 임계값

const ExhibitionFilterApplyAllScreen = () => {
  const navigation = useNavigation();
  const {
    setSelectedFilterId,
    setSelectedFilterAttributes,
    selectedFilterAttributes,
    setCurrentFilterAttributes,
    currentFilterAttributes,
  } = useFilterDetailsStore();
  const {
    selectedImageUri,
    additionalImageUri,
    sliderValues,
    setSliderValueForAll,
    setCurrentFilterIdForAll,
    imageFilterSettings,
    setImageFilterSettingsForAll, // 모든 이미지에 필터 및 슬라이더 설정 적용
  } = useExhibitionCreationStore();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  useEffect(() => {
    setSelectedFilterId('0');
    setSliderValueForAll(100);
  }, []);

  // 슬라이더 값 변경
  const handleSliderChange = (value: number) => {
    setSliderValueForAll(value);
    if (selectedFilterAttributes) {
      // 슬라이더 값에 따라 필터 속성 조정
      applyAdjustedAttributes(value);
    }
    // 모든 이미지에 필터 및 슬라이더 값 저장
    const currentFilterId = selectedFilter;
    const currentSliderValue = sliderValues[0] || 100; // Use the first value or default to 50
    const settings: ImageFilterSettings = {
      filterId: currentFilterId,
      filterAttributes: currentFilterAttributes,
      sliderValue: currentSliderValue,
    };
    setImageFilterSettingsForAll(settings);
  };

  // 다음 버튼 클릭
  const onPressNext = () => {
    if (!selectedImageUri && additionalImageUri.length === 0) {
      Alert.alert('이미지를 선택해주세요');
      return;
    }

    navigation.navigate('ExhibitionFilterApplyComplete');
  };

  const applyFilterAttributes = async (id: string) => {
    try {
      const filterDetails = await getFilterDetails(id, filterServiceToken);
      setSelectedFilterAttributes(filterDetails.payload.filter_attributes);
      setCurrentFilterAttributes(filterDetails.payload.filter_attributes);
    } catch (error) {
      if (id !== '0') {
        console.error('Failed to fetch filter details:', error);
      }
    }
  };

  const onPressFilter = async (id: string) => {
    setSelectedFilter(id);
    setCurrentFilterIdForAll(id);
    setSelectedFilterId(id);
    setSliderValueForAll(100);
    applyFilterAttributes(id); // Fetch and apply filter details

    const currentFilterId = selectedFilter;
    const currentSliderValue = 100;
    const settings: ImageFilterSettings = {
      filterId: currentFilterId,
      filterAttributes: currentFilterAttributes,
      sliderValue: currentSliderValue,
    };
    setImageFilterSettingsForAll(settings);
  };

  const applyAdjustedAttributes = (scale: number) => {
    if (selectedFilterAttributes) {
      const scaleFactor = scale / 100; // 슬라이더 값에 따라 필터 강도 조절

      const adjustedAttributes: FilterAttributes = {
        brightness: adjustAttribute(selectedFilterAttributes.brightness, scaleFactor, MIN_BRIGHTNESS),
        sharpness: adjustAttribute(selectedFilterAttributes.sharpness, scaleFactor),
        exposure: adjustAttribute(selectedFilterAttributes.exposure, scaleFactor),
        contrast: adjustAttribute(selectedFilterAttributes.contrast, scaleFactor),
        saturation: adjustAttribute(selectedFilterAttributes.saturation, scaleFactor),
        hue: adjustAttribute(selectedFilterAttributes.hue, scaleFactor),
        temperature: adjustAttribute(selectedFilterAttributes.temperature, scaleFactor),
        grayScale: adjustAttribute(selectedFilterAttributes.grayScale, scaleFactor, true),
      };

      setCurrentFilterAttributes(adjustedAttributes);
    }
  };

  const adjustAttribute = (
    value: number | undefined,
    scaleFactor: number,
    isInverse: boolean = false,
  ): number | undefined => {
    if (value === undefined) return undefined;

    if (isInverse) {
      return Math.max(0, value * (1 - scaleFactor));
    } else {
      return Math.max(0, value * scaleFactor);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
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
            height={(SCREEN_WIDTH - 40) * 0.9}
            data={
              additionalImageUri.length > 0
                ? additionalImageUri.map(image => image.uri)
                : [selectedImageUri].filter(Boolean)
            }
            scrollAnimationDuration={1000}
            onSnapToItem={index => setCurrentImageIndex(index)}
            renderItem={({item, index}) => {
              const currentFilter = imageFilterSettings[index]?.filterAttributes || {};
              const sliderValue = sliderValues[index];
              console.log(sliderValue);
              return (
                <TouchableOpacity onPress={() => navigation.navigate('ExhibitionFilterApply', {index})}>
                  {sliderValue === 0 ? (
                    <Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />
                  ) : (
                    <Sharpen
                      image={
                        <ColorMatrix
                          matrix={concatColorMatrices([
                            brightness(currentFilter.brightness),
                            contrast(currentFilter.contrast),
                            saturate(currentFilter.saturation),
                            hueRotate(currentFilter.hue),
                            temperature(currentFilter.temperature),
                            grayscale(currentFilter.grayScale),
                          ])}
                          image={<Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />}
                        />
                      }
                      amount={currentFilter.sharpness}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* 슬라이더 */}
        <View style={styles.sliderContainer}>
          <View>
            <View style={styles.sliderValueWrapper}>
              <Text style={styles.sliderValueText}>{Math.round(sliderValues[currentImageIndex] || 50)}</Text>
            </View>
            <Slider
              value={sliderValues[currentImageIndex] || 50}
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

        <View>
          <Text
            style={{
              color: '#D6D6D6',
              textAlign: 'center',
              fontSize: 12,
              marginTop: 10,
            }}>
            이곳에서 선택한 필터는 모든 사진에 적용됩니다
          </Text>
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
});

export default ExhibitionFilterApplyAllScreen;
