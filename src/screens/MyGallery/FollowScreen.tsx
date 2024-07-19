import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import anonymousImg from '@assets/imgs/anonymous.png';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
type Props = NativeStackScreenProps<Routes, 'Friends'>;

import searchIcon from '@assets/icons/search.png';
import SearchBar from '@components/common/SearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '@screens/Routes';

function FollowScreen({route, navigation}: Props): React.JSX.Element {
  const {top} = useSafeAreaInsets();
  const data = route.params;
  console.log(data);

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.topInset, {paddingTop: top}]}>
        <ScrollView style={{width: '100%'}}>
          <SearchBar iconSource={searchIcon} to={'Friends'} back={true} placeHolder="이름 검색" />
          <FlatList
            data={data}
            renderItem={({item}) => <FriendProfile {...item}/>}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

type friendProp = {
  user_id: string;
  profile_url: string;
  name: string;
  introduce?: string;
}

const FriendProfile = (props: friendProp) => {
  return (
    <View style={styles.container}>
      <Image src={props.profile_url} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.exhibitionName}>{props.name}</Text>
      </View>
    </View>
  );
};

export default FollowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#292929',
    borderBottomWidth: 1,
    backgroundColor: 'black',
  },
  topInset: {
    backgroundColor: '#030303',
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  exhibitionName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600', // React Native에서 fontWeight 값은 문자열로 표현해야 합니다.
    marginBottom: 5,
  },
  artistName: {
    color: '#D6D6D6',
    fontSize: 14,
    fontWeight: '400', // 마찬가지로 여기도 문자열로 변경
  },
});
