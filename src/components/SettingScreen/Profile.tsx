import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import camera from '@assets/icons/camera.png';
import InputBox from './InputBox';
import {useEffect, useRef, useState} from 'react';
import verified from '@assets/icons/verified.png';
import cancel from '@assets/icons/cancel.png';

function Profile() {
  const profileSelect = () => {
    return (
      <View style={styles.profileBox}>
        <View style={styles.circle} />
        <TouchableOpacity>
          <View style={styles.cameraBox}>
            <Image source={camera} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const textState = useRef<TextInput>();
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [script, setScript] = useState('');
  const [enable, setEnable] = useState(false);
  const getText = (newText: any) => {
    setNickname(newText);
  };
  const getFocus = () => {
    const text = textState.current?.focus;
    console.log(text);
  };
  
  const getIntro = (newIntro: any) => {
    setIntro(newIntro);
  };

  const getScript = (newScript: any) => {
    setScript(newScript);
  }

  useEffect(() => {
    if (nickname === '') {
      setEnable(false);
    }else{
      setEnable(true);
    }
    // 중복확인
  });

  return (
    <View style={styles.container}>
      {profileSelect()}
      <InputBox
        onChange={getText}
        placeholder="기존 닉네임이 출력됩니다"
        height={70}
        ref={textState}
        marginTop={30}
        value={nickname}
       //ref가 중복된 닉네임인지 확인
      />
      {enable ? (
        <View style={styles.alertBox}>
          <Image source={verified} style={styles.alertIcon} />
          <Text style={styles.alertText}>사용 가능한 닉네임입니다.</Text>
        </View>
      ) : (
        <View style={styles.alertBox}>
          <View style={styles.cancelIcon}>
            <Image source={cancel} style={{width: 10, height: 10}} />
          </View>
          <Text style={styles.alertText}>사용 불가능한 닉네임입니다.</Text>
        </View>
      )}
      <InputBox 
        placeholder="기존 한줄소개가 출력됩니다"
        height={70}
        marginTop={21}
        onChange={getIntro}
        value={intro}
      />
      <InputBox 
        placeholder="주로 사용하는 카메라 기종, 컨셉 등을 추가로 입력하는 곳입니다"
        onChange={getScript}
        height={130}
        marginTop={10}
        value={script}
        multiline={true}
        paddingTop={28}
      />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    marginBottom: 60,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileBox: {
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: 20,
  },
  circle: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  cameraBox: {
    position: 'absolute',
    bottom: 0,
    right: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424242',
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  icon: {
    width: 22,
    height: 19,
  },
  alertBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  alertIcon: {
    width: 15,
    height: 15,
  },
  alertText: {
    color: 'white',
    fontSize: 12,
    letterSpacing: -0.24,
    fontWeight: '500',
    marginLeft: 5,
  },
  cancelIcon: {
    borderRadius: 100,
    backgroundColor: '#f00',
    width: 15,
    height: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
