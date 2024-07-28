import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '#types/navigations';

interface SearchExhibitionItemProps {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
}

const SearchExhibitionItem = ({ id, title, author, thumbnail }: SearchExhibitionItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Exhibition', { id })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: thumbnail }} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.exhibitionName}>{title}</Text>
          <Text style={styles.artistName}>{author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  exhibitionName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600', // React Native에서 fontWeight 값은 문자열로 표현해야 합니다.
    marginBottom: 6,
  },
  artistName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400', // 마찬가지로 여기도 문자열로 변경
  },
});

export default SearchExhibitionItem;
