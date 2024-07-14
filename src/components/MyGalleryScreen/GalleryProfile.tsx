import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import profile from '@assets/imgs/profile-img.png';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getMyFollower, getMyFollowing, getMyInfo} from 'src/apis/userInfo';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';

type Props = NativeStackScreenProps<Routes, 'MyTab'>;

function GalleryProfile({route, navigation}: Props): React.JSX.Element {
  const {data: following} = useQuery({
    queryKey: ['following'],
    queryFn: getMyFollowing,
  });
  const {data: follower} = useQuery({
    queryKey: ['follower'],
    queryFn: getMyFollower
  });
  type info = {
    introduce?: string;
    biography?: string;
    follower_count: number;
    following_count: number;
    profile_url?: string;
  }

  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<info>(['my-profile']);

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>{userProfile?.introduce}</Text>  
        <Text style={styles.subText}>{userProfile?.biography}</Text>
        <View style={styles.followBox}>
          <TouchableOpacity style={styles.followLayer} onPress={() => navigation.navigate('Friends', following)}>
            <Text style={styles.follower}>팔로워</Text>
            <Text style={styles.followNum}>{userProfile?.follower_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followLayer} onPress={() => navigation.navigate('Friends', follower)}>
            <Text style={[styles.follower, {marginLeft: 19}]}>팔로잉</Text>
            <Text style={styles.followNum}>{userProfile?.following_count}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{uri: `https://${userProfile?.profile_url}`}} style={styles.icon} />
    </View>
  );
}

export default GalleryProfile;

const styles = StyleSheet.create({
  container: {
    height: 143,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBox: {
    width: 'auto',
    maxWidth: '60%',
    paddingVertical: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  subText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 25,
    borderRadius: 100
  },
  followLayer: {
    display: 'flex',
    flexDirection: 'row',
  },
  followBox: {
    marginTop: 17,
    display: 'flex',
    flexDirection: 'row',
  },
  follower: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  followNum: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginLeft: 11,
  },
});
