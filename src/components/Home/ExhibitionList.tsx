import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import arrowIcon from '@assets/icons/arrow.png';
import { useNavigation } from '@react-navigation/native';
import HorizontalList from './HorizontalList';
import { useQuery } from '@tanstack/react-query';
import {
  getIsolatedExhibitionList,
  getIsolatedExhibitionListWithTag,
  getMainExhibitionList,
  getMainExhibitionListWithTag,
  getPreferAuthorList,
} from 'src/apis/mainExhibitionService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '#types/navigations';
import { useExhibitionCluster, useNearbyExhibitions } from '@hooks/useNearbyExhibitions';
import useMyLocation from '@hooks/useMyLocation';
import anonymousImg from '@assets/imgs/anonymous.png';

interface ExhibitionListProps {
  selectedTag: string;
}

function ExhibitionList({ selectedTag }: ExhibitionListProps): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data: preferedAuthorData, isFetching: isFetchingPreferedAuthor } = useQuery({
    queryKey: ['preferedAuthor'],
    queryFn: getPreferAuthorList,
  });

  const { data: recommendedExhibitionData, isFetching: isFetchingRecommendedExhibition } = useQuery({
    queryKey: ['recommendedExhibition', selectedTag],
    queryFn: () => (selectedTag === '' ? getMainExhibitionList() : getMainExhibitionListWithTag([selectedTag])),
  });

  const { data: isolatedExhibitionData, isFetching: isFetchingIsolatedExhibition } = useQuery({
    queryKey: ['isolatedExhibition', selectedTag],
    queryFn: () => (selectedTag === '' ? getIsolatedExhibitionList() : getIsolatedExhibitionListWithTag([selectedTag])),
  });

  const myRegion = useMyLocation();
  const { data: clusterData } = useExhibitionCluster(myRegion!.latitude, myRegion!.longitude, 10, 'state');
  const { data: nearbyExhibitionData, isFetching: isFetchingNearbyExhibition } = useNearbyExhibitions(
    clusterData?.content[0]
  );

  return (
    <ScrollView contentContainerStyle={styles.exhibitionContainer}>
      <HorizontalList
        title="당신을 위한 추천!"
        data={recommendedExhibitionData}
        imgStyles={styles.exhibitionImg}
        idKey="exhibition_id"
        urlKey="thumbnail_url"
        isFetching={isFetchingRecommendedExhibition}
      />
      <HorizontalList
        title="이런 전시실은 어떠세요?"
        data={isolatedExhibitionData}
        imgStyles={styles.exhibitionImg}
        idKey="exhibition_id"
        urlKey="thumbnail_url"
        isFetching={isFetchingIsolatedExhibition}
      />
      <HorizontalList
        title="선호 작가"
        data={preferedAuthorData}
        imgStyles={styles.personImg}
        idKey="user_id"
        urlKey="profile_url"
        imgSource={anonymousImg}
        isFetching={isFetchingPreferedAuthor}
      />
      <HorizontalList
        title="내 주변"
        data={nearbyExhibitionData?.content}
        imgStyles={[styles.exhibitionImg, { marginBottom: 70 }]}
        idKey="exhibition_id"
        urlKey="thumbnail_url"
        isFetching={isFetchingNearbyExhibition}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.text}>내 주변</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#D6D6D6', fontSize: 12, fontWeight: '400' }}>지도 보기</Text>
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
