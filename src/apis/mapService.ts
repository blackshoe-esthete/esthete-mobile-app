import {AxiosError} from 'axios';
import {exhibitionInstance} from './instance';
import {getExhibitionClusterParams, getExhibitionListParams} from '@types/mapService.type';

// 사용자 현재위치 기준으로 특정 반경 안에 있는 전시 클러스터 반환
export const getExhibitionCluster = async ({latitude, longitude, radius, group}: getExhibitionClusterParams) => {
  try {
    const response = await exhibitionInstance.get(
      `/map/location/current?latitude=${latitude}&longitude=${longitude}&radius=${radius}&group=${group}`,
    );
    return response;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

// 특정 클러스터 안에 있는 전시 리스트 반환
export const getExhibitionList = async ({state, city, town, page, size, sort}: getExhibitionListParams) => {
  try {
    const response = await exhibitionInstance.get(
      `/map/location?state=${state}&city=${city}&town=${town}&page=${page}&size=${size}&sort=${sort}`,
    );
    return response;
  } catch (error) {
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};
