import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageProps,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps;
  author?: string;
  date?: string;
};
const {width} = Dimensions.get('window');
function TempoItem(props: galleryProp): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <View style={styles.photoBox}>
        <Image source={props.src} style={styles.photoIcon} />
        <View style={styles.titleBox}>
          <Text style={styles.textStyle}>{props.date} 임시저장</Text>
        </View>
      </View>
      <View style={styles.buttonLayer}>
        <TouchableOpacity style={styles.buttonLeftBox}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>삭제하기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRightBox}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>편집하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TempoItem;

const styles = StyleSheet.create({
  photoBox: {
    width: width,
    height: 180,
  },
  photoIcon: {
    width: '100%',
    resizeMode: 'stretch',
    height: '100%',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(41, 41, 41, 0.40)',
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
  buttonLayer: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    marginBottom: 20,
  }, 
  buttonLeftBox: {
    backgroundColor: '#171717',
    borderTopColor: '#292929',
    borderBottomColor: '#292929',
    borderLeftColor: '#292929',
    borderWidth: 1,
    width: '50%'
  },
  buttonRightBox: {
    backgroundColor: '#171717',
    borderColor: '#292929',
    borderWidth: 1,
    width: '50%'
  },
  buttonContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  buttonText: {
    color: '#E9E9E9',
    fontSize: 16,
    fontWeight: '400',
  }
});
