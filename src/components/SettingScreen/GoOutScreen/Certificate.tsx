import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Certificate() {
  return (
    <View style={style.container}>
      <View style={style.titleHeader}>
        <Text style={style.titleText}>탈퇴를 위한 인증을 해주세요</Text>
      </View>
      <TextInput
        placeholder="이메일을 입력해주세요"
        style={style.inputBox}
        placeholderTextColor="#E9E9E9"
      />
      <View style={style.submitBox}>
        <TextInput style={style.numberBox} />
        <TouchableOpacity>
          <View style={style.numberSubmit}>
            <Text style={style.buttonStyle}>인증번호 발송</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={style.alertText}>탈퇴 전 주의사항 ⚠️</Text>
      <Text style={style.description}>
        탈퇴 시 Esthete에 업로드 된 필터, 사진, 결제정보 등 모든 관련 데이터가
        삭제됩니다. 이 작업은 되돌릴 수 없으니 신중히 결정해주세요.
      </Text>
    </View>
  );
}

export default Certificate;

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  titleHeader: {
    height: 56,
    display: 'flex',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.32,
  },
  inputBox: {
    height: 70,
    backgroundColor: '#292929',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 20,
    color: 'white',
  },
  submitBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },
  numberBox: {
    width: 220,
    height: '100%',
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  numberSubmit: {
    width: 100,
    height: '100%',
    backgroundColor: '#292929',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.32,
  },
  alertText: {
    color: '#FFD600',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.36,
    marginTop: 50,
  },
  description: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.36,
  },
});
