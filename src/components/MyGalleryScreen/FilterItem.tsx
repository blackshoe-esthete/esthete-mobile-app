import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';

type galleryProp = {
  filter_id: string;
  filter_name: string;
  filter_thumbnail_url: string;
};
const {width} = Dimensions.get('window');
function FilterItem(props: galleryProp): React.JSX.Element {
  return (
    <View style={styles.photoBox}>
      <Image src={props.filter_thumbnail_url} style={styles.photoIcon} />
      {/* <View style={styles.titleBox}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </View> */}
      <ImageBackground style={styles.titleBox} borderRadius={4}>
        <Text style={styles.textStyle}>{props.filter_name}</Text>
      </ImageBackground>
    </View>
  );
}

export default FilterItem;

const styles = StyleSheet.create({
  photoBox: {
    width: width,
    height: 180,
    marginBottom: 20,
  },
  photoIcon: {
    width: '100%',
    resizeMode: 'stretch',
    height: '100%',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#0000004D',
    zIndex: 1,
    width: '100%',
    height: 50,
    // blurRadius: 4,
  },
  textStyle: {
    marginTop: 21,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
