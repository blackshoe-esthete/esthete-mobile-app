import {AxiosError} from 'axios';
import {filterInstance, mygalleryInstance} from './instance';
import { exhibitionServiceToken, filterServiceToken, mygalleryToken } from '@utils/dummy';

type galleryProp = {
  token: string | undefined;
};

//내 전시회 조회 
//토큰만 넣고 보냄
export const mineExhibition = async () => {
  try {
    const response = await mygalleryInstance.get(`/exhibitions`, {
      headers: {
        Authorization: `Bearer ${mygalleryToken}`,
      },
    });
    
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 만든 필터 조회
//토큰 필수
export const mineFilter = async () => {
  try{
    const response = await filterInstance.get(`/created`, {
      headers: {
        Authorization: `Bearer ${filterServiceToken}`
      }
    });
    // if(response.status == 200){
    //   console.log("데이터가 성공적으로 조회됨");
    // }

    return response.data.payload.created_filter_list;
  }catch(error){
    console.log('내가 만든 필터 실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 좋아요한 전시회 조회
//토큰 필수
export const myLikeExhibition = async () => {
  try{
    const response = await mygalleryInstance.get(`/exhibitions/likes`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });

    return response.data.payload;
  }catch(error){
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 좋아요한 필터 조회
//토큰 필수


//내가 임시저장한 전시 조회
export const myTempExhibition = async() =>{
  try{
    const response = await mygalleryInstance.get(`/temp-exhibitions`, {
      headers: {
        Authorization: `Bearer ${filterServiceToken}`
      }
    })
    if(response.data.code == 200){
      console.log(response.data.message);
    }
    return response.data.payload;
  }catch(error){
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 임시저장한 필터 조회
//서버 끔
export const myTempFilter = async() => {
  try{
    const response = await filterInstance.get(`/temporary_filter`, {
      headers: {
        Authorization: `Bearer ${filterServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("임시저장된 토큰이 조회되었습니다.");
    }

    return response.data;
  }catch(error){
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}