import React from "react";
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import MyFilter from "@screens/MyGallery/MyFilter";
import { useQuery } from "@tanstack/react-query";
import { myPurchasedFilter } from "src/apis/mygallery";

type props = NativeStackScreenProps<Routes, 'SubScribe'>
function SubScribe(){
  const {data: purchasedFilter, isLoading} = useQuery({
    queryKey: ['purchased-filter'],
    queryFn: myPurchasedFilter
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return(
    <SafeAreaView edges={['top']} style={{flex: 1, display: 'flex'}}>
      <MenuHeader title="필터 구매 내역" />
      <MyFilter props={purchasedFilter} temporary={false}/>
    </SafeAreaView>
  );
}

export default SubScribe;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030303',
  },
})