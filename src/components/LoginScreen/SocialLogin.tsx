import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  KakaoOAuthToken,
  login,
  getProfile as getKakaoProfile,
} from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NaverLogin from "@react-native-seoul/naver-login";
import Config from "react-native-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { socialIdentifyLogin } from "src/apis/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "@screens/Routes";

const windowWidth = Dimensions.get("window").width;
type socialProp = {
  img: string;
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
      console.log("카카오토큰",token.accessToken);
      setProvider('kakao');
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
      if (!res) {
        (navigation as any).navigate('SocialSignUp1', {
          socialToken: result,
          provider: 'kakao',
        });
      }else{
        (navigation as any).navigate('Main', { screen: 'Exhibitions'});
      }
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    const token = await NaverLogin.login();
    let socialToken = token.successResponse?.accessToken;
    console.log("네이버 토큰", socialToken);
    const res = await socialIdentifyLogin({
      provider: 'naver',
      accessToken: socialToken,
    });
    if(!res){
      (navigation as any).navigate('SocialSignUp1', {
        socialToken: socialToken,
        provider: 'naver',
      });
    }else{
      (navigation as any).navigate('Main', { screen: 'Exhibitions'});
    }
    console.log("네이버 로그인 성공");
  };

  const signInWithGoogle = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const token = await GoogleSignin.signIn();
    let email = token.user.email;
    let idToken = token.idToken as string;
    console.log("구글 토큰", idToken);
    const res = await socialIdentifyLogin({
      provider: 'google',
      accessToken: idToken,
      email
    });
    if(!res){
      (navigation as any).navigate('SignUp2', {
        socialToken: idToken,
        provider: 'google',
        email,
        label: 'social'
      });
    }else{
      (navigation as any).navigate('Main', { screen: 'Exhibitions'});
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
