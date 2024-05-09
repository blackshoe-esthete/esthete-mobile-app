import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import photoIcon from '@assets/icons/photo.png';
import circleIcon from '@assets/icons/circle.png';
import exampleImage from '@assets/imgs/ex2.jpeg';
// import exampleImage from '@assets/imgs/ex3.png';
// import exampleImage from '@assets/imgs/thumbnail-gallery-image.png';
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
import {brightness, filters} from '@utils/filter';
import {useNavigation} from '@react-navigation/native';
import {useFilterCreationStore} from '@store/filterCreationStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type RootStackParamList} from '../../types/navigations';

function FilterCreationScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filterType, setFilterType] = useState('sharpen');
  const {selectedImageUri, setFilteredImageUri} = useFilterCreationStore();
  const [sliderValue, setSliderValue] = useState<{[key: string]: number}>({
    sharpen: 0,
    exposure: 1,
    brightness: 0,
    contrast: 1,
    saturate: 1,
    hueRotate: 0,
    temperature: 0,
    grayscale: 0,
  });

  const {top} = useSafeAreaInsets();

  const handleSliderChange = (value: number, type: string) => {
    setSliderValue(prevState => ({...prevState, [type]: value}));
  };

  useEffect(() => {
    const handleImageChange = () => {
      const gap = 0.000001;
      // 슬라이더 값을 임시로 변경
      const tempValue = sliderValue[filterType] + gap;
      setSliderValue(prevState => ({...prevState, [filterType]: tempValue}));

      // 원래 값으로 복구
      setTimeout(() => {
        setSliderValue(prevState => ({...prevState, [filterType]: tempValue - gap}));
      }, 100);
    };

    if (selectedImageUri) {
      handleImageChange();
    }
  }, [selectedImageUri]);

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <View style={[styles.topInset, {paddingTop: top}]} />

      <View style={styles.container}>
        {/* TODO: 선택된 이미지가 없는 경우 넘어갈 수 없도록 설정 */}
        <TopTab text={'다음 단계'} to={'FilterCreationDesc'} />

        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: selectedImageUri ? '#171717' : '#D9D9D9',
          }}>
          {/* 이미지 및 필터 적용 */}
          {selectedImageUri ? (
            <Sharpen
              image={
                <ColorMatrix
                  matrix={concatColorMatrices([
                    exposure(sliderValue.exposure),
                    brightness(sliderValue.brightness),
                    contrast(sliderValue.contrast),
                    saturate(sliderValue.saturate),
                    hueRotate(sliderValue.hueRotate),
                    temperature(sliderValue.temperature),
                    grayscale(sliderValue.grayscale),
                  ])}
                  style={styles.image}
                  image={<Image source={{uri: selectedImageUri}} style={styles.image} resizeMode="contain" />}
                />
              }
              style={styles.image}
              amount={sliderValue.sharpen}
              onExtractImage={({nativeEvent}) => setFilteredImageUri(nativeEvent.uri)}
              extractImageEnabled={true}
            />
          ) : (
            <Text style={{fontSize: 16, fontWeight: '700'}}>선택한 사진이 보여집니다.</Text>
          )}
        </View>

        {/* 슬라이더 */}
        <View style={styles.sliderContainer}>
          <View>
            <View style={styles.sliderValueWrapper}>
              <Text style={styles.sliderValueText}>{Math.floor(sliderValue[filterType] * 100) / 10}</Text>
            </View>
            <Slider
              step={0.1}
              minimumValue={filters.find(f => f.type === filterType)?.min}
              maximumValue={filters.find(f => f.type === filterType)?.max}
              value={sliderValue[filterType]}
              onValueChange={value => handleSliderChange(value, filterType)}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              style={styles.slider}
              thumbImage={circleIcon}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FilterCreationGallery', {type: 'main'})}>
            <Image source={photoIcon} style={styles.photoIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 필터 선택 */}
      <ScrollView contentContainerStyle={styles.filterContainer} horizontal showsHorizontalScrollIndicator={false}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.type}
            style={[styles.filterWrapper, filter?.marginHorizontal]}
            onPress={() => setFilterType(filter.type)}>
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
  container: {flex: 11, paddingHorizontal: 20},
  topTab: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backspaceIcon: {width: 20, height: 30},
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
  photoIcon: {
    width: 22.857,
    height: 20,
  },
});
