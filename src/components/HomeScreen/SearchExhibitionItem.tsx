import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import exhibitionImg from '@assets/imgs/ex2.jpeg';

const SearchExhibitionItem = () => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={exhibitionImg} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.exhibitionName}>전시회명</Text>
        <Text style={styles.artistName}>작가명</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  exhibitionName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600', // React Native에서 fontWeight 값은 문자열로 표현해야 합니다.
    marginBottom: 6,
  },
  artistName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400', // 마찬가지로 여기도 문자열로 변경
  },
});

export default SearchExhibitionItem;
