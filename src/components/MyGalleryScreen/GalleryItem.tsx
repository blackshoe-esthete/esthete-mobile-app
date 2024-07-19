import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageProps,
} from 'react-native';

type galleryProp = {
  exhibition_id: string;
  title: string;
  thumbnail_url: string;
  author?: string;
};
const {width} = Dimensions.get('window');
function GalleryItem(props: galleryProp): React.JSX.Element {
  return (
    <View style={styles.photoBox}>
      <Image src={props.thumbnail_url} style={styles.photoIcon} />
      <View style={styles.titleBox}>
        <Text style={styles.textStyle}>{props.title}</Text>
        {props.author && <Text style={styles.authorStyle}>{props.author}</Text>}
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
    height: '100%',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#29292966',
    zIndex: 1,
    width: '100%',
    height: 60,
  },
  textStyle: {
    marginTop: 21,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  authorStyle: {
    marginTop: 6,
    marginLeft: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
});
