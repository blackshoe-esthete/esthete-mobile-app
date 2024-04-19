import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const ExhibitionEnteredScreen = () => {
  const likesIcon = require('../../assets/icons/likes.png');
  const commentsIcon = require('../../assets/icons/comments.png');
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          <View style={styles.mainPicture}>
            <ExhibitionMainPicture entered={true} />
          </View>
          <View style={styles.flexContainer}>
            <Image source={likesIcon} />
            <Image source={commentsIcon} />
          </View>
          <View style={styles.pictures}>
            <ExhibitionPictureList />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              전시회 설명이 노출되는 곳입니다.
            </Text>
          </View>
          <Text style={styles.title}>위치 정보</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.541,
                longitude: 126.986,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExhibitionEnteredScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030303',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  mainPicture: {
    flex: 1,
  },
  pictures: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: 18,
    paddingTop: 20,
    gap: 18,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '95%',
    padding: 10,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 50,
    backgroundColor: '#292929',
    color: '#D6D6D6',
  },
  infoText: {
    color: '#D6D6D6',
    fontSize: 14,
  },
  title: {
    width: '95%',
    textAlign: 'left',
    color: '#ffffff',
    marginBottom: 20,
    fontSize: 16,
  },
  map: {
    width: '95%',
    height: 200,
    marginBottom: 107,
  },
});
