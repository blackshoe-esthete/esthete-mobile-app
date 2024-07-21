import axios, {AxiosError} from 'axios';
import {mygalleryInstance, userInstance} from './instance';
import {exhibitionServiceToken} from '@utils/dummy';
import AsyncStorage from '@react-native-async-storage/async-storage';

type loginProp = {
  id: string;
  pwd: string;
}

// 로그인
export const login = async ({id, pwd}: loginProp) => {
  try{
    const response = await userInstance.post(`/login`, {
      username: id,
      password: pwd
    });
    if(response.status == 200){
      console.log("성공적으로 로그인이 됐습니다.");
    }

    const authorizationHeader = response.headers['authorization'];
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      await AsyncStorage.setItem('token', token);
      console.log('Token:', token);
    } else {
      console.log('Authorization 헤더가 없습니다.');
    };
  }catch(error) {
    console.log('로그인 실패 데이터: ', (error as AxiosError).config);
    if ((error as AxiosError).response?.status === 401) {
      await refreshToken();
    } else {
      throw error;
    }
  }
}

//refresh 토큰 재발급
export const refreshToken = async () => {
  try{
    const response = await userInstance.post(`/reissue`, {});
    if(response.status == 200){
      console.log("refresh token이 재발급됐습니다.");
    }

    const authorizationHeader = response.headers['authorization'];
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      await AsyncStorage.setItem('token', token);
      console.log('Token:', token);
    } else {
      console.log('Authorization 헤더가 없습니다.');
    };
  }catch(error) {
    console.log('리프레시 토큰 재발급 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//이메일 인증번호 전송
export const emailValidation = async (email: string) => {
  try{
    const response = await userInstance.post(`/signup/email/validation`, {
      email: email
    });
    if(response.status == 200){
      console.log("인증번호가 성공적으로 전달되었습니다.");
    }
    
    return response.data;
  }catch(error) {
    console.log('이메일 검증 실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}

type verifyProp = {
  email: string;
  number: string;
}
//인증번호 검사
export const emailVerification = async ({email, number}: verifyProp) => {
  try{
    const response = await userInstance.post(`/signup/email/verification`, {
      email: email,
      auth_num: number
    });
    if(response.status == 200){
      console.log('인증번호 확인이 되었습니다.');
    }
    return response.data;
  }catch(error) {
    console.log('이메일 인증 전송 실패: ', (error as AxiosError).config);
    throw error;
  }
}

export const getMyFollowing = async () => {
  try {
    const response = await mygalleryInstance.get(`/followings`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    // if(response.data.code == 200){
    //   console.log(response.data.message);
    // }

    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

type signupProp = {
  email: string;
  password: string;
}
// 사용자 이메일, 비밀번호 회원가입
export const signUpNext = async ({email, password}: signupProp) => {
  try{
    const response = await userInstance.post(`/signup/next`, {
      email: email,
      password: password
    });
    if(response.status == 200){
      console.log('회원가입 절차가 무사히 진행되었습니다.');
    }
    return response.data.payload;
  }catch (error) {
    console.log('회원가입1 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//이미 존재하는 사용자인지 확인
export const userCheck = async (email: string) => {
  try{
    const response = await userInstance.put(`/id/check`, {
      email
    });
    return response.data;
  }catch (error) {
    console.log('이미 존재하는 사용자인지 조회하기 실패: ', (error as AxiosError).config);
    throw error;
  }
}

type completeProp = {
  user_id: string;
  nickname: string;
  gender: string;
  birthday: string;
};

//회원가입 마무리
export const signupCompletion = async ({user_id, nickname, gender, birthday}: completeProp) => {
  try{
    const response = await userInstance.post(`/signup/completion`, {
      user_id,
      nickname,
      gender,
      birthday
    });
    if(response.status == 200){
      console.log("정상적으로 회원가입이 되었습니다.");
    }
    return response.data.payload;
  }catch (error) {
    console.log('회원가입 마무리 실패: ', (error as AxiosError).config);
    throw error;
  }
}

export const getMyFollower = async () => {
  try {
    const response = await mygalleryInstance.get(`/followers`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if(response.data.code == 200){
      console.log(response.data.message);
    }

    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

export const getMyInfo = async () => {
  try {
    const response = await mygalleryInstance.get(`/authors`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.data.code == 200) {
      console.log(response.data.message);
    }
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

export const putMyProfile = async (image: string) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: image as string,
      name: `image{${Date.now()}}.jpg`,
      type: 'image/jpg',
    });
    // formData.append('file', image);
    const response = await mygalleryInstance.put(`/edit/user/profile/img`, formData, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.code == 200) {
      console.log(response.data.message);
    }

    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

type profileInfo = {
  user_name: string;
  user_introduce: string;
  user_biography: string;
};

export const putMyAdditional = async (info: profileInfo) => {
  try {
    const response = await mygalleryInstance.put(`/edit/user/profile/infos`, info, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

type socialLoginProp = {
  provider: string;
  nickname?: string;
  email?: string;
  gender?: string;
  birthday?: string;
}

//소셜로그인
export const socialLogin = async (socialBody: socialLoginProp) => {
  try{
    const response = await userInstance.post(`/social-login`, {
      socialBody
    });

    if(response.status == 200){
      console.log('유저 id를 받아옵니다.');
    }

    return response.data.payload;
  }catch (error) {
    console.log('소셜로그인 실패: ', (error as AxiosError).config);
    throw error;
  }
}