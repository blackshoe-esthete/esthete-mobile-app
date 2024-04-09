import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import backspaceLogo from '@assets/icons/backspace.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function MapScreen(): React.JSX.Element {
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
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.5583,
          longitude: 127.0002,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
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
    height: '100%',
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
});

export default MapScreen;
