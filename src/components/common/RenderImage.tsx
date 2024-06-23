import React from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import {ImageItem} from '../../types';

const RenderImage = ({item}: {item: string}) => {
  return (
    <View>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 6,
    // 이미지 높이 계산해서 렌더링해야하는데 임시로 Dimensions로 처리
    height: Dimensions.get('window').width / 2,
  },
});

export default RenderImage;
