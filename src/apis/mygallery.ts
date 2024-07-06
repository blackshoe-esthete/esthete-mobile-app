import {AxiosError} from 'axios';
import {filterInstance, mygalleryInstance} from './instance';
import { filterServiceToken, mygalleryToken } from '@utils/dummy';

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
    // if(response.data){
    //   console.log(response.data.payload.created_filter_list[0][0]);
    // }

    return response.data.payload.created_filter_list;
  }catch(error){
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 좋아요한 전시회 조회
//토큰 필수
// export const myLikeExhibition = async () => {
//   try{
//     const response = await mygalleryInstance.get(`/likes`, {
//       headers: {
//         Authorization: `Bearer ${mygalleryToken}`
//       }
//     });

//     return response.data.payload;
//   }catch(error){
//     console.log('실패 데이터: ', (error as AxiosError).config);
//     throw error;
//   }
// }
