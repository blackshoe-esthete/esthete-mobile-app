import SearchAuthorItem from '@components/HomeScreen/SearchAuthorItem';
import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

function AuthorSearchScreen(): React.JSX.Element {
  // 임시 데이터 생성. 실제 애플리케이션에서는 이 데이터를 API 호출 등을 통해 가져올 수 있습니다.
  const data = new Array(10)
    .fill(null)
    .map((_, index) => ({id: index.toString()}));

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <SearchAuthorItem />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
  },
});

export default AuthorSearchScreen;
