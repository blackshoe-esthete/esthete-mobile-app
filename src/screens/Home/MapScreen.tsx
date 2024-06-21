import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {MapPressEvent, Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import backspaceLogo from '@assets/icons/backspace.png';
import locationIcon from '@assets/icons/location_icon.png';
import locationIconSmall from '@assets/icons/location_icon_sm.png';
import exampleImg from '@assets/imgs/ex3.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MapScreen(): React.JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<{latitude: number; longitude: number} | null>(null); // 클릭한 위치의 좌표 상태 추가
  const [region, setRegion] = useState<Region | undefined>({
    latitude: 37.55703563268905,
    longitude: 126.99773367494346,
    latitudeDelta: 0.0000001,
    longitudeDelta: 0.0000001,
  }); // region을 null로 초기화
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const handleMapPress = (event: MapPressEvent) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setClickedLocation({latitude, longitude});
    console.log(`Clicked location: ${latitude}, ${longitude}`);
  };

  useEffect(() => {
    const loadCachedLocation = async () => {
      try {
        const cachedLocation = await AsyncStorage.getItem('userLocation');
        if (cachedLocation) {
          const {latitude, longitude} = JSON.parse(cachedLocation);
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        }
      } catch (error) {
        console.log('Failed to load cached location', error);
      }
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: '위치 정보 사용 권한 요청',
          message: '위치 정보를 사용하려면 권한이 필요합니다.',
          buttonNeutral: '나중에 물어보기',
          buttonNegative: '취소',
          buttonPositive: '확인',
        });
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
          AsyncStorage.setItem('userLocation', JSON.stringify({latitude, longitude}));
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    /* (async () => {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: 'Seoul Jung District',
            key: Platform.OS === 'android' ? Config.ANDROID_GOOGLE_MAPS_API_KEY : Config.IOS_GOOGLE_MAPS_API_KEY,
          },
        });
        console.log(`Geocode data: ${JSON.stringify(response.data)}`);
      } catch (error) {
        console.error('Failed to fetch geocode data:', error);
      }
    })(); */

    // AsyncStorage.removeItem('userLocation');
    loadCachedLocation();
    requestLocationPermission();
  }, []);

  const toggleZoom = () => {
    setIsClicked(!isClicked);
    if (region) {
      setRegion({
        ...region,
        latitudeDelta: isClicked ? 0.015 : region.latitudeDelta / 2,
        longitudeDelta: isClicked ? 0.0121 : region.longitudeDelta / 2,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topInset, {height: top}]} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.wrapper, {top: top + 21}]}>
        <Image source={backspaceLogo} style={styles.icon} />
      </TouchableOpacity>

      {isClicked && (
        <FlatList
          horizontal={true}
          data={[1, 2, 3]}
          keyExtractor={item => item.toString()}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.detailImageContainer,
                {marginRight: index === 2 ? 25 : 0},
                {marginLeft: index === 0 ? 25 : 0},
              ]}>
              <Image source={exampleImg} style={styles.detailImage} resizeMode="cover" />
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

      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region} onPress={handleMapPress}>
        {region && (
          <Marker
            key={`${region.latitude}-${region.longitude}`}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="My Location"
            onPress={toggleZoom}>
            <View style={styles.markerContainer}>
              <Image source={locationIconSmall} style={styles.markerIcon} resizeMode="contain" />
              <Image source={exampleImg} style={styles.markerImage} resizeMode="cover" />
              <View style={styles.numberContainer}>
                <Text style={styles.number}>{isClicked ? 7 : 3}</Text>
              </View>
            </View>
          </Marker>
        )}
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
