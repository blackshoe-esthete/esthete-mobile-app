import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import exampleImg from '@assets/imgs/ex1.png';
import anonymousImg from '@assets/imgs/anonymous.png';
import arrowIcon from '@assets/icons/arrow.png';
import {useNavigation} from '@react-navigation/native';
import HorizontalList from './HorizontalList';
import {useQuery} from '@tanstack/react-query';
import {getIsolatedExhibitionList, getMainExhibitionList} from 'src/apis/mainExhibitionService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';

function ExhibitionList(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {data: recommendedExhibitionData} = useQuery({
    queryKey: ['recommendedExhibition'],
    queryFn: () => getMainExhibitionList(),
  });
  const {data: isolatedExhibitionData} = useQuery({
    queryKey: ['isolatedExhibition'],
    queryFn: () => getIsolatedExhibitionList(),
  });

  return (
    <ScrollView contentContainerStyle={styles.exhibitionContainer}>
      <HorizontalList title="당신을 위한 추천!" data={recommendedExhibitionData} imgStyles={styles.exhibitionImg} />
      <HorizontalList title="이런 전시실은 어떠세요?" data={isolatedExhibitionData} imgStyles={styles.exhibitionImg} />
      <HorizontalList
        title="선호 작가"
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        imgStyles={styles.personImg}
        imgSource={anonymousImg}
      />
      <HorizontalList
        title="내 주변"
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        imgStyles={[styles.exhibitionImg, {marginBottom: 70}]}
        imgSource={exampleImg}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>내 주변</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: '#D6D6D6', fontSize: 12, fontWeight: '400'}}>지도 보기</Text>
            <Image source={arrowIcon} style={styles.arrowIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </HorizontalList>
    </ScrollView>
  );
}

export default ExhibitionList;

const styles = StyleSheet.create({
  exhibitionContainer: {
    gap: 50,
  },
  personImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 20,
  },
  exhibitionImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#D6D6D6',
  },
  arrowIcon: {
    width: 4.5,
    height: 10,
    marginRight: 10.5,
  },
});
