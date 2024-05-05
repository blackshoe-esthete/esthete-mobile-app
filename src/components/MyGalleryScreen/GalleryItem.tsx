import React from 'react';
import {
  View, 
  StyleSheet, 
  Image, 
  Text, 
  Dimensions,
  ImageProps
} from 'react-native';

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps;
};
const {width} = Dimensions.get('window');
function GalleryItem(props: galleryProp): React.JSX.Element {
  return (
    <View style={styles.photoBox}>
      <Image source={props.src} style={styles.photoIcon}/>
      <View style={styles.titleBox}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </View>
    </View>
  );
}

export default GalleryItem;

const styles = StyleSheet.create({
  photoBox: {
    width: width,
    height: 180,
    marginBottom: 20,
  },
  photoIcon: {
    width: '100%',
    resizeMode: 'stretch',
    height: '100%'
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(41, 41, 41, 0.40)',
    zIndex: 1,
    width: '100%',
    height: 60
  },
  textStyle: {
    marginTop: 21,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }

});
