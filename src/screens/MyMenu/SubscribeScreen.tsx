import React from "react";
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import MyFilter from "@screens/MyGallery/MyFilter";

type props = NativeStackScreenProps<Routes, 'SubScribe'>
function SubScribe(){
  return(
    <SafeAreaView edges={['top']} style={{flex: 1, display: 'flex'}}>
      <MenuHeader title="필터 구매 내역" />
      <MyFilter />
    </SafeAreaView>
  );
}

export default SubScribe;