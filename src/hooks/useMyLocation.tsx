import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Region} from 'react-native-maps';

const useMyLocation = () => {
  const [myRegion, setMyRegion] = useState<Region | undefined>({
    latitude: 37.55703563268905,
    longitude: 126.99773367494346,
    latitudeDelta: 0.0000001,
    longitudeDelta: 0.0000001,
  });

  useEffect(() => {
    // const loadCachedLocation = async () => {
    //   try {
    //     const cachedLocation = await AsyncStorage.getItem('userLocation');
    //     if (cachedLocation) {
    //       const {latitude, longitude} = JSON.parse(cachedLocation);
    //       setMyRegion({
    //         latitude,
    //         longitude,
    //         latitudeDelta: 0.015,
    //         longitudeDelta: 0.0121,
    //       });
    //     }
    //   } catch (error) {
    //     console.log('Failed to load cached location', error);
    //   }
    // };

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
          setMyRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
          //   AsyncStorage.setItem('userLocation', JSON.stringify({latitude, longitude}));
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    // AsyncStorage.removeItem('userLocation');
    // loadCachedLocation();
    requestLocationPermission();
  }, []);

  return myRegion;
};

export default useMyLocation;
