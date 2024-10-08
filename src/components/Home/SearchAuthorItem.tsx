import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import anonymousImg from '@assets/imgs/anonymous.png';

const SearchAuthorItem = ({author, introduction, profile}: {author: string; introduction: string; profile: string}) => {
  // console.log(profile);
  return (
    <View style={styles.container}>
      {profile ? (
        <Image source={{uri: profile}} style={styles.image} />
      ) : (
        <Image source={anonymousImg} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.exhibitionName}>{author}</Text>
        <Text style={styles.artistName}>{introduction}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#292929',
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D6D6D6',
  },
  textContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  exhibitionName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600', // React Native에서 fontWeight 값은 문자열로 표현해야 합니다.
    marginBottom: 5,
  },
  artistName: {
    color: '#D6D6D6',
    fontSize: 14,
    fontWeight: '400', // 마찬가지로 여기도 문자열로 변경
  },
});

export default SearchAuthorItem;
