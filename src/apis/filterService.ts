import {AxiosError} from 'axios';
import {filterInstance} from './instance';
import {CreateFilterParams} from '@types/filterService.type';

// 썸네일 불러오기 (GET 테스트 해보려고)
export const getThumbnail = async (filterId: string) => {
  try {
    const response = await filterInstance.get(`/${filterId}/thumbnail`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTBkYjJlYi1mNGJjLTRmYTMtYWU0Ny04MzgxZWQwZGExYWIiLCJleHAiOjE3NDQ3OTAzMjR9.BE1cdu0zQxZi8hYuAsMACzJ9ZSXXgaC9789v4mqqHQU`,
      },
    });
    return response;
  } catch (error) {
    console.log('실패');
    throw error;
  }
};

// 필터 제작 (multipart/form-data)
export const createFilter = async ({url, token, thumbnail, representationImg, requestDto}: CreateFilterParams) => {
  const formData = new FormData();

  // 썸네일 파일 추가
  formData.append('thumbnail', {
    uri: thumbnail.uri,
    name: thumbnail.name,
    type: thumbnail.type,
  });

  // representation 이미지 파일 추가
  representationImg.forEach((img, index) => {
    formData.append('representation_img', {
      uri: img.uri,
      name: img.name,
      type: img.type,
    });
  });

  formData.append('requestDto', JSON.stringify(requestDto));

  // console.log('formData', formData);

  try {
    console.log('진입');
    const response = await filterInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      //   timeout: 5000, // 타임아웃을 5초로 설정
    });

    console.log('성공', response.data);
    // console.log('formData', formData);
    return response;
  } catch (error) {
    console.log('실패입니다');
    console.log('실패', (error as AxiosError)?.config?.data._parts);
    throw error;
  }
};
