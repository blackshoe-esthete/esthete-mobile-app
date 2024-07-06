import React from 'react';
import filterImg from '@assets/imgs/filter-cover1.png';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface FilterItemProps {
  imageUri: string;
  filterName: string;
}

const FilterItem: React.FC<FilterItemProps> = ({imageUri, filterName}) => {
  const imageSource = filterName === 'Original' ? filterImg : {uri: imageUri};

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{filterName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default FilterItem;
