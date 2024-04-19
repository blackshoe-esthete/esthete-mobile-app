import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MasonryList from 'reanimated-masonry-list';
import {ImageItem} from '../../types';
import RenderImage from '../common/RenderImage';

const ExhibitionPictureList = () => {
  const data: ImageItem[] = [
    {id: '4', source: require('@assets/images/pic-2.png')},
    {id: '1', source: require('@assets/images/pic-1.png')},
    {id: '3', source: require('@assets/images/pic-3.png')},
    {id: '2', source: require('@assets/images/pic-1.png')},
    {id: '5', source: require('@assets/images/pic-1.png')},
    {id: '6', source: require('@assets/images/pic-2.png')},
    {id: '7', source: require('@assets/images/pic-3.png')},
    {id: '8', source: require('@assets/images/pic-1.png')},
  ];

  return (
    <View style={styles.container}>
      <MasonryList
        data={data}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item, i}) => (
          <RenderImage item={item as ImageItem} index={i} />
        )}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width,
    paddingTop: 6,
    backgroundColor: '#030303',
  },
});
export default ExhibitionPictureList;
