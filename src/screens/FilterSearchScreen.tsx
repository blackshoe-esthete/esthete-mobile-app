import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
// import KeywordList from '@components/FilterSearchScreen/KeywordList';
import KeywordList from '@components/FilterSearchScreen/KeywordList';
import ExhibitionList from '@components/HomeScreen/ExhibitionList';
import SearchBar from '@components/common/SearchBar';
import back from '@assets/icons/backspace_white.png';
import {useNavigation} from '@react-navigation/native';

function FilterSearchScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* 검색창 */}
        <View style={{display: 'flex', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.wrapper, {top: top + 21}]}>
            <Image source={back} style={styles.icon} />
          </TouchableOpacity>
          <SearchBar left={40} label="필터, 작가 검색" width={320} />
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
});

export default FilterSearchScreen;
