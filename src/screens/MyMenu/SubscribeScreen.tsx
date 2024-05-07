import React from "react";
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";

type props = NativeStackScreenProps<Routes, 'SubScribe'>
function SubScribe(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="필터 구매 내역" />
    </SafeAreaView>
  );
}

export default SubScribe;