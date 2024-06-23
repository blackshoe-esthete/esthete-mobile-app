import SearchAuthorItem from '@components/Home/SearchAuthorItem';
import {useHomeSearchStore} from '@store/searchStore';
import {useQuery} from '@tanstack/react-query';
import React, {useDeferredValue} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {searchAuthor} from 'src/apis/mainExhibitionService';

function AuthorSearchScreen(): React.JSX.Element {
  const {keyword} = useHomeSearchStore();
  const deferredKeyword = useDeferredValue(keyword);

  const {data: searchResult} = useQuery({
    queryKey: ['searchAuthor', deferredKeyword],
    queryFn: () => searchAuthor(deferredKeyword),
    select: data => data?.content,
    enabled: !!deferredKeyword,
  });

  return (
    <FlatList
      data={searchResult}
      renderItem={({item}) => (
        <SearchAuthorItem
          author={item.photographer_name}
          introduction={item.photographer_introduction}
          profile={item.profile_img_url}
        />
      )}
      keyExtractor={item => item.photographer_id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, {paddingBottom: '70%'}]}
      ListEmptyComponent={
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100}}>
          <Text style={{color: '#fff', fontSize: 16}}>검색 결과가 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
  },
});

export default AuthorSearchScreen;
