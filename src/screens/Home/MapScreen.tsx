import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import backspaceLogo from '@assets/icons/backspace.png';
import locationIcon from '@assets/icons/location_icon.png';
import locationIconSmall from '@assets/icons/location_icon_sm.png';
import exampleImg from '@assets/imgs/ex3.png';

function MapScreen(): React.JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  // 지도 확대/축소를 위한 상태 추가
  const [region, setRegion] = useState({
    latitude: 37.5583,
    longitude: 127.0002,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // isClicked 상태가 변경될 때마다 지도의 확대/축소 상태를 업데이트하는 함수
  const toggleZoom = () => {
    setIsClicked(!isClicked);
    if (!isClicked) {
      // 확대할 경우의 region 값
      setRegion({
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      });
    } else {
      // 원래 상태로 돌아갈 경우의 region 값
      setRegion({
        ...region,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  };

  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[styles.topInset, {height: top}]} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.wrapper, {top: top + 21}]}>
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
              <Image
                source={exampleImg}
                style={styles.detailImage}
                resizeMode="cover"
              />
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
        region={region} // region 상태를 사용
      >
        {isClicked && (
          <Marker
            coordinate={{
              latitude: 37.5589,
              longitude: 127.001233,
            }}>
            <View style={styles.markerContainer}>
              <Image
                source={locationIcon}
                style={styles.markerIcon}
                resizeMode="contain"
              />
              <Image
                source={exampleImg}
                style={styles.markerImage}
                resizeMode="cover"
              />
            </View>
          </Marker>
        )}
        {isClicked && (
          <Marker
            coordinate={{
              latitude: 37.5575,
              longitude: 126.9983,
            }}>
            <View style={styles.smallMarkerContainer}>
              <Image
                source={locationIconSmall}
                style={styles.smallMarkerIcon}
                resizeMode="contain"
              />
              <Image
                source={exampleImg}
                style={styles.smallMarkerImage}
                resizeMode="cover"
              />
            </View>
          </Marker>
        )}
        <Marker
          coordinate={{
            latitude: 37.5583,
            longitude: 127.0002,
          }}
          onPress={toggleZoom}>
          <View style={styles.smallMarkerContainer}>
            <Image
              source={locationIconSmall}
              style={styles.smallMarkerIcon}
              resizeMode="contain"
            />
            <Image
              source={exampleImg}
              style={styles.smallMarkerImage}
              resizeMode="cover"
            />
            <View style={styles.numberContainer}>
              <Text style={styles.number}>{isClicked ? 7 : 3}</Text>
            </View>
          </View>
        </Marker>
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
    width: 100,
    height: 105,
  },
  markerIcon: {
    width: 100,
    height: 105,
  },
  markerImage: {
    position: 'absolute',
    top: 2,
    width: 96,
    height: 96,
    borderRadius: 100,
  },
  smallMarkerContainer: {
    position: 'relative',
    alignItems: 'center',
    width: 63,
    height: 67,
  },
  smallMarkerIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 54,
  },
  smallMarkerImage: {
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
  number: {color: '#000', fontSize: 18, fontWeight: '700'},
  detailImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 155,
    height: 155,
    shadowColor: '#000', // 쉐도우 색상
    shadowOffset: {
      width: 1, // 가로 방향으로의 쉐도우 거리
      height: 1, // 세로 방향으로의 쉐도우 거리
    },
    shadowOpacity: 0.25, // 쉐도우 투명도
    shadowRadius: 4, // 쉐도우의 블러 반경
    elevation: 4, // 안드로이드에서의 쉐도우 효과
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
