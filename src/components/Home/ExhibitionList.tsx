import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import exampleImg from '@assets/imgs/ex1.png';
import anonymousImg from '@assets/imgs/anonymous.png';
import arrowIcon from '@assets/icons/arrow.png';
import {useNavigation} from '@react-navigation/native';
import HorizontalList from './HorizontalList';
import {useQuery} from '@tanstack/react-query';
import {getIsolatedExhibitionList, getMainExhibitionList, getPreferAuthorList} from 'src/apis/mainExhibitionService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import {useExhibitionCluster, useNearbyExhibitions} from '@hooks/useNearbyExhibitions';
import useMyLocation from '@hooks/useMyLocation';

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
  const {data: preferedAuthorData} = useQuery({
    queryKey: ['preferedAuthor'],
    queryFn: () => getPreferAuthorList(),
  });
  const myRegion = useMyLocation();
  const {data: clusterData} = useExhibitionCluster(myRegion?.latitude!, myRegion?.longitude!, 1000, 'state');
  const {data: nearbyExhibitionData} = useNearbyExhibitions(clusterData?.content[0]);

  console.log('nearbyExhibitionData:', myRegion);
  return (
    <ScrollView contentContainerStyle={styles.exhibitionContainer}>
      <HorizontalList
        title="당신을 위한 추천!"
        data={recommendedExhibitionData}
        imgStyles={styles.exhibitionImg}
        idKey="exhibition_id"
        urlKey="thumbnail_url"
      />
      <HorizontalList
        title="이런 전시실은 어떠세요?"
        data={isolatedExhibitionData}
        imgStyles={styles.exhibitionImg}
        idKey="exhibition_id"
        urlKey="thumbnail_url"
      />
      <HorizontalList
        title="선호 작가"
        data={preferedAuthorData}
        imgStyles={styles.personImg}
        idKey="user_id"
        urlKey="profile_url"
        // imgSource={anonymousImg}
      />
      <HorizontalList
        title="내 주변"
        data={nearbyExhibitionData?.content}
        imgStyles={[styles.exhibitionImg, {marginBottom: 70}]}
        idKey="exhibition_id"
        urlKey="thumbnail_url">
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
    borderRadius: 50,
    backgroundColor: '#D6D6D6',
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
