import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Details, MapPressEvent, Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Geolocation from '@react-native-community/geolocation';
import backspaceLogo from '@assets/icons/backspace.png';
import locationIcon from '@assets/icons/location_icon.png';
import {useQueries, useQuery} from '@tanstack/react-query';
import {getExhibitionCluster, getExhibitionList, getGeocode} from 'src/apis/mapService';
import {Cluster} from '@types/mapService.type';
import useMyLocation from '@hooks/useMyLocation';

function MapScreen(): React.JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<{latitude: number; longitude: number} | null>(null); // 클릭한 위치의 좌표 상태 추가
  const [clickedCluster, setClickedCluster] = useState<Cluster | null>(null);
  const [region, setRegion] = useState<Region | undefined>({
    latitude: 37.55703563268905,
    longitude: 126.99773367494346,
    latitudeDelta: 0.0000001,
    longitudeDelta: 0.0000001,
  });
  const myRegion = useMyLocation();

  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const group = region?.latitudeDelta! < 0.381 ? 'town' : region?.latitudeDelta! < 4.3 ? 'city' : 'state';

  const calculateRadius = (latitudeDelta: number, longitudeDelta: number): number => {
    // Approximate calculation of radius based on latitudeDelta and longitudeDelta
    const latRadius = (latitudeDelta / 2) * 111; // 111 km per degree of latitude
    const lonRadius = (longitudeDelta / 2) * (40075 / 360); // 40075 km circumference of the earth / 360 degrees
    return Math.max(latRadius, lonRadius); // Return the larger value as the radius
  };

  const radius = calculateRadius(region?.latitudeDelta || 0.015, region?.longitudeDelta || 0.0121);

  const {data: clusterData} = useQuery({
    queryKey: ['exhibitionCluster', {latitude: region?.latitude, longitude: region?.longitude, radius, group}],
    queryFn: () => getExhibitionCluster({latitude: region?.latitude, longitude: region?.longitude, radius, group}),
  });

  const geocodeQueries = useQueries({
    queries: (clusterData?.content || []).map((cluster: Cluster) => ({
      queryKey: ['geocode', `${cluster.state || ''} ${cluster.city || ''} ${cluster.town || ''}`.trim()],
      queryFn: () => getGeocode(`${cluster.state || ''} ${cluster.city || ''} ${cluster.town || ''}`.trim()),
      enabled: !!clusterData, // Ensure the cluster data is available
    })),
  });

  const geocodedClusters =
    clusterData?.content.map((cluster: Cluster, index: number) => ({
      ...cluster,
      location: geocodeQueries[index]?.data,
    })) || [];

  // console.log('geocodedClusters:', clusterData);

  const {data: clickedClusterExhibitionList} = useQuery({
    queryKey: [
      'clickedClusterExhibitionList',
      {
        state: clickedCluster?.state || '',
        city: clickedCluster?.city || '',
        town: clickedCluster?.town || '',
        page: 0,
        size: 10,
        sort: 'trending',
      },
    ],
    queryFn: () =>
      getExhibitionList({
        state: clickedCluster?.state || '',
        city: clickedCluster?.city || '',
        town: clickedCluster?.town || '',
        page: 0,
        size: 10,
        sort: 'trending',
      }),
    enabled: !!clickedCluster,
  });

  const handleMarkerPress = (cluster: Cluster) => {
    setClickedCluster(cluster);
    setIsClicked(true); // Assuming you want to toggle some UI when a cluster is clicked
  };

  const handleMapPress = (event: MapPressEvent) => {
    if (isClicked) {
      setIsClicked(false);
    }
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setClickedLocation({latitude, longitude});
    // console.log(`Clicked location: ${latitude}, ${longitude}`);
  };

  useEffect(() => {
    if (myRegion) {
      setRegion(myRegion);
    }
  }, [myRegion]);

  useEffect(() => {
    console.log('Region changed:', region);
  }, [region]);

  return (
    <View style={styles.container}>
      <View style={[styles.topInset, {height: top}]} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.wrapper, {top: top + 21}]}>
        <Image source={backspaceLogo} style={styles.icon} />
      </TouchableOpacity>

      {isClicked && (
        <FlatList
          horizontal={true}
          data={clickedClusterExhibitionList?.content}
          keyExtractor={item => item.exhibition_id.toString()}
          renderItem={({item, index}) => (
            <View
              key={item.exhibition_id}
              style={[
                styles.detailImageContainer,
                {marginRight: index === clickedClusterExhibitionList?.content.length - 1 ? 25 : 0},
                {marginLeft: index === 0 ? 25 : 0},
              ]}>
              <Image source={{uri: item.thumbnail_url}} style={styles.detailImage} resizeMode="cover" />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={{
            ...StyleSheet.absoluteFillObject,
            top: Dimensions.get('window').height - 230,
            left: 0,
            zIndex: 100,
          }}
          contentContainerStyle={{gap: 17}}
        />
      )}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onPress={handleMapPress}
        showsUserLocation
        onRegionChangeComplete={(region: Region, detail: Details) => {
          if (detail.isGesture) {
            setRegion(region);
          }
        }}
        showsMyLocationButton>
        {geocodedClusters.map((cluster: Cluster, index: number) => (
          <Marker
            key={`${cluster.state}-${cluster.city}-${cluster.town}-${index}`}
            coordinate={{
              latitude: cluster.location?.lat!,
              longitude: cluster.location?.lng!,
            }}
            onPress={() => handleMarkerPress(cluster)}>
            <View style={styles.markerContainer}>
              <Image source={locationIcon} style={styles.markerIcon} resizeMode="contain" />
              <Image source={{uri: cluster.thumbnail}} style={styles.markerImage} resizeMode="cover" />
              <View style={styles.numberContainer}>
                {/* <Text style={styles.number}>{group === 'town' ? cluster.count : clusterData.content.length}</Text> */}
                <Text style={styles.number}>{cluster.count}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  topInset: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    backgroundColor: '#030303',
    zIndex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    left: 20,
    width: 20,
    height: 20,
    zIndex: 2,
  },
  icon: {
    width: 8.5,
    height: 20,
    zIndex: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    position: 'relative',
    alignItems: 'center',
    width: 63,
    height: 67,
  },
  markerIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 54,
  },
  markerImage: {
    position: 'absolute',
    bottom: 6,
    left: 2,
    width: 46,
    height: 46,
    borderRadius: 100,
  },
  numberContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#FFD600',
    borderRadius: 100,
  },
  number: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  detailImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 155,
    height: 155,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#FFF',
    zIndex: 100,
  },
  detailImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default MapScreen;
