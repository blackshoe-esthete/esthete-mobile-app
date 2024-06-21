import InputText from '@components/LoginScreen/InputText';
import LoginButton from '@components/LoginScreen/LoginButton';
import SocialLogin from '@components/LoginScreen/SocialLogin';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import naver from '@assets/imgs/naverlogin.png';
import kakao from '@assets/imgs/kakaologin.png';
import google from '@assets/imgs/googlelogin.png';

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>ESTHETE</Text>
        <InputText placeHolder="아이디를 입력해주세요" type="text" margin={20} />
        <InputText placeHolder="비밀번호를 입력해주세요" type="password" margin={20} />
        <View style={styles.buttonLayer}>
          <LoginButton color="#292929" title="로그인" navigation={() => navigation.goBack()} />
          <LoginButton color="#424242" title="회원가입" navigation={() => navigation.goBack()} />
        </View>
        <View style={styles.socialLayer}>
          <SocialLogin img={naver}/>
          <SocialLogin img={kakao}/>
          <SocialLogin img={google}/>
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
    gap: 20
  }
});
