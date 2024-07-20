import {FlatList, Image, ImageProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FilterItem from '@components/MyGalleryScreen/FilterItem';
import TempoItem from '@components/MyMenuScreen/TempoItem';
import {getTemporaryFilterList} from 'src/apis/filterService';
import {filterServiceToken} from '@utils/dummy';
import {useQuery} from '@tanstack/react-query';
import {TemporaryFilter} from '@types/filterService.type';

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps;
};

function MyFilter(data: any): React.JSX.Element {
  const {data: temporaryFilters} = useQuery({
    queryKey: ['temporaryFilters'],
    queryFn: () => getTemporaryFilterList(filterServiceToken),
  });

  // console.log('임시저장된 필터들: ', temporaryFilters);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={temporaryFilters}
        keyExtractor={item => item.temporary_filter_id}
        renderItem={({item}: {item: TemporaryFilter}) => {
          if (data.temporary) {
            return <TempoItem {...item} label="filter" />;
          } else {
            return <FilterItem {...item} />;
          }
        }}
      />
    </SafeAreaView>
  );
}

export default MyFilter;
