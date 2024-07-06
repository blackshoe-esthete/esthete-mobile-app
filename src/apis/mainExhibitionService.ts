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
    const response = await exhibitionInstance.get(`/isolation`);
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};

// 전시 검색
export const searchExhibition = async (keyword: string) => {
  try {
    const response = await exhibitionInstance.get(`/searching/title?exhibitionKeyword=${keyword}&page=0&size=10`);
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};

// 작가 검색
export const searchAuthor = async (keyword: string) => {
  try {
    const response = await exhibitionInstance.get(`/searching/author?authorKeyword=${keyword}&page=0&size=10`);
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};

// 태그 선택 전시회 조회
export const getTagExhibitionList = async (tag: string) => {
  try {
    const response = await exhibitionInstance.get(`/${tag}`, {
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

// 전시회 상세 정보 조회 (/details/{exhibitionId})
export const getExhibitionDetail = async (exhibitionId: string) => {
  try {
    const response = await exhibitionInstance.get(`/details/${exhibitionId}`);
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};
