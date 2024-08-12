import {AxiosError} from 'axios';
import {filterInstance, mygalleryInstance} from './instance';
import {exhibitionServiceToken, filterServiceToken, mygalleryToken} from '@utils/dummy';

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
  try {
    const response = await filterInstance.get(`/created`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });

    return response.data.payload.created_filter_list;
  } catch (error) {
    console.log('내가 만든 필터 실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 좋아요한 전시회 조회
//토큰 필수
export const myLikeExhibition = async () => {
  try {
    const response = await mygalleryInstance.get(`/exhibitions/likes`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });

    return response.data.payload;
  } catch (error) {
    console.log('좋아요한 전시회 실패: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 좋아요한 필터 조회
//토큰 필수
export const myLikeFilter = async () => {
  try {
    const response = await filterInstance.get(`/like`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });

    return response.data.content;
  } catch (error) {
    console.log('좋아요한 필터조회 실패: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 임시저장한 전시 조회
export const myTempExhibition = async () => {
  try {
    const response = await mygalleryInstance.get(`/temp-exhibitions`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.data.code == 200) {
      console.log(response.data.message);
    }
    return response.data.payload;
  } catch (error) {
    console.log('임시저장한 전시조회 실패: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 임시저장한 전시 id로 불러오기
export const myTempExhibitionDetails = async (temp_exhibitions_id: string) => {
  try {
    const response = await mygalleryInstance.get(`/temp-exhibitions/${temp_exhibitions_id}`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.data.code == 200) {
      console.log(response.data.message);
    }
    return response.data.payload;
  } catch (error) {
    console.log('임시저장한 전시조회 실패!: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 임시저장한 필터 조회
export const myTempFilter = async () => {
  try {
    const response = await filterInstance.get(`/temporary`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.status == 200) {
      console.log('임시저장된 토큰이 조회되었습니다.');
    }
    return response.data.content;
  } catch (error) {
    console.log('임시저장한 필터 조회 실패: ', (error as AxiosError).config);
    throw error;
  }
};

//내가 구매한 필터
export const myPurchasedFilter = async () => {
  try {
    const response = await filterInstance.get(`/purchased`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.status == 200) {
      console.log('구매한 필터내역이 조회되었습니다.');
    }
    return response.data.payload;
  } catch (error) {
    console.log('구매한 필터내역 조회 실패: ', (error as AxiosError).config);
    throw error;
  }
};
