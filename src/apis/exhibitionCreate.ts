import {AxiosError} from 'axios';
import {exhibitionInstance} from './instance';

//임시저장 및 업데이트
export const saveOrUpdateExhibition = async ({token, formData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition/temporary_exhibition';

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
  formData: any;
}

//전시 제작
export const finalizeExhibition = async ({token, formData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition';

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
    console.log(error);
    throw error;
  }
};
