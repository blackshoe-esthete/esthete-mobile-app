import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import menu from '@assets/icons/menu.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../screens/Routes';
import GalleryProfile from './GalleryProfile';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'src/apis/userInfo';

type Props = NativeStackScreenProps<Routes, 'MyTab'>;
function MyHeader({route, navigation}: Props): React.JSX.Element {
  const {data: userProfile} = useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyInfo,
  });   

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.textFont}>{userProfile?.name}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('MyMenu')}>
          <Image source={menu} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <GalleryProfile navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#030303',
    paddingHorizontal: 20,
  },
  root: {
    height: 60,
    width: '100%',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    width: 30,
    height: 20,
  },
  textFont: {
    color: 'white',
    fontSize: 20,
  },
});
