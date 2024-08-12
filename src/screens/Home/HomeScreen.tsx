import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import KeywordList from '@components/Home/KeywordList';
import ExhibitionList from '@components/Home/ExhibitionList';
import SearchBar from '@components/common/SearchBar';
import searchIcon from '@assets/icons/search.png';

function HomeScreen(): React.JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>('');

  const onPressToggleTag = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
  };

  // StatusBar의 색과 호환하기 위함
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, { paddingTop: top }]} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {/* 검색창 */}
        <SearchBar iconSource={searchIcon} to={'HomeSearch'} />
        {/* 키워드 */}
        <KeywordList selectedTag={selectedTag} onPress={onPressToggleTag} />
        {/* 전시 목록 */}
        <ExhibitionList selectedTag={selectedTag} />
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
