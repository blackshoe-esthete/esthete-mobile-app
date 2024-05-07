import React from "react";
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";

type props = NativeStackScreenProps<Routes, 'Settings'>
function Settings(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="설정" />
    </SafeAreaView>
  );
}

export default Settings;