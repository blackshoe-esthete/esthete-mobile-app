import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import cancelIcon from '@assets/icons/cancel_gray.png';

const tags = [
  '따뜻한',
  '부드러운',
  '평화로운',
  '차가운',
  '세련된',
  '자연스러운',
  '클래식한',
  '쾌활한',
  '우아한',
  '잔잔한',
  '풍요로운',
  '짙은',
  '빈티지한',
  '화사한',
  '모던한',
  '수수한',
  '사랑스러운',
  '캐주얼한',
  '자유분방한',
  '다채로운',
  '차분한',
  '신비로운',
  '순수한',
  '고요한',
  '고급스러운',
];

interface KeywordProps {
  selectedTags: string[];
  onPressAddTag: (tag: string) => void;
  onPressRemoveTag: (tag: string) => void;
}

function Keyword({selectedTags, onPressAddTag, onPressRemoveTag}: KeywordProps): React.JSX.Element {
  return (
    <View style={{marginVertical: 30}}>
      <View style={styles.keywordContainer}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={tags}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => onPressAddTag(item)}
              style={[styles.keyword, index === 0 && {marginLeft: 20}, index === tags.length - 1 && {marginRight: 20}]}>
              <Text style={styles.keywordText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedTags.length > 0 && (
        <>
          <View style={{paddingHorizontal: 20, paddingTop: 15}}>
            <Text style={{color: '#FFF', fontSize: 13, fontWeight: '500'}}>내가 선택한 태그</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10}}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 10}}
              data={selectedTags}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={[
                    styles.selectedKeyword,
                    {
                      marginLeft: index === 0 ? 20 : 0,
                      marginRight: index === selectedTags.length - 1 ? 20 : 0,
                    },
                  ]}>
                  <Text style={styles.selectedKeywordText}>{item}</Text>
                  <Pressable onPress={() => onPressRemoveTag(item)}>
                    <Image source={cancelIcon} style={{width: 17, height: 17}} resizeMode="contain" />
                  </Pressable>
                </View>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default Keyword;

const styles = StyleSheet.create({
  keywordContainer: {
    flexDirection: 'row',
    gap: 9,
    // marginTop: 30,
  },
  keyword: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#414141',
  },
  keywordText: {
    color: '#F4F4F4',
    fontSize: 16,
  },
  selectedKeyword: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    borderRadius: 8.5,
    paddingLeft: 13,
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: '#414141',
  },
  selectedKeywordText: {
    color: '#F4F4F4',
    fontSize: 14,
  },
  gap10: {
    gap: 10,
  },
});
