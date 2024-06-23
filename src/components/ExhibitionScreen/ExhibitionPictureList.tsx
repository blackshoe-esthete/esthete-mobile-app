import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Text, Image} from 'react-native';
import MasonryList from 'reanimated-masonry-list';
import RenderImage from '../common/RenderImage';
import ImageModal from '@components/common/ImageModal';
import {useNavigation} from '@react-navigation/native';
import {ExhibitionData, Photo} from '@types/mainExhibitionService.type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';

interface ExhibitionPictureListProps {
  isVisited: boolean;
  exhibitionData: ExhibitionData;
  id: string;
}

const ExhibitionPictureList: React.FC<ExhibitionPictureListProps> = ({isVisited, exhibitionData, id}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (exhibitionData?.photos?.length > 0) {
      setLoading(false); //
    }
  }, [exhibitionData]);

  const openModal = (item: string) => {
    if (isVisited) {
      setCurrentImage(item);
      setModalVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 120}}>
        <Text style={{color: 'white', fontSize: 17}}>No Photos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MasonryList
        data={exhibitionData?.photos}
        keyExtractor={item => item.photo_id}
        numColumns={2}
        // contentContainer height를 임시로 window height로 설정
        contentContainerStyle={{height: Dimensions.get('window').height}}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openModal((item as Photo).photo_url)}>
            <RenderImage item={(item as Photo).photo_url} />
          </TouchableOpacity>
        )}
      />
      <ImageModal
        visible={modalVisible}
        image={currentImage}
        onClose={() => setModalVisible(false)}
        onReport={() => {
          setModalVisible(false);
          navigation.navigate('ExhibitionReport', {id});
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
});

export default ExhibitionPictureList;
