import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import MasonryList from 'reanimated-masonry-list';
import RenderImage from '../common/RenderImage';
import ImageModal from '@components/common/ImageModal';
import {useNavigation} from '@react-navigation/native';
import {ExhibitionData, Photo} from '@types/mainExhibitionService.type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import {useExhibitionDetails} from '@hooks/useExhibitionDetails';

interface ExhibitionPictureListProps {
  isVisited: boolean;
  id: string;
}

const ExhibitionPictureList: React.FC<ExhibitionPictureListProps> = ({isVisited, id}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<{url: string; id: string} | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const exhibitionQuery = useExhibitionDetails(id);
  const {data, isLoading, error} = exhibitionQuery;

  const openModal = (item: Photo) => {
    if (isVisited) {
      setCurrentImage({url: item.photo_url, id: item.photo_id});
      setModalVisible(true);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (error || !data?.photos || data.photos.length === 0) {
    return (
      <View style={styles.noPhotosContainer}>
        <Text style={styles.noPhotosText}>No Photos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data?.photos && data.photos.length > 0 && (
        <MasonryList
          data={data.photos}
          keyExtractor={item => item.photo_id}
          numColumns={2}
          contentContainerStyle={{paddingBottom: 60}}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => openModal(item as Photo)}>
              <RenderImage item={(item as Photo).photo_url} />
            </TouchableOpacity>
          )}
        />
      )}
      <ImageModal
        visible={modalVisible}
        image={currentImage?.url}
        photoId={currentImage?.id}
        onClose={() => setModalVisible(false)}
        onReport={() => {
          setModalVisible(false);
          navigation.navigate('ExhibitionReport', {reportType: '사진', photoId: currentImage?.id});
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030303',
  },
  noPhotosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030303',
    paddingVertical: 140,
  },
  noPhotosText: {
    color: 'white',
    fontSize: 17,
  },
});

export default ExhibitionPictureList;
