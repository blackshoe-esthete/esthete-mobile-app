import React from 'react';
import SearchBar from '@components/common/SearchBar';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import HomeSearchTopTab from '@navigations/HomeSearchTopTab';

function SearchScreen(): React.JSX.Element {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, { paddingTop: top }]} />
      <SearchBar to={'Main'} back={true} />
      <View style={styles.container}>
        <HomeSearchTopTab />
      </View>
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
  },
});
