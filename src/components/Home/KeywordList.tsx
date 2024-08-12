import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tags = ['초상화', '풍경', '거리', '음식', '패션', '건축', '야경', '스포츠', '저널리즘', '야생', '미술'];

interface KeywordProps {
  selectedTag: string;
  onPress: (tag: string) => void;
}

function Keyword({ selectedTag, onPress }: KeywordProps): React.JSX.Element {
  return (
    <View style={{ marginVertical: 30 }}>
      <View style={styles.keywordContainer}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={tags}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={[
                styles.keyword,
                selectedTag === item && { backgroundColor: '#FFD400' },
                index === 0 && { marginLeft: 20 },
                index === tags.length - 1 && { marginRight: 20 },
              ]}
            >
              <Text style={[styles.keywordText, selectedTag === item && { color: '#000000' }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
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
