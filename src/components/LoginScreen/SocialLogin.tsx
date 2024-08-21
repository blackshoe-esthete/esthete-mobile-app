import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import naver from "@assets/imgs/naverlogin.png";
import {
  KakaoOAuthToken,
  login,
  logout,
  unlink,
  getProfile as getKakaoProfile,
  KakaoProfile,
} from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NaverLogin, {
  NaverLoginInitParams,
} from "@react-native-seoul/naver-login";
import Config from "react-native-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { socialIdentifyLogin } from "src/apis/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "@screens/Routes";

const windowWidth = Dimensions.get("window").width;
type socialProp = {
  img: string;
  navigation?: () => void;
  label?: string;
};

interface SocialLoginParams {
  provider: string;
  accessToken?: string;
  email?: string;
}

type NavigationProps = NativeStackScreenProps<Routes, "LoginPage">;
type CombinedProps = socialProp & NavigationProps;

function SocialLogin(props: CombinedProps): React.JSX.Element {
  const navigation = useNavigation();
  const [result, setResult] = useState<string>("");
  const [provider, setProvider] = useState('');
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    NaverLogin.initialize({
      appName: "esthete",
      consumerKey: Config.CONSUMER_KEY as string,
      consumerSecret: Config.CONSUMER_SECRET_KEY as string,
      serviceUrlSchemeIOS: "naverlogin",
      disableNaverAppAuthIOS: true,
    });
    GoogleSignin.configure({
      iosClientId: Config.GOOGLE_CLIENT_IOS_ID as string,
    });
  }, []);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      setResult(token.accessToken);
      setProvider('kakao');
      console.log("카카오 로그인 성공");
    } catch (err) {
      console.error("login err", err);
    }
  };
  useEffect(() => {
    if (result && provider =='kakao') {
      getProfile();
    }
  }, [result, provider]);
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      setNickname(profile.nickname);
      await AsyncStorage.setItem("profile", profile.profileImageUrl);

      const res = await socialIdentifyLogin({
        provider: 'kakao',
        accessToken: result,
      } as SocialLoginParams);
      console.log(res);
      if (!res) {
        navigation.navigate('SocialSignUp1', {
          socialToken: result,
          provider: 'kakao',
        });
      }
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    const token = await NaverLogin.login();
    // setResult(JSON.stringify(token));
    console.log(token);
    console.log(token.successResponse?.accessToken);
    let socialToken = token.successResponse?.accessToken;
    const res = await socialIdentifyLogin({
      provider: 'naver',
      accessToken: socialToken,
    });
    if(!res){
      navigation.navigate('SocialSignUp1', {
        socialToken: socialToken,
        provider: 'naver',
      });
    }
    console.log("네이버 로그인 성공");
  };

  const signInWithGoogle = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const token = await GoogleSignin.signIn();
    let email = token.user.email;
    let idToken = token.idToken as string;
    const res = await socialIdentifyLogin({
      provider: 'google',
      accessToken: idToken,
      email
    });
    if(!res){
      navigation.navigate('SignUp2', {
        socialToken: idToken,
        provider: 'google',
        email,
        label: 'social'
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.label == "kakao") {
          signInWithKakao();
        } else if (props.label == "naver") {
          signInWithNaver();
        } else if (props.label == "google") {
          signInWithGoogle();
        }
      }}
    >
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
