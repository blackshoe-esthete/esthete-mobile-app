import {AxiosError} from 'axios';
import {exhibitionInstance, filterInstance} from './instance';

export const getPurchasedFilters = async (token: string | undefined) => {
  try {
    const url = '/purchased';

    const response = await filterInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.purchased_filter_list;
  } catch (error) {
    console.error('Error fetching purchased filters', (error as AxiosError)?.response?.data);
    throw error;
  }
};

export const getCreatedFilters = async (token: string | undefined) => {
  try {
    const url = '/created';

    const response = await filterInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Created filters', (error as AxiosError)?.response?.data);
    throw error;
  }
};

export const getFilterDetails = async (filterId: string, authToken: string) => {
  if (filterId === '0') {
    return;
  }
  const url = `/${filterId}/details`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
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
export const saveOrUpdateExhibition = async ({token, formData}: FinalizeExhibitionParams) => {
  try {
    const url = '/addition/temporary_exhibition';

    const response = await exhibitionInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    return response;
  } catch (error) {
    console.error('Error finalizing exhibition', (error as AxiosError)?.response?.data);
    console.log(error);
    throw error;
  }
};
