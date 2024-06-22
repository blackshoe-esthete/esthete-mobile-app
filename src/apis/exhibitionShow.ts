import {AxiosError} from 'axios';
import {exhibitionInstance} from './instance';

export const getExhibitionDetails = async (id: string) => {
  const response = await exhibitionInstance.get(`/details/${id}`);
  return response.data.payload;
};
