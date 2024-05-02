import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import unlike from '@assets/icons/unlike.png';
import like from '@assets/icons/like.png';
import profile from '@assets/imgs/anonymous.png';
import {Routes} from '../../screens/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type RootStackNavigationProp = NativeStackNavigationProp<Routes>;
import { useNavigation } from '@react-navigation/native';

type ImageItem = {
  id: string;
  source: {uri: string};
  author?: string;
  name?: string;
  like?: boolean;
  likeNum?: string;
};

function RenderItem({item}: {item: ImageItem; index: number}) {
  const navigation = useNavigation< RootStackNavigationProp>();

  return (
    <View style={{flex: 1}}>
      <View style={styles.likeBox}>
        {item.like ? (
          <Image source={like} style={styles.icon} />
        ) : (
          <Image source={unlike} style={styles.icon} />
        )}
        <Text style={styles.num}>{item.likeNum}</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('FilterIndexScreen')}>
        <Image source={item.source} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textBox}>
        <Text style={styles.filterName}>{item.name}</Text>
        <View style={styles.textInText}>
          <Image source={profile} style={styles.profileSize} />
          <Text style={styles.authorName}>{item.author}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    resizeMode: 'cover',
  },
  likeBox: {
    position: 'absolute',
    top: 15,
    right: 5,
    zIndex: 2,
    alignItems: 'center',
    gap: 3,
  },
  icon: {
    width: 18,
    height: 15,
  },
  num: {
    fontSize: 10,
    color: '#FFF',
  },
  textBox: {
    height: 38,
    flexDirection: 'row',
    paddingTop: 5,
    width: 'auto',
    paddingRight: 40,
    paddingLeft: 10,
  },
  textInText: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profileSize: {
    width: 20,
    height: 20,
    marginRight: 7,
  },
  filterName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  authorName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
});

export default RenderItem;
