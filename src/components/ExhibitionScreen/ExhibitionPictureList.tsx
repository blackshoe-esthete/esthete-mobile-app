import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import MasonryList from 'reanimated-masonry-list';
import {ImageItem} from '../../types';
import RenderImage from '../common/RenderImage';
import ImageModal from '@components/common/ImageModal';
import {useNavigation} from '@react-navigation/native';

interface ExhibitionPictureListProps {
  isVisited: boolean;
}

const ExhibitionPictureList: React.FC<ExhibitionPictureListProps> = ({
  isVisited,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageItem | null>(null);

  const navigation = useNavigation();

  const openModal = (item: ImageItem) => {
    if (isVisited) {
      setCurrentImage(item);
      setModalVisible(true);
    }
  };

  const data: ImageItem[] = [
    {id: '4', source: require('src/assets/imgs/pic-2.png')},
    {id: '1', source: require('src/assets/imgs/pic-1.png')},
    {id: '3', source: require('src/assets/imgs/pic-3.png')},
    {id: '2', source: require('src/assets/imgs/pic-1.png')},
    {id: '5', source: require('src/assets/imgs/pic-1.png')},
    {id: '6', source: require('src/assets/imgs/pic-2.png')},
    {id: '7', source: require('src/assets/imgs/pic-3.png')},
    {id: '8', source: require('src/assets/imgs/pic-1.png')},
  ];

  return (
    <View style={styles.container}>
      <MasonryList
        data={data}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item, i}) => (
          <TouchableOpacity onPress={() => openModal(item as ImageItem)}>
            <RenderImage item={item as ImageItem} index={i} />
          </TouchableOpacity>
        )}
      />
      <ImageModal
        visible={modalVisible}
        image={currentImage}
        onClose={() => setModalVisible(false)}
        onReport={() => {
          setModalVisible(false);
          navigation.navigate('ExhibitionReport', {reportType: '사진'});
        }}
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
