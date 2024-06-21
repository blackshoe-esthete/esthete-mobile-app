import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import KeywordList from '@components/FilterSearchScreen/KeywordList';
import SearchBar from '@components/common/SearchBar';
import MasonryList from '@react-native-seoul/masonry-list';
import RenderItem from '@components/FilterSearchScreen/RenderItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import searchIcon from '@assets/icons/search.png';
type Props = NativeStackScreenProps<Routes, 'FilterSearchPage'>;

type ImageItem = {
  id: string;
  source: {uri: string};
  author?: string;
  name?: string; // 필터 이름
  like?: boolean;
  likeNum?: string;
};
const data: ImageItem[] = [
  {
    id: '1',
    source: require('../../assets/imgs/filter_ex1.png'),
    author: '작가1',
    name: '필터1',
    like: false,
    likeNum: '12k',
  },
  {
    id: '2',
    source: require('../../assets/imgs/filter_ex2.png'),
    author: '작가2',
    name: '필터2',
    like: true,
    likeNum: '10k',
  },
  {
    id: '3',
    source: require('../../assets/imgs/filter_ex3.png'),
    author: '작가3',
    name: '필터3',
    like: false,
    likeNum: '5k',
  },
  {
    id: '4',
    source: require('../../assets/imgs/filter_ex3.png'),
    author: '작가3',
    name: '필터3',
    like: false,
    likeNum: '5k',
  },
  {
    id: '5',
    source: require('../../assets/imgs/filter_ex3.png'),
    author: '작가3',
    name: '필터3',
    like: false,
    likeNum: '5k',
  },
];

function FilterSearchScreen({navigation, route}: Props): React.JSX.Element {
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* 검색창 */}
        <SearchBar
          iconSource={searchIcon}
          to={'FilterSearchPage'}
          back={true}
          placeHolder={'필터, 작가 검색'}
        />

        {/* 키워드 */}
        <View style={{marginLeft: 20}}>
          <KeywordList marginVertical={30} />
        </View>

        {/* 필터 */}
        <View style={{display: 'flex'}}>
          <MasonryList
            data={data as ImageItem[]}
            keyExtractor={(item: ImageItem) => item.id}
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
});

export default FilterSearchScreen;
