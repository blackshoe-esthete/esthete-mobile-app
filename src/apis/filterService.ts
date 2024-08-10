import { AxiosError } from 'axios';
import { filterInstance } from './instance';
import { CreateFilterParams, CreateFilterResponse } from '#types/filterService.type';
import { exhibitionServiceToken } from '@utils/dummy';
import { Alert } from 'react-native';

// 썸네일 불러오기 (GET 테스트 해보려고)
export const getThumbnail = async (filterId: string, token: string) => {
  try {
    const response = await filterInstance.get(`/${filterId}/thumbnail`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('실패');
    throw error;
  }
};

// 필터 제작 및 임시저장 (multipart/form-data)
export const createFilter = async ({
  url,
  token,
  thumbnail,
  representationImg,
  requestDto,
}: CreateFilterParams): Promise<CreateFilterResponse> => {
  const formData = new FormData();

  // 썸네일 파일 추가
  formData.append('thumbnail', {
    uri: thumbnail.uri,
    name: thumbnail.name,
    type: thumbnail.type,
  });

  // representation 이미지 파일 추가
  representationImg.forEach((img) => {
    formData.append('representation_img', {
      uri: img.uri,
      name: img.name,
      type: img.type,
    });
  });

  formData.append('requestDto', JSON.stringify(requestDto));

  // console.log('formData', formData);

  try {
    // console.log('진입');
    const response = await filterInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      //   timeout: 5000, // 타임아웃을 5초로 설정
    });

    // console.log('성공', response.data);
    // console.log('성공 데이터', response.config.data._parts);
    // console.log('formData', formData);
    return response.data;
  } catch (error) {
    Alert.alert(((error as AxiosError)?.response?.data as { error: string }).error);
    // console.error('실패 데이터', (error as AxiosError)?.config?.data._parts);
    // 에러코드에 따라 분기처리
    throw error;
  }
};

// 임시 필터 리스트 조회
export const getTemporaryFilterList = async (token: string) => {
  try {
    const response = await filterInstance.get('/temporary', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.content;
  } catch (error) {
    console.log('실패', (error as AxiosError)?.response?.data);
    throw error;
  }
};

// 임시 필터 삭제
export const deleteTemporaryFilter = async (filterId: string, token: string) => {
  try {
    const response = await filterInstance.delete(`/temporary/${filterId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert(((error as AxiosError)?.response?.data as { error: string }).error);
    // console.log('실패', (error as AxiosError)?.response?.data);
    throw error;
  }
};

//필터조회
export const filterSearch = async () => {
  try {
    const response = await filterInstance.get('/searching', {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.status == 200) {
      console.log('필터 searching 조회에 성공했습니다.');
    }

    return response.data.content;
  } catch (error) {
    console.log('필터조회실패', (error as AxiosError)?.response?.data);
    throw error;
  }
};

// 필터 id 세부 디테일 조회
export const indexFilterDetail = async (filterId: string) => {
  console.log('이 필터아이디는' + filterId);
  try {
    const response = await filterInstance.get(`/${filterId}/details`, {
      headers: {
        Authorization: `Bearer ${exhibitionServiceToken}`,
      },
    });
    if (response.status == 200) {
      console.log('개별 필터 상세조회에 성공했습니다.');
    }

    return response.data.payload;
  } catch (error) {
    console.log('개별 필터 상세조회 실패', (error as AxiosError)?.response?.data);
    throw error;
  }
};
