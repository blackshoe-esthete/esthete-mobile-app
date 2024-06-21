import InputText from '@components/LoginScreen/InputText';
import {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import verified from '@assets/icons/verified.png';
import unverified from '@assets/icons/unverified.png';
import CommonButton from '@components/SettingScreen/CommonButton';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
function SignUp1() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <Text style={styles.header}>ESTHETE</Text>
      <View style={styles.inputLayer}>
        <InputText type="email-address" placeHolder="이메일을 입력해주세요" value={email} onChange={setEmail} />
        <View style={styles.numberLayer}>
          <TextInput style={styles.numberInput} />
          <SendButton />
        </View>
        <Verification />
        <InputText
          security={true}
          placeHolder="비밀번호를 입력해주세요"
          value={password}
          onChange={setPassword}
          margin={21}
        />
        <InputText
          security={true}
          placeHolder="비밀번호를 다시 입력해주세요"
          value={rePassword}
          onChange={setRePassword}
          margin={20}
        />
        <Verification />
      </View>
      <CommonButton
        title="다음"
        background="#292929"
        color="white"
        paddingNumber={0}
        func={() => navigation.navigate('SignUp2')}
      />
    </SafeAreaView>
  );
}

const SendButton = () => {
  return (
    <TouchableOpacity>
      <View style={styles.buttonBox}>
        <Text style={styles.buttonText}>인증번호 발송</Text>
      </View>
    </TouchableOpacity>
  );
};

const Verification = () => {
  return (
    <View style={styles.alertBox}>
      <Image source={unverified} style={styles.alertIcon} />
      <Text style={styles.alertText}>인증번호가 불일치합니다.</Text>
    </View>
  );
};

export default SignUp1;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontFamily: 'Gothic A1',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.48,
    marginTop: 50,
  },
  inputLayer: {
    marginTop: 75,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 60,
  },
  numberLayer: {
    marginTop: 10,
    width: '100%',
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberInput: {
    backgroundColor: '#424242',
    borderRadius: 8,
    width: ((windowWidth - 50) * 6) / 10,
  },
  buttonBox: {
    backgroundColor: '#292929',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: ((windowWidth - 50) * 4) / 10,
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.32,
  },
  alertBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    gap: 5,
  },
  alertIcon: {
    width: 15,
    height: 15,
  },
  alertText: {
    color: 'white',
    fontSize: 12,
    letterSpacing: -0.24,
    fontFamily: 'Gothic A1',
  },
});
