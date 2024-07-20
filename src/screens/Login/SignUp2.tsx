import InputText from '@components/LoginScreen/InputText';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import unverified from '@assets/icons/unverified.png';
import CommonButton from '@components/SettingScreen/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import GenderButton from '@components/LoginScreen/GenderButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const windowHeight = Dimensions.get('window').height;

function SignUp2() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState('');
  const [show, setShow] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const toggleDatePicker = () => {
    setShow(!show);
  };
  const onChange = ({type}: any, selectedDate: any) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS == 'android') {
        toggleDatePicker();
        setBirthDate(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmOnIos = () => {
    setBirthDate(formatDate(date));
    toggleDatePicker();
  };

  const formatDate = (rawDate: any) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month = month.length < 2 ? `0${month}` : month;
    day = day.length < 2 ? `0${day}` : day;
    return `${year}년 ${month}월 ${day}일`;
  };

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
          <InputText placeHolder="닉네임을 입력해주세요" />
          <Verification />
          <View style={styles.genderLayer}>
            <Text style={styles.genderText}>성별</Text>
            <View style={styles.genderButtonLayer}>
              <GenderButton title="여성" onPress={() => setGender('female')} value={gender == 'female'} />
              <GenderButton title="남성" onPress={() => setGender('male')} value={gender == 'male'} />
            </View>
          </View>
          <View style={styles.birthLayer}>
            <Text style={styles.genderText}>생년월일</Text>
            {show && (
              <RNDateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                textColor="white"
                locale="ko-KR"
                style={styles.datePicker} //reduce height and margin at the top
              />
            )}
            {show && Platform.OS == 'ios' && (
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={toggleDatePicker}>
                  <View style={[styles.buttonBox, {backgroundColor: '#E9E9E9'}]}>
                    <Text style={styles.buttonText}>취소</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmOnIos}>
                  <View style={[styles.buttonBox, {backgroundColor: '#FFD600'}]}>
                    <Text style={styles.buttonText}>확인</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {!show && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  style={styles.input}
                  value={birthDate}
                  onChangeText={setBirthDate}
                  placeholderTextColor="white"
                  placeholder="2024년 06월 22일"
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>

      <CommonButton
        title="다음"
        background="#292929"
        color="white"
        paddingNumber={0}
        func={() => navigation.navigate('LoginPage')}
      />
    </SafeAreaView>
  );
}

const Verification = () => {
  return (
    <View style={styles.alertBox}>
      <Image source={unverified} style={styles.alertIcon} />
      <Text style={styles.alertText}>사용불가능한 닉네임입니다.</Text>
    </View>
  );
};

export default SignUp2;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    height: windowHeight,
    marginBottom: 150,
    paddingBottom: 60,    
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
    height: 'auto',
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
  genderLayer: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  genderButtonLayer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    width: '100%',
    marginTop: 10,
  },
  birthLayer: {
    marginTop: 50,
    display: 'flex',
    width: '100%',
    height: 'auto',
  },
  input: {
    borderRadius: 8,
    width: '100%',
    height: 50,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 150,
    padding: 14,
    height: 50
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
