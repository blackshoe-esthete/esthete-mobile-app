import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Slider } from '@miblanchard/react-native-slider';
import photoIcon from '@assets/icons/photo.png';
import TopTab from '@components/FilterCreation/TopTab';
import {
  Sharpen,
  ColorMatrix,
  concatColorMatrices,
  brightness as exposure,
  contrast,
  saturate,
  hueRotate,
  temperature,
  grayscale,
} from 'react-native-image-filter-kit';
import { brightness, filters } from '@utils/filter';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFilterCreationStore } from '@store/filterCreationStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RootStackParamList } from '../../types/navigations';
import { FilterType, FilterValue, TemporaryFilter } from '#types/filterService.type';

function FilterCreationScreen(): React.JSX.Element {
  // route에서 tempFilterId 받아오기
  const route = useRoute();
  const tempFilterRef = useRef(route.params as TemporaryFilter);
  const tempFilter = tempFilterRef.current;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [filterType, setFilterType] = useState<FilterType>('sharpness');
  const {
    selectedImageUri,
    setFilteredImageUri,
    setSelectedImageUri,
    setAdditionalImageUri,
    filterValue,
    setFilterValue,
  } = useFilterCreationStore();
  const [sliderValue, setSliderValue] = useState<FilterValue>(filterValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { top } = useSafeAreaInsets();

  const handleSliderChange = (value: number, type: string) => {
    setSliderValue((prevState) => ({ ...prevState, [type]: value }));
  };

  const onPressBack = () => {
    setFilterValue(filters.reduce((acc, filter) => ({ ...acc, [filter.type]: filter.default }), {}));
    setSelectedImageUri('');
    navigation.goBack();
  };

  const onPressNext = () => {
    if (selectedImageUri) {
      setFilterValue(sliderValue);
      navigation.navigate('FilterCreationDesc', tempFilter);
    } else {
      // 선택된 이미지가 없는 경우 처리할 로직 추가
      Alert.alert('이미지를 선택해주세요.');
    }
  };

  // tempFilter가 있을 경우, filterValue와 selectedImageUri 초기화
  useEffect(() => {
    if (tempFilter) {
      setFilterValue(tempFilter.filter_attributes);
      setSliderValue(tempFilter.filter_attributes);
      setSelectedImageUri(tempFilter.filter_thumbnail);
      tempFilter?.representation_img_list?.representation_img_list?.forEach((uri, index) => {
        setAdditionalImageUri(uri, index);
      });
    }
  }, [tempFilter]);

  // 이미지 변경 시 onExtractImage를 트리거하기 위한 로직
  useEffect(() => {
    const handleImageChange = () => {
      const gap = 0.01;
      // 슬라이더 값을 임시로 변경
      const tempValue = (sliderValue.sharpness as number) + gap;
      setSliderValue((prevState) => ({ ...prevState, sharpness: tempValue }));
      setIsLoading(true);

      // 원래 값으로 복구
      setTimeout(() => {
        setSliderValue((prevState) => ({ ...prevState, sharpness: tempValue - gap }));
        setIsLoading(false);
      }, 500);
    };

    if (selectedImageUri) {
      handleImageChange();
    }
  }, [selectedImageUri]);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <View style={[styles.topInset, { paddingTop: top }]} />

      {/* 로딩 중일 때 보여줄 0.5 투명도의 배경 */}
      {isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      <View style={styles.container}>
        <TopTab text={'다음 단계'} to={'FilterCreationDesc'} onPressBack={onPressBack} onPressNext={onPressNext} />

        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: selectedImageUri ? '#171717' : '#D9D9D9',
          }}
        >
          {/* 이미지 및 필터 적용 */}
          {selectedImageUri ? (
            <Sharpen
              image={
                <ColorMatrix
                  matrix={concatColorMatrices([
                    exposure(sliderValue.exposure),
                    brightness(sliderValue.brightness),
                    contrast(sliderValue.contrast),
                    saturate(sliderValue.saturation),
                    hueRotate(sliderValue.hue),
                    temperature(sliderValue.temperature),
                    grayscale(sliderValue.gray_scale),
                  ])}
                  style={styles.image}
                  image={<Image source={{ uri: selectedImageUri }} style={styles.image} resizeMode="contain" />}
                />
              }
              style={styles.image}
              amount={sliderValue.sharpness}
              onExtractImage={({ nativeEvent }) => setFilteredImageUri(nativeEvent.uri)}
              extractImageEnabled={true}
            />
          ) : (
            <Text style={{ fontSize: 16, fontWeight: '700' }}>선택한 사진이 보여집니다.</Text>
          )}
        </View>

        {/* 슬라이더 */}
        <View style={styles.sliderContainer}>
          <View>
            <View style={styles.sliderValueWrapper}>
              <Text style={styles.sliderValueText}>{Math.round((sliderValue[filterType] as number) * 100)}</Text>
            </View>
            <Slider
              step={filters.find((f) => f.type === filterType)?.step}
              minimumValue={filters.find((f) => f.type === filterType)?.min}
              maximumValue={filters.find((f) => f.type === filterType)?.max}
              value={sliderValue[filterType]}
              onValueChange={(value) => handleSliderChange(value[0], filterType)}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              containerStyle={styles.slider}
              thumbTintColor="#FFFFFF"
              disabled={!selectedImageUri}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FilterCreationGallery', { type: 'main' })}>
            <Image source={photoIcon} style={styles.photoIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 필터 선택 */}
      <ScrollView contentContainerStyle={styles.filterContainer} horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.type}
            style={[styles.filterWrapper, filter?.marginHorizontal]}
            onPress={() => setFilterType(filter.type)}
          >
            <View style={styles.circle} />
            <Text style={styles.text}>{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FilterCreationScreen;

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  container: { flex: 11, paddingHorizontal: 20 },
  topTab: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backspaceIcon: { width: 20, height: 30 },
  image: {
    width: '100%',
    height: '100%',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 17,
    paddingTop: 35,
    // paddingBottom: 20,
    // backgroundColor: 'yellow',
  },
  sliderValueWrapper: {
    width: 35,
    // alignItems: 'center',
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
    width: Dimensions.get('window').width - 80,
    height: 30,
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 30,
    // flex: 0.8,
    // marginTop: 15,
    // backgroundColor: 'red',
  },
  filterWrapper: { justifyContent: 'center', alignItems: 'center', gap: 15 },
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
  photoIcon: {
    width: 22.857,
    height: 20,
  },
});
