import React from "react";
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";

type Props = NativeStackScreenProps<Routes, 'Temporary'>;
function Temporary(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="임시저장"/>
    </SafeAreaView>
  );
}

export default Temporary;