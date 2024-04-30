import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import photoIcon from '@assets/icons/photo.png';
import circleIcon from '@assets/icons/circle.png';
import exampleImage from '@assets/imgs/ex2.jpeg';
import TopTab from '@components/FilterCreation/TopTab';

function FilterCreationScreen(): React.JSX.Element {
  const [sliderValue, setSliderValue] = useState(1);
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <View style={styles.container}>
        <TopTab text={'다음 단계'} />
        <Image
          source={exampleImage}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{flex: 1}}>
          <View style={styles.sliderContainer}>
            <View>
              <View
                style={[
                  styles.sliderValueWrapper,
                  {
                    left:
                      sliderValue *
                      ((Dimensions.get('window').width - 100) / 2),
                  },
                ]}>
                <Text style={styles.sliderValueText}>
                  {Math.floor(sliderValue * 100)}
                </Text>
              </View>
              <Slider
                minimumValue={0}
                maximumValue={2}
                value={sliderValue}
                onValueChange={value => setSliderValue(value)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                style={styles.slider}
                thumbImage={circleIcon}
              />
            </View>
            <Image source={photoIcon} style={styles.photoIcon} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.filterContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>선명도</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>노출</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>밝기</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>대비</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>채도</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>ISO</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={[styles.text, {fontSize: 13}]}>하이라이트</Text>
          </View>
          <View style={styles.filterWrapper}>
            <View style={styles.circle} />
            <Text style={styles.text}>그림자</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default FilterCreationScreen;

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  container: {flex: 1, paddingHorizontal: 20},
  topTab: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backspaceIcon: {width: 20, height: 30},
  image: {
    flex: 10,
    alignSelf: 'stretch',
    width: '100%',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 17,
    paddingTop: 30,
    paddingBottom: 20,
  },
  sliderValueWrapper: {
    width: 24,
    alignItems: 'center',
    position: 'absolute',
    top: -15,
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
    marginTop: 15,
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
