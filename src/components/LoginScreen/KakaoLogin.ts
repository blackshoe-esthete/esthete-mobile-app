import React, { forwardRef, useState } from 'react';
import {Button, SafeAreaView} from 'react-native';
// import * as KakaoLogins from '@react-native-seoul/kakao-login';
import { login, logout, getProfile, KakaoOAuthToken, KakaoProfile, } from '@react-native-seoul/kakao-login';

// export const KakaoLogin = () => {
//   KakaoLogins
//     .login()
//     .then(result => {
//       console.log('Login Success', JSON.stringify(result));
//       // getProfile();
//     })
//     .catch(error => {
//       if (error.code === 'E_CANCELLED_OPERATION') {
//         console.log('Login Cancel', error.message);
//       } else {
//         console.log(`Login Fail(code:${error.code})`, error.message);
//       }
//     });
// };

// const getProfile = () => {
//   KakaoLogins
//     .getProfile()
//     .then(result => {
//       console.log('GetProfile Success', JSON.stringify(result));
//     })
//     .catch(error => {
//       console.log(`GetProfile Fail(code:${error.code})`, error.message);
//     });
// };


export const KakaoLogin = () => {
  const [result, setResult] = useState("");
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    setResult(JSON.stringify(token));
  };
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
    setResult(message);
  };  
  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getProfile();
    setResult(JSON.stringify(profile));
  };
}

