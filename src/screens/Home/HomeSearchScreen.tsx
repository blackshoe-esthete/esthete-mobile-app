import React from 'react';
import SearchBar from '@components/common/SearchBar';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
<<<<<<< HEAD
import {StyleSheet, View} from 'react-native';
import HomeSearchTopTab from '@navigations/HomeSearchTopTab';
import cancelIcon from '@assets/icons/cancel.png';
=======
import {ScrollView, StyleSheet, View} from 'react-native';
import HomeSearchTopTab from '@navigations/HomeSearchTopTab';
>>>>>>> 295449c ([EST-86] Add: 전시회/작가 검색 TopTab)

function SearchScreen(): React.JSX.Element {
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]} />
<<<<<<< HEAD
      <SearchBar iconSource={cancelIcon} to={'Main'} />
      <View style={styles.container}>
        <HomeSearchTopTab />
      </View>
=======
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <SearchBar />
        <HomeSearchTopTab />
      </ScrollView>
>>>>>>> 295449c ([EST-86] Add: 전시회/작가 검색 TopTab)
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#030303',
    paddingHorizontal: 20,
    paddingBottom: 300,
  },
});
