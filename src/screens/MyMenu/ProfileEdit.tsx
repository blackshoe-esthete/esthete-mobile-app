import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import Profile from '@components/SettingScreen/Profile';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '@components/SettingScreen/CommonButton';

function ProfileEdit() {
  return (
    <SafeAreaView edges={['top']}>
      <MenuHeader title="프로필 편집" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <Profile />
        <CommonButton title="저장하기" margin={50} marginHorizontal={20}/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
    marginBottom: 60,
  },
});
