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
import unverified from '@assets/icons/unverified.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { Routes } from '@screens/Routes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useProfileStore } from '@store/profileEditStore';
import { duplicateId } from 'src/apis/userInfo';

type ProfileScreenNavigationProp = NativeStackScreenProps<Routes, 'ProfileEdit'>;
interface NavigationProps {
  navigation: ProfileScreenNavigationProp['navigation'];
  route: ProfileScreenNavigationProp['route'];
}
interface ImageProps {
  image: string;
};

interface Props extends NavigationProps, ImageProps {}

function Profile({navigation, route, image}: Props) {
  type info = {
    name?: string;
    introduce?: string;
    biography?: string;
    profile_url?: string;
  }
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<info>(['my-profile']);
  const profileSelect = () => {
    return (
      <View style={styles.profileBox}>
        {
          image ? (
            <Image source={{uri: image}} style={styles.profileCircle}/>
          ): (
            userInfo?.profile_url ? (
              <Image source={{uri: userInfo.profile_url?.startsWith('http') ? userInfo.profile_url : `https://${userInfo.profile_url}`}} style={styles.profileCircle} resizeMode='cover' />
            ): (
              <View style={styles.circle}/>
            )
          )
        }
        <TouchableOpacity onPress={()=>navigation.navigate('GetPhotoScreen')}>
          <View style={styles.cameraBox}>
            <Image source={camera} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const {nickname, intro, script, setNickname, setIntro, setScript} = useProfileStore();
  const getText = (newText: any) => {
    if(newText != nickname && newText.length > 0){
      setNickname(newText);
    }
  };
  const {data: checkNickname} = useQuery({
    queryKey: ['check-nickname', nickname],
    queryFn: () => duplicateId(nickname),
    enabled: !!nickname
  });
  
  const getIntro = (newIntro: any) => {
    if(newIntro != intro && newIntro.length > 0){
      setIntro(newIntro);
    }
  };

  const getScript = (newScript: any) => {
    if(newScript != script && newScript.length > 0){
      setScript(newScript);
    }
  }

  useEffect(() => {
    if (userInfo?.name && userInfo?.introduce && userInfo?.biography) {
      setNickname(userInfo.name);
      setIntro(userInfo.introduce);
      setScript(userInfo.biography);
    }
  }, [userInfo, setNickname, setIntro, setScript]);


  return (
    <View style={styles.container}>
      {profileSelect()}
      <InputBox
        onChange={getText}
        placeholder={userInfo?.name}
        height={70} 
        marginTop={30}
        value={nickname}
      />
      {checkNickname ? (
        <View style={styles.alertBox}>
          <Image source={verified} style={styles.alertIcon} />
          <Text style={styles.alertText}>사용 가능한 닉네임입니다.</Text>
        </View>
      ) : (
        <View style={styles.alertBox}>
          <View style={styles.cancelIcon}>
            <Image source={unverified} style={styles.alertIcon} />
          </View>
          <Text style={styles.alertText}>사용 불가능한 닉네임입니다.</Text>
        </View>
      )}
      <InputBox 
        placeholder={userInfo?.introduce}
        height={70}
        marginTop={21}
        onChange={getIntro}
        value={intro}
      />
      <InputBox 
        placeholder={userInfo?.biography}
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
  profileCircle: {
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
    alignItems: 'center',
  }
});
