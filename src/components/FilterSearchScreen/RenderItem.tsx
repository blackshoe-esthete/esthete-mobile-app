import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity, Dimensions, useWindowDimensions} from 'react-native';
import unlike from '@assets/icons/unlike.png';
import like from '@assets/icons/like.png';
import profile from '@assets/imgs/anonymous.png';
import {Routes} from '../../screens/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type RootStackNavigationProp = NativeStackNavigationProp<Routes>;
import {useNavigation} from '@react-navigation/native';

type ImageItem = {
  filter_id: string;
  filter_name: string;
  like_count: number;
  is_like: boolean;
  filter_thumbnail_url: string;
  user_id: string;
  nickname: string;
  profile_img_url: string;
};

const {width, height} = Dimensions.get('window');

function RenderItem({item}: {item: ImageItem; index: number}) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [imageHeight, setImageHeight] = useState(0);
  const imageWidth = (width - 20) / 2; // 원하는 너비 설정

  useEffect(() => {
    if (item?.filter_thumbnail_url) {
      Image.getSize(
        item.filter_thumbnail_url,
        (originalWidth, originalHeight) => {
          const aspectRatio = originalWidth / originalHeight;
          setImageHeight(imageWidth / aspectRatio);
        },
        error => {
          console.error('Error getting image size:', error);
        },
      );
    }
  }, [item?.filter_thumbnail_url]);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.likeBox}>
        {
          item.is_like 
          ? <Image source={like} style={styles.icon} /> 
          : <Image source={unlike} style={styles.icon} />
        }
        <Text style={styles.num}>{item.like_count}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('FilterIndexScreen')}>
        <Image
          source={{uri: item.filter_thumbnail_url}}
          style={{...styles.image, height: imageHeight}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.textBox}>
        <Text style={styles.filterName}>{item.filter_name}</Text>
        <View style={styles.textInText}>
          {item.profile_img_url ? (
            <Image
              source={{
                uri: item.profile_img_url.startsWith('http') ? 
                item.profile_img_url : `https://${item.profile_img_url}`,
              }}
              style={styles.profileSize}
            />
          ) : (
            <Image source={profile} style={styles.profileSize} />
          )}
          <Text style={styles.authorName}>{item.nickname}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    resizeMode: 'cover',
    width: (width - 20) / 2,
  },
  likeBox: {
    position: 'absolute',
    top: 15,
    right: 10,
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
    width: (width - 20) / 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  profileSize: {
    width: 20,
    height: 20,
    marginRight: 7,
    borderRadius: 100
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
