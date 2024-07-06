import {FlatList, ImageProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GalleryItem from '@components/MyGalleryScreen/GalleryItem';
import TempoItem from '@components/MyMenuScreen/TempoItem';

type galleryProp = {
  exhibition_id: string;
  title: string;
  thumbnail_url: string;
  author?: string;
  date?: string;
};

type tempoProp = {
  temporary_exhibition_id: string;
  thumbnail_url: string;
  date: string;
};

type DataType = {
  temporary?: boolean;
  props: (galleryProp | tempoProp)[];
};

function MyCollections(data: DataType): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data.props}
        keyExtractor={item => {
          return data.temporary 
          ? (item as tempoProp).temporary_exhibition_id 
          : (item as galleryProp).exhibition_id;
        }}
        renderItem={({ item }) => {
          if (data.temporary) {
            const tempoItem = item as tempoProp;
            return <TempoItem {...tempoItem} label="collection" />;
          } else {
            const galleryItem = item as galleryProp;
            return <GalleryItem {...galleryItem} />;
          } 
        }}
        contentContainerStyle={{}}
      />
    </SafeAreaView>
  );
}

export default MyCollections;
