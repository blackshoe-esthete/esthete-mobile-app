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
          '초상화',
          '풍경',
          '거리',
          '음식',
          '패션',
          '건축',
          '야경',
          '스포츠',
        ]}
        renderItem={({item}) => (
          <View style={styles.keyword}>
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
    padding: 15,
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
