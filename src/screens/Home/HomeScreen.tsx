import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import KeywordList from '@components/HomeScreen/KeywordList';
import ExhibitionList from '@components/HomeScreen/ExhibitionList';
import SearchBar from '@components/common/SearchBar';

function HomeScreen(): React.JSX.Element {
  // StatusBar의 색과 호환하기 위함
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* 검색창 */}
        <SearchBar />
        {/* 키워드 */}
        <KeywordList />
        {/* 전시 목록 */}
        <ExhibitionList />
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
});

export default HomeScreen;
