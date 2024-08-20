import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import naver from '@assets/imgs/naverlogin.png';
import {
  KakaoOAuthToken,
  login,
  logout,
  unlink,
  getProfile as getKakaoProfile,
  KakaoProfile,
} from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NaverLogin, { NaverLoginInitParams } from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { socialOkLogin } from 'src/apis/login';

const windowWidth = Dimensions.get('window').width;
type socialProp = {
  img: string;
  navigation?: () => void;
  label?: string;
};

function SocialLogin(props: socialProp): React.JSX.Element {
  const navigation = useNavigation();
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
  // const [success, setSuccessResponse] = useState<NaverLoginResponse['successResponse']>();

  // const [failure, setFailureResponse] = useState<NaverLoginResponse['failureResponse']>();
  // const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

  // const getNaverLogin = async (): Promise<void> => {
  //   const {failureResponse, successResponse} = await NaverLogin.login();
  //   setSuccessResponse(successResponse);
  //   setFailureResponse(failureResponse);
  //   console.log(success!.accessToken);
  // };

  // const getKakaoIdToken = async (): Promise<KakaoLogin.KakaoOAuthToken> => {
  //   const res = await KakaoLogin.login();
  //   console.log(res.accessToken);
  //   return res;
  // };
  // const getProfile = () => {
  //   KakaoLogin.getProfile()
  //     .then(result => {
  //       console.log('GetProfile Success', JSON.stringify(result));
  //     })
  //     .catch(error => {
  //       console.log(`GetProfile Fail(code:${error.code})`, error.message);
  //     });
  // };
  const [result, setResult] = useState<string>('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    NaverLogin.initialize({
      appName: 'esthete',
      consumerKey: Config.CONSUMER_KEY as string,
      consumerSecret: Config.CONSUMER_SECRET_KEY as string,
      serviceUrlSchemeIOS: 'naverlogin',
      disableNaverAppAuthIOS: true,
    });
    GoogleSignin.configure({
      iosClientId: Config.GOOGLE_CLIENT_IOS_ID as string
    });
  }, []);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      setResult(JSON.stringify(token));
      console.log('카카오 로그인 성공');
      getProfile();
    } catch (err) {
      console.error('login err', err);
    }
  };
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      setNickname(profile.nickname);
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
      if(profile){
        socialOkLogin({
          provider: 'kakao',
          nickname: `${profile.nickname}`
        });
      }
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    const token = await NaverLogin.login();
    setResult(JSON.stringify(token));
    console.log('네이버 로그인 성공');
  }

  const signInWithGoogle = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const token = await GoogleSignin.signIn();
    console.log(JSON.stringify(token));
    if (token) {
      setResult(JSON.stringify(token));
      // navigation.navigate('SignUp2');
    }
  }

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.label == 'kakao') {
          // getKakaoIdToken();
          signInWithKakao();
        } else if (props.label == 'naver') {
          // getNaverLogin();
          signInWithNaver();
        } else if (props.label == 'google'){
          signInWithGoogle();
        }
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
