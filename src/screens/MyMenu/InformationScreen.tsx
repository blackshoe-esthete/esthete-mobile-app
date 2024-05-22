import React from "react";
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import nextIcon from '@assets/icons/arrow.png';

type Props = NativeStackScreenProps<Routes, 'Information'>
function Information({navigation, route}: Props){
  const objects = [
    {id: 1, title: '개인정보처리방침', name: 'MyInfo'},
    {id: 2, title: '사업자 정보', name: 'CompanyInfo'},
    {id: 3, title: '오픈소스', name: 'OpenSource'},
  ];
  type menuProp = {
    id: number;
    title: string;
    name?: string;
  };
  const nextScreen = (props: menuProp) => {
    const newScreen: any = props?.name;
    return (
      <TouchableOpacity
        onPress={() => {
          newScreen && navigation.navigate(newScreen);
        }}>
        <View style={styles.stackButton}>
          <Text style={styles.titleStyle}>{props.title}</Text>
          <Image source={nextIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  };
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="정보" />
      <View style={{marginTop: 15, width: '100%'}}>
        {objects.map((content, i) => {
          return <View key={i}>{nextScreen(content)}</View>;
        })}
      </View>
    </SafeAreaView>
  );
}

export default Information;

const styles = StyleSheet.create({
  stackButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 25,
    height: 68,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#292929',
    borderWidth: 0.8,
  },
  titleStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: -0.36,
  },
  icon: {
    width: 8.5,
    height: 20,
  },
})