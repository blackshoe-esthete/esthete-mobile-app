import { FlatList, Image, ImageProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterItem from '@components/MyGalleryScreen/FilterItem';
import TempoItem from '@components/MyMenuScreen/TempoItem';
import { TemporaryFilter } from '#types/filterService.type';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '@screens/Routes';
import { RouteProp } from '@react-navigation/native';

// 구매한 필터, 내가 만든 필터, 내가 좋아요한 필터
type filterProp = {
  filter_id: string;
  filter_name: string;
  filter_thumbnail_url: string;
};
// 임시저장한 필터
type tempoProp = TemporaryFilter;
type DataType<T extends keyof Routes> = {
  temporary?: boolean;
  props: (filterProp | tempoProp)[];
  navigation: NativeStackNavigationProp<Routes, T>;
};

function MyFilter<T extends keyof Routes>(data: DataType<T>): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data.props}
        keyExtractor={(item) => {
          return data.temporary ? (item as tempoProp).temporary_filter_id : (item as filterProp).filter_id;
        }}
        renderItem={({ item }) => {
          if (data.temporary) {
            const tempoItem = item as tempoProp;
            return <TempoItem {...tempoItem} label="filter" />;
          } else {
            const filterItem = item as filterProp;
            
            const combinedProps = {...filterItem, navigation: data.navigation};
            return <FilterItem {...combinedProps} />;
          }
        }}
      />
    </SafeAreaView>
  );
}  

export default MyFilter;
