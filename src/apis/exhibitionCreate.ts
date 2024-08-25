import {AxiosError} from 'axios';
import {exhibitionInstance, filterInstance} from './instance';
import { getToken } from './login';

export const getPurchasedFilters = async () => {
  try {
    const url = '/purchased';
    const userToken = await getToken();
    const response = await filterInstance.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching purchased filters', (error as AxiosError)?.response?.data);
    throw error;
  }
};

export const getCreatedFilters = async () => {
  try {
    const url = '/created';
    const userToken = await getToken();
    const response = await filterInstance.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Created filters', (error as AxiosError)?.response?.data);
    throw error;
  }
};

export const getFilterDetails = async (filterId: string) => {
  if (filterId === '0') {
    return;
  }
  const url = `/${filterId}/details`;
  const userToken = await getToken();
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  try {
    const response = await filterInstance.get(url, {headers});

    return response.data;
  } catch (error) {
    console.error('Error fetching filter details:', error);
    throw error;
  }
};

//임시저장 및 업데이트
export const saveOrUpdateExhibition = async ({formData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition/temporary_exhibition';
    const userToken = await getToken();
    const response = await exhibitionInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Error finalizing exhibition', (error as AxiosError)?.response?.data);
    throw error;
  }
};

interface FinalizeExhibitionParams {
  token?: string | undefined;
  formData: any;
}

//전시 제작
export const finalizeExhibition = async ({formData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition';
    const userToken = await getToken();
    const response = await exhibitionInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`, // JWT 토큰을 이용한 인증
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error finalizing exhibition', (error as AxiosError)?.response?.data);
    console.log(error);
    throw error;
  }
};
