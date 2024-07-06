import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import profile from '@assets/imgs/profile-img.png';
import {useQuery} from '@tanstack/react-query';
import {getMyFollower, getMyFollowing} from 'src/apis/userInfo';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';

type Props = NativeStackScreenProps<Routes, 'MyTab'>;

function Profile({route, navigation}: Props): React.JSX.Element {
  const {data: following} = useQuery({
    queryKey: ['following'],
    queryFn: getMyFollowing,
  });
  const {data: follower} = useQuery({
    queryKey: ['follower'],
    queryFn: getMyFollower
  });

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>한줄소개</Text>  
        <Text style={styles.subText}>추가적으로 사진에 관한 추가정보 입력 추가적으로 사진에 관한 추가정보 입력</Text>
        <View style={styles.followBox}>
          <TouchableOpacity style={styles.followLayer} onPress={() => navigation.navigate('Friends', following)}>
            <Text style={styles.follower}>팔로워</Text>
            <Text style={styles.followNum}>158</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followLayer} onPress={() => navigation.navigate('Friends', follower)}>
            <Text style={[styles.follower, {marginLeft: 19}]}>팔로잉</Text>
            <Text style={styles.followNum}>25</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={profile} style={styles.icon} />
    </View>
  );
}

export default Profile;

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
