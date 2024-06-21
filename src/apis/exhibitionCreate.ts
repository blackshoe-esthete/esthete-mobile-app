import {AxiosError} from 'axios';
import {exhibitionInstance} from './instance';

//임시저장 및 업데이트
export const saveOrUpdateExhibition = async ({token, exhibitionData, isNew}) => {
  try {
    const url = '/addition/temporary_exhibition';
    const response = await exhibitionInstance.post(
      url,
      {
        ...exhibitionData,
        tmp_exhibition_id: isNew ? '' : exhibitionData.tmp_exhibition_id, // 새 전시면 빈 문자열, 업데이트면 기존 ID
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 이용한 인증
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Exhibition saved or updated', response.data);
    return response;
  } catch (error) {
    console.error('Error saving or updating exhibition', (error as AxiosError)?.response?.data);
    throw error;
  }
};

//전시 제작
export const finalizeExhibition = async ({token, exhibitionData}) => {
  try {
    const url = '/addition';
    const response = await exhibitionInstance.post(url, exhibitionData, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 이용한 인증
        'Content-Type': 'application/json',
      },
    });
    console.log('Exhibition finalized', response.data);
    return response;
  } catch (error) {
    console.error('Error finalizing exhibition', (error as AxiosError)?.response?.data);
    throw error;
  }
};
