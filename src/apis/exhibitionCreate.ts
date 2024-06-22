import {AxiosError} from 'axios';
import {exhibitionInstance} from './instance';
import {ExhibitionDetails, ImageItem} from '../types/exhibitionService.type';

//임시저장 및 업데이트
export const saveOrUpdateExhibition = async ({token, exhibition_photo, exhibitionData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition/temporary_exhibition';

    const formData = new FormData();

    exhibition_photo.forEach((photo, index) => {
      formData.append(`exhibition_photo[${index}]`, photo);
    });

    formData.append(
      'requestDto',
      JSON.stringify({
        ...exhibitionData,
        tmp_exhibition_id: exhibitionData.tmp_exhibition_id,
      }),
    );

    const response = await exhibitionInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Exhibition saved or updated', response.data);
    return response;
  } catch (error) {
    console.error('Error finalizing exhibition', (error as AxiosError)?.response?.data);
    throw error;
  }
};

interface FinalizeExhibitionParams {
  token: string | undefined;
  exhibition_photo: ImageItem[];
  exhibitionData: ExhibitionDetails | any;
}

//전시 제작
export const finalizeExhibition = async ({token, exhibition_photo, exhibitionData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition';

    const formData = new FormData();

    exhibition_photo.forEach((photo, index) => {
      formData.append(`exhibition_photo[${index}]`, photo);
    });

    formData.append('requestDto', JSON.stringify(exhibitionData));
    console.log('exhibitionData', exhibitionData);
    console.log('exhibition_photo', exhibition_photo);
    const response = await exhibitionInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 이용한 인증
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Exhibition finalized', response.data);
    return response;
  } catch (error) {
    console.error('Error finalizing exhibition', (error as AxiosError)?.response?.data);

    throw error;
  }
};
