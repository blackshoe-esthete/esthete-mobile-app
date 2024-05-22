import React, {useCallback} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import menu from '@assets/icons/menu.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../screens/Routes';
import Profile from '@components/MyGalleryScreen/Profile';
// import useNavigateStore from '@store/navigate-store';
import useNavigateStore from '../../store/navigate-store';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<Routes, 'MyGalleryScreen'>;
function MyHeader(): React.JSX.Element {
  const {status} = useNavigateStore();
  const changePress = useNavigateStore(state=>state.changeStatus);
  const focusChange = useNavigateStore(state => state.getFalse);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.textFont}>작가명</Text>
        <TouchableOpacity onPress={changePress}>
          <Image source={menu} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <Profile />
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
