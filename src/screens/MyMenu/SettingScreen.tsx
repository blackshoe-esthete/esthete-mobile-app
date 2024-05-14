import React from "react";
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import nextIcon from '@assets/icons/arrow.png';

type Props = NativeStackScreenProps<Routes, 'Settings'>
function Settings({ navigation, route}: Props){
  const objects = [
    {id: 1, title: '선호 태그 편집', name: 'Prefer'},
    {id: 2, title: '프로필 편집', name: 'Profile'},
    {id: 3, title: '회원 탈퇴', name: 'GoOut'},
  ];
  type menuProp = {
    id: number;
    title: string;
    name?: string;
  };
  const nextScreen = (props: menuProp) => {
    const newScreen = props?.name;
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
      <MenuHeader title="설정" />
      <View style={{marginTop: 15, width: '100%'}}>
        {objects.map((content, i) => {
          return <View key={i}>{nextScreen(content)}</View>;
        })}
      </View>
    </SafeAreaView>
  );
}

export default Settings;

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