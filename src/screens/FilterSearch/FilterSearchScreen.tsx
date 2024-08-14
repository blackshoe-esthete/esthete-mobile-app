import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import RenderItem from '@components/FilterSearchScreen/RenderItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import searchIcon from '@assets/icons/search.png';
import { useQuery } from '@tanstack/react-query';
import { filterSearch, searchForTag } from 'src/apis/filterService';
import ActivateKeyword from '@components/FilterSearchScreen/ActivateKeyword';
import { useFilterSearchStore, useHomeSearchStore } from '@store/searchStore';
import FilterSearchBar from '@components/FilterSearchScreen/FilterSearchBar';
type Props = NativeStackScreenProps<Routes, 'FilterSearchPage'>;

type ImageItem = {
  filter_id: string;
  filter_name: string;
  like_count: number;
  is_like: boolean;
  filter_thumbnail_url: string;
  user_id: string;
  nickname: string;
  profile_img_url: string;
};

function FilterSearchScreen({navigation, route}: Props): React.JSX.Element {
  const {top} = useSafeAreaInsets();
  const [tagId, setTagId] = useState<string>('');
  const { keyword } = useFilterSearchStore();
  const deferredKeyword = useDeferredValue(keyword);

  const handleTagChange = useCallback((newTagId: string) => {
    setTagId(newTagId);
  }, []);

  const tagFilterDataQuery = useQuery({
    queryKey: ['tag-filter', {tagId, deferredKeyword}],
    queryFn: () => searchForTag({tagId, keyword}),
    enabled: !!(deferredKeyword || tagId),
    staleTime: 5 * 60 * 1000,
  });

  //필터 검색 전체 데이터
  const filterDataQuery = useQuery({
    queryKey: ['filter-searched'],
    queryFn: filterSearch,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = tagFilterDataQuery.isLoading || filterDataQuery.isLoading;
  const isError = tagFilterDataQuery.isError || filterDataQuery.isError;
  const tagFilterData = tagFilterDataQuery.data;
  const filterData = filterDataQuery.data;

  const data = useMemo(() => {
    return (tagId || deferredKeyword) ? tagFilterData : filterData;
  }, [tagId, deferredKeyword, tagFilterData, filterData]);

  if (isLoading) {
    // 데이터 로딩 중일 때 로딩 인디케이터 표시
    return (
      <SafeAreaView edges={['bottom']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (isError) {
    // 에러 발생 시 에러 메시지 표시
    return (
      <SafeAreaView edges={['bottom']} style={styles.errorContainer}>
        <Text>데이터를 불러오는 중에 문제가 발생했습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* 검색창 */}
        <FilterSearchBar
          iconSource={searchIcon}
          to={'FilterSearchPage'}
          back={true}
          placeHolder={'필터, 작가 검색'}
          label={'filter'}
        />

        {/* 키워드 */}
        <View style={{marginLeft: 20}}>
          <ActivateKeyword marginVertical={30} onValueChange={handleTagChange} />
        </View>

        {/* 필터 */}
        <View style={{display: 'flex'}}>
          <MasonryList
            // data={(tagId|| keyword) ? tagFilterData : filterData}
            data={data}
            keyExtractor={(item: ImageItem) => item.filter_id}
            numColumns={2}
            renderItem={({item, i}) => (
              <RenderItem item={item as ImageItem} index={i} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
  },
  searchBox: {
    paddingLeft: 30,
  },
  icon: {
    width: 8.5,
    height: 20,
    zIndex: 2,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    left: 20,
    width: 20,
    height: 20,
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterSearchScreen;
