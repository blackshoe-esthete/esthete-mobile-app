import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {ImageItem} from '../../types';

const RenderImage = ({item}: {item: ImageItem; index: number}) => {
  return (
    <View>
      <Image source={item.source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 6,
  },
});

export default RenderImage;
