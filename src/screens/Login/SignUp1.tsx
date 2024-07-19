import InputText from '@components/LoginScreen/InputText';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '@components/SettingScreen/CommonButton';
import {useNavigation} from '@react-navigation/native';
import Verification from '@components/LoginScreen/Verification';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function SignUp1() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [contentLoaded, setContentLoaded] = useState(false);
  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <ScrollView
        style={styles.scrollContainer}
        onContentSizeChange={() => {
          if (contentLoaded) {
            scrollViewRef.current?.scrollToEnd();
          } else {
            setContentLoaded(true);
          }
        }}
        ref={scrollViewRef}>
        <Text style={styles.header}>ESTHETE</Text>
        <View style={styles.inputLayer}>
          <View style={styles.numberLayer}>
            <TextInput
              style={[styles.numberInput, {backgroundColor: '#292929', fontSize: 16, color: 'white', height: 50}]}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#E9E9E9"
            />
            {!send ? (
              <SendButton
                label="인증번호 전송"
                style={{
                  backgroundColor: '#FFD600',
                  color: 'black',
                }}
                onPress={() => setSend(true)}
              />
            ) : (
              <SendButton label="전송 완료" pressable={false} />
            )}
          </View>

          <View style={styles.numberLayer}>
            <TextInput style={styles.numberInput} />
            <SendButton label="인증번호 확인" pressable={!send} />
          </View>
          <Verification label="인증번호" />
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
          <Verification label="비밀번호" />
        </View>
      </ScrollView>
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

type sendProps = {
  label?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
  };
  pressable?: boolean;
  onPress?: () => void;
};
const SendButton = ({label, style = {}, pressable, onPress}: sendProps) => {
  return (
    <TouchableOpacity disabled={pressable || false} onPress={onPress}>
      <View style={[styles.buttonBox, {backgroundColor: style?.backgroundColor || '#292929'}]}>
        <Text style={[styles.buttonText, {color: style?.color || 'white'}]}>{label}</Text>
      </View>
    </TouchableOpacity>
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
  scrollContainer: {
    // width: '100%',
    height: windowHeight,
    marginBottom: 140,
    paddingBottom: 60,
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
    paddingHorizontal: 20,
    color: 'white',
  },
  buttonBox: {
    // backgroundColor: '#292929',
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
});
