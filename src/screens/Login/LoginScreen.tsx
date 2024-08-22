import InputText from '@components/LoginScreen/InputText';
import LoginButton from '@components/LoginScreen/LoginButton';
import SocialLogin from '@components/LoginScreen/SocialLogin';
import {useNavigation} from '@react-navigation/native';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import naver from '@assets/imgs/naverlogin.png';
import kakao from '@assets/imgs/kakaologin.png';
import google from '@assets/imgs/googlelogin.png';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
import { login } from 'src/apis/login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '@screens/Routes';

type Props = NativeStackScreenProps<Routes, 'LoginPage'>;
function LoginScreen({navigation, route}: Props) {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const mutationLogin = useMutation({
    mutationFn: () => login({id: id, pwd: pwd}),
    onSuccess(data){
      console.log(data);
      setId('');
      setPwd('');
      navigation.goBack();
    },
    onError(data){
      console.log(data);
      Alert.alert("로그인에 실패했습니다.");
    }
  });

  const handleLogin = () => {
    mutationLogin.mutate();
  }

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>ESTHETE</Text>
        <InputText placeHolder="아이디를 입력해주세요" margin={20} value={id} onChange={setId} />
        <InputText placeHolder="비밀번호를 입력해주세요" margin={20} security={true} value={pwd} onChange={setPwd} />
        <View style={styles.buttonLayer}>
          <LoginButton color="#292929" title="로그인" onPress={handleLogin} />
          <LoginButton color="#424242" title="회원가입" navigation={() => navigation.navigate('SignUp1')} />
        </View>
        <View style={styles.socialLayer}>
          <SocialLogin img={naver} label="naver" route={route} navigation={navigation}/>
          <SocialLogin img={kakao} label="kakao" route={route} navigation={navigation} />
          <SocialLogin img={google} label="google" route={route} navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '70%',
    borderWidth: 1,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  buttonLayer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialLayer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    gap: 20,
  },
});
