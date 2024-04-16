import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
// import KeywordList from '@components/FilterSearchScreen/KeywordList';
import KeywordList from '@components/FilterSearchScreen/KeywordList';
import ExhibitionList from '@components/HomeScreen/ExhibitionList';
import SearchBar from '@components/common/SearchBar';
import back from '@assets/icons/backspace.png';

function FilterSearchScreen(): React.JSX.Element {
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top,}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* 검색창 */}
        <View>
          {/* <Image source={back}/> */}
          <SearchBar left={30} label="필터, 작가 검색"/>
        </View>
        {/* 키워드 */}
        <KeywordList />
        {/* 전시 목록 */}
        {/* <ExhibitionList /> */}
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
    paddingLeft: 30
  }
});

export default FilterSearchScreen;
