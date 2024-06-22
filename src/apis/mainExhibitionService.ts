import {exhibitionServiceToken} from '@utils/dummy';
import {exhibitionInstance} from './instance';

// 개인 추천 전시 리스트 반환
export const getMainExhibitionList = async () => {
  try {
    const response = await exhibitionInstance.get(`/recommend`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};

// 고립된 전시 리스트 반환
export const getIsolatedExhibitionList = async () => {
  try {
    const response = await exhibitionInstance.get(`/isolation`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};
