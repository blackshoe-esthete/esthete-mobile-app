import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import naver from '@assets/imgs/naverlogin.png';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

const windowWidth = Dimensions.get('window').width;
type socialProp = {
  img: string;
  navigation?: () => void;
};
function SocialLogin(props: socialProp): React.JSX.Element {
  // const login = () => {
  //   KakaoLogin.login()
  //     .then(result => {
  //       console.log('Login Success', JSON.stringify(result));
  //       getProfile();
  //     })
  //     .catch(error => {
  //       if (error.code === 'E_CANCELLED_OPERATION') {
  //         console.log('Login Cancel', error.message);
  //       } else {
  //         console.log(`Login Fail(code:${error.code})`, error.message);
  //       }
  //     });
  // };

  const getKakaoIdToken = async (): Promise<KakaoLogin.KakaoOAuthToken> => {
    const res = await KakaoLogin.login();
    console.log(res.accessToken);
    return res;
  };
  const getProfile = () => {
    KakaoLogin.getProfile()
      .then(result => {
        console.log('GetProfile Success', JSON.stringify(result));
      })
      .catch(error => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        getKakaoIdToken();
      }}>
      <Image source={props.img} style={styles.buttonLayer} />
    </TouchableOpacity>
  );
}

export default SocialLogin;

const styles = StyleSheet.create({
  buttonLayer: {
    width: (windowWidth * 9) / 10,
    borderRadius: 8,
    height: 57,
  },
});
