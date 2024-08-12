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
    console.log('내가 만든 전시회조회 실패: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 만든 필터 조회
//토큰 필수
export const mineFilter = async () => {
  try{
    const response = await filterInstance.get(`/created`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });

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
    console.log('좋아요한 전시회 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 좋아요한 필터 조회
//토큰 필수
export const myLikeFilter = async () => {
  try{
    const response = await filterInstance.get(`/like`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });

    return response.data.content;
  }catch(error){
    console.log('좋아요한 필터조회 실패: ', (error as AxiosError).config);
    throw error;
  }
}


//내가 임시저장한 전시 조회
export const myTempExhibition = async() =>{
  try{
    const response = await mygalleryInstance.get(`/temp-exhibitions`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    })
    if(response.data.code == 200){
      console.log(response.data.message);
    }
    return response.data.payload;
  }catch(error){
    console.log('임시저장한 전시조회 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 임시저장한 필터 조회
export const myTempFilter = async() => {
  try{
    const response = await filterInstance.get(`/temporary`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("임시저장된 토큰이 조회되었습니다.");      
    }
    return response.data.content;
  }catch(error){
    console.log('임시저장한 필터 조회 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//내가 구매한 필터
export const myPurchasedFilter = async() => {
  try{
    const response = await filterInstance.get(`/purchased`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("구매한 필터내역이 조회되었습니다.");      
    }
    return response.data.payload;
  }catch(error){
    console.log('구매한 필터내역 조회 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//사용자 전시회 선호 태그 조회
export const myExhibitionFilterPreferTag = async () => {
  try{ 
    const response = await mygalleryInstance.get(`/edit/user/tags`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("사용자 선호태그가 조회되었습니다.");
    }

    return response.data.payload.tag_list;
  }catch(error){
    console.log('사용자 선호 필터태그 조회 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//사용자 전시회 선호 태그 넣기
export const putMyExhibitionPreferTag = async (tag_list: string[]) => {
  try{
    console.log(tag_list);
    const response = await mygalleryInstance.put(`/edit/user/tags`, {
      tag_list
    }, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log('사용자 선호 태그가 정상적으로 선택됐습니다.');
    }

    return response.data.payload.tag_list;
  }catch(error){
    console.log('사용자 선호태그 넣기 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//사용자 필터 선호 태그 조회
export const myFilterPreferTag = async () => {
  try{
    const response = await filterInstance.get(`/tags`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("사용자 선호 태그가 성공적으로 조회됐습니다.");
    }
    
    return response.data.payload;
  }catch(error){
    console.log('사용자 선호태그 조회 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//(수정) 사용자 필터 선호 태그 리스트로 추가
export const putMyFilterPreferTag = async(tag_list: string[]) => {
  try{
    const response = await filterInstance.put(`/tags`, {
      tag_list
    }, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log('사용자 선호태그가 정상적으로 업로드됐습니다.');
    }
    return response.data.payload.tag_list;
  }catch(error){
    console.log('사용자 선호태그 넣기 실패: ', (error as AxiosError).config);
    throw error;
  }
}


//사용자 필터 선호 태그 추가
export const myFilterAddPreferTag = async (filterId: string) => {
  try{
    const response = await filterInstance.post(`/tags/${filterId}`, {}, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("사용자 선호 태그가 성공적으로 추가됐습니다.");
    }
    
    return response.data.payload;
  }catch(error){
    console.log('사용자 선호태그 추가 실패: ', (error as AxiosError).config);
    throw error;
  }
}

//사용자 필터 선호 태그 삭제
export const myFilterDeletePreferTag = async (filterId: string) => {
  try{
    const response = await filterInstance.delete(`/tags/${filterId}`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`
      }
    });
    if(response.status == 200){
      console.log("사용자 선호 태그가 성공적으로 삭제됐습니다.");
    }
    
    return response.data.payload;
  }catch(error){
    console.log('사용자 선호태그 삭제 실패: ', (error as AxiosError).config);
    throw error;
  }
}