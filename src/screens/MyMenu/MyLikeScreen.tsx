import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyLikeTab from '@components/MyMenuScreen/MyLikeTab';
import MenuHeader from '@components/MyMenuScreen/MenuHeader';

type Props = NativeStackScreenProps<Routes, 'MyLikes'>;
function MyLikes({navigation, route}: Props) {
  return (
    <SafeAreaView edges={['top']}>
      <MenuHeader title="좋아요" />
      <View style={{height: '100%'}}>
        <MyLikeTab />
      </View>
    </SafeAreaView>
  );
}

export default MyLikes;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconPosition: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  icon: {
    width: 8.5,
    height: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
