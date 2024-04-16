import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

function Keyword(): React.JSX.Element {
  return (
    <View style={styles.keywordContainer}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gap10}
        data={[
          '따뜻한',
          '부드러운',
          '평화로운',
          '차가운',
          '빈티지한',
          '몽환적인',
          '싱그러운',
        ]}
        renderItem={({item, index}) => (
          <View style={[styles.keyword, index === 0 && {marginLeft: 20}]}>
            <Text style={styles.keywordText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Keyword;

const styles = StyleSheet.create({
  keywordContainer: {
    flexDirection: 'row',
    gap: 9,
    marginVertical: 30,
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
  gap10: {
    gap: 10,
  },
});
