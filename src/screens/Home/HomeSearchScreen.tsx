import React from 'react';
import SearchBar from '@components/common/SearchBar';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, View} from 'react-native';
import HomeSearchTopTab from '@navigations/HomeSearchTopTab';
import cancelIcon from '@assets/icons/cancel.png';

function SearchScreen(): React.JSX.Element {
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <SearchBar iconSource={cancelIcon} to={'Main'} />
        <HomeSearchTopTab />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#030303',
  },
});
