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
  const currentSliderValue = sliderValues[index] || 50;

  const [selectedFilter, setSelectedFilter] = useState<string>(currentFilterId);
  const [temporaryFilterAttributes, setTemporaryFilterAttributes] = useState<FilterAttributes>({});
  const [temporarySliderValue, setTemporarySliderValue] = useState<number>(currentSliderValue);

  useEffect(() => {
    applyAdjustedAttributes(temporarySliderValue);
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

  // Adjust attributes based on slider value
  const applyAdjustedAttributes = (scale: number) => {
    if (selectedFilterAttributes) {
      const scaleFactor = scale / 100; // Adjusting scale based on 0-100

      const adjustedAttributes: FilterAttributes = {
        brightness: adjustAttribute(selectedFilterAttributes.brightness, scaleFactor),
        sharpness: adjustAttribute(selectedFilterAttributes.sharpness, scaleFactor),
        exposure: adjustAttribute(selectedFilterAttributes.exposure, scaleFactor),
        contrast: adjustAttribute(selectedFilterAttributes.contrast, scaleFactor),
        saturation: adjustAttribute(selectedFilterAttributes.saturation, scaleFactor),
        hue: adjustAttribute(selectedFilterAttributes.hue, scaleFactor),
        temperature: adjustAttribute(selectedFilterAttributes.temperature, scaleFactor),
        grayScale: adjustAttribute(selectedFilterAttributes.grayScale, scaleFactor, true),
      };

      setTemporaryFilterAttributes(adjustedAttributes); // Apply to temporary attributes
    }
  };

  const adjustAttribute = (
    value: number | undefined,
    scaleFactor: number,
    isInverse: boolean = false,
  ): number | undefined => {
    if (value === undefined) return undefined;

    if (isInverse) {
      // For grayScale, act inversely
      return Math.max(0, value * (1 - scaleFactor));
    } else {
      return Math.max(0, value * scaleFactor);
    }
  };

  // Handle slider value change
  const handleSliderChange = (value: number) => {
    setTemporarySliderValue(value);
    applyAdjustedAttributes(value);
    setCurrentGrayScale(value, index); // To visually update the grayscale value
  };

  // Save changes on completion
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
    setCurrentFilterAttributes(temporaryFilterAttributes); // Save final filter attributes
    setSliderValue(temporarySliderValue, index); // Save final slider value
    setCurrentFilterId(selectedFilter, index); // Save selected filter ID
    navigation.goBack(); // Go back to previous screen
  };

  // Handle filter selection
  const onPressFilter = async (id: string) => {
    setSelectedFilter(id); // Update selected filter
    setSelectedFilterId(id); // Set in global state
    applyFilterAttributes(id); // Fetch and apply filter details
    setTemporarySliderValue(50); // Reset slider value to default
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
