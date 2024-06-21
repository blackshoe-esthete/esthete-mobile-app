import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import naver from '@assets/imgs/naverlogin.png';


const windowWidth = Dimensions.get('window').width;
type socialProp = {
  img: string;
  navigation?: () => void;
};

function SocialLogin(props: socialProp): React.JSX.Element {
  return (
    <TouchableOpacity onPress={() => props.navigation && props.navigation()}>
      <Image source={props.img} style={styles.buttonLayer} />
    </TouchableOpacity>
  );
}

export default SocialLogin;

const styles = StyleSheet.create({
  buttonLayer: {
    width: (windowWidth * 9) / 10,
    borderRadius: 8
  },
});
