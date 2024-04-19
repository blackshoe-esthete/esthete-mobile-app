import React from 'react';

import {View, ScrollView, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';

const ExhibitionScreen = () => {
  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.mainPicture}>
              <ExhibitionMainPicture entered={false} />
            </View>

            <View style={styles.pictures}>
              <ExhibitionPictureList />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Visit" color="#000" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ExhibitionScreen;
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPicture: {
    flex: 1,
    aspectRatio: 1,
    width: '100%',
  },
  pictures: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{translateX: -30}],
    width: 70,
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#FFD600',
    shadowColor: '#FFD600',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // Android
    fontSize: 18,
  },
});
