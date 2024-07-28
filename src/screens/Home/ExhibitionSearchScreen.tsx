import React, { useDeferredValue } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import SearchExhibitionItem from '@components/Home/SearchExhibitionItem';
import { useHomeSearchStore } from '@store/searchStore';
import { useQuery } from '@tanstack/react-query';
import { searchExhibition } from 'src/apis/mainExhibitionService';

function ExhibitionSearchScreen(): React.JSX.Element {
  const { keyword } = useHomeSearchStore();
  const deferredKeyword = useDeferredValue(keyword);

  const { data: searchResult } = useQuery({
    queryKey: ['searchExhibition', deferredKeyword],
    queryFn: () => searchExhibition(deferredKeyword),
    select: (data) => data?.content,
    enabled: !!deferredKeyword, // keyword가 존재할 때만 query를 활성화
  });

  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }) => (
        <SearchExhibitionItem
          key={item.exhibition_id}
          id={item.exhibition_id}
          title={item.exhibition_title}
          author={item.photographer_name}
          thumbnail={item.thumbnail_img_url}
        />
      )}
      keyExtractor={(item) => item.exhibition_id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { paddingBottom: '70%' }]}
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>검색 결과가 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 10,
    gap: 20,
    backgroundColor: '#030303',
  },
});

export default ExhibitionSearchScreen;
