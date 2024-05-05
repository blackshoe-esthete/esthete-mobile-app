import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import profile from '@assets/imgs/profile-img.png';

function Profile(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>한줄소개</Text>
        <Text style={styles.subText}>
          추가적으로 사진에 관한 추가정보 입력 추가적으로 사진에 관한 추가정보
          입력
        </Text>
        <View style={styles.followBox}>
          <Text style={styles.follower}>팔로워</Text>
          <Text style={styles.followNum}>158</Text>
          <Text style={[styles.follower, {marginLeft: 19}]}>팔로잉</Text>
          <Text style={styles.followNum}>25</Text>
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
  followBox:{
    marginTop: 17,
    display: 'flex',
    flexDirection: 'row'
  },
  follower:{
    fontSize: 14,
    color: 'white',
    fontWeight: '400'
  },
  followNum: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginLeft: 11
  }
});
