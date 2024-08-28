import axios, {AxiosError} from 'axios';
import {mygalleryInstance, userInstance} from './instance';
import {exhibitionServiceToken} from '@utils/dummy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './login';

export const getMyFollowing = async () => {
  try {
    const userToken = await getToken();
    const response = await mygalleryInstance.get(`/followings`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
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

export const getMyFollower = async () => {
  try {
    const userToken = await getToken();
    const response = await mygalleryInstance.get(`/followers`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
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
    const token = AsyncStorage.getItem('token');
    console.log(token);
    const response = await mygalleryInstance.get(`/authors`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
        // Authorization: `Bearer ${token}`
      },
    });
    if (response.data.code == 200) {
      console.log(response.data.message);
    }
    console.log(response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

export const putMyProfile = async (image: string) => {
  try {
    if (!image) {
      console.error("Image URI is empty.");
      return;
    }
    const formData = new FormData();
    formData.append('file', {
      uri: image as string,
      name: `image{${Date.now()}}.jpg`,
      type: 'image/jpg',
    });
    // formData.append('file', image);
    const userToken = await getToken();
    const response = await mygalleryInstance.put(`/edit/user/profile/img`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
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
    const userToken = await getToken();
    const response = await mygalleryInstance.put(`/edit/user/profile/infos`, info, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if(response.status == 200){
      console.log('프로필이 정상적으로 수정됐습니다.');
    }
    
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

//아이디 중복 체크
export const duplicateId = async (nickname: string) => {
  try{
    const userToken = await getToken();
    const response = await mygalleryInstance.get(`/check-nickname/${nickname}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    
    return response.data.is_success;
  } catch (error) {
    console.log('아이디 중복 확인 실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}