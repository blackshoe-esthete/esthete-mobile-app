import axios, {AxiosError} from 'axios';
import {mygalleryInstance} from './instance';
import {exhibitionServiceToken} from '@utils/dummy';

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

export const getMyFollower = async () => {
  try {
    const response = await mygalleryInstance.get(`/followers`, {
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
