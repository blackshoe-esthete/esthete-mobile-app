import {AxiosError, AxiosResponse} from 'axios';
import {exhibitionInstance, mygalleryInstance} from './instance';
import Config from 'react-native-config';
import {useMutation} from '@tanstack/react-query';
import { getToken } from './login';

const apiToken = Config.API_TOKEN;

export const getExhibitionDetails = async (id: string) => {
  const userToken = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  const response = await exhibitionInstance.get(`/details/${id}`, {headers});

  return response.data.payload;
};

export const getExhibitionComments = async (id: string) => {
  const response = await exhibitionInstance.get(`/comments/${id}`);
  return response.data.payload;
};

interface ReportPhotoParams {
  photo_id: string;
  report_type: string;
  report_description: string;
}

export const reportPhoto = async ({
  photo_id,
  report_type,
  report_description,
}: ReportPhotoParams): Promise<AxiosResponse<any>> => {
  const data = {
    photo_id,
    report_type,
    report_description,
  };

  const userToken = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  const response = await exhibitionInstance.post('/photos/report', data, {headers});
  return response.data;
};

export const useReportPhoto = () => {
  return useMutation({
    mutationFn: reportPhoto,
    onSuccess: data => {
      // 성공 시 처리 로직
      console.log('Photo reported successfully:', data);
    },
    onError: error => {
      // 에러 처리 로직
      console.error('Error reporting photo:', error);
    },
  });
};

interface ReportCommentsParams {
  comment_id: string;
  report_type: string;
  report_description: string;
}

export const reportComment = async ({
  comment_id,
  report_type,
  report_description,
}: ReportCommentsParams): Promise<AxiosResponse<any>> => {
  const data = {
    comment_id,
    report_type,
    report_description,
  };

  const userToken = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  const response = await exhibitionInstance.post('/comments/report', data, {headers});
  return response.data;
};

export const useReportComment = () => {
  return useMutation({
    mutationFn: reportComment,
    onSuccess: data => {
      // 성공 시 처리 로직
      console.log('Comment reported successfully:', data);
    },
    onError: error => {
      // 에러 처리 로직
      console.error('Error reporting comment:', error);
    },
  });
};

interface PostCommentParams {
  exhibitionId: string;
  content: string;
}

export const postExhibitionComment = async ({
  exhibitionId,
  content,
}: PostCommentParams): Promise<AxiosResponse<any>> => {
  const data = {
    exhibitionId,
    content,
  };

  const userToken = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  const response = await exhibitionInstance.post(`/comments`, data, {headers});

  return response.data.payload;
};

interface PostCommentLikeParams {
  commentId: string;
}

export const postExhibitionCommentLike = async ({commentId}: PostCommentLikeParams): Promise<AxiosResponse<any>> => {
  const userToken = await getToken();
  const response = await exhibitionInstance.post(
    `/comments/like/${commentId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return response.data.payload;
};

export const postExhibitionCommentDislike = async ({commentId}: PostCommentLikeParams): Promise<AxiosResponse<any>> => {
  const userToken = await getToken();
  const response = await exhibitionInstance.delete(`/comments/like/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data.payload;
};

//전시 좋아요
interface PostExhibitionLikeParams {
  exhibition_id: string;
}

export const postExhibitionLike = async ({exhibition_id}: PostExhibitionLikeParams): Promise<AxiosResponse<any>> => {
  const userToken = await getToken();
  const response = await mygalleryInstance.post(
    `/exhibitions/likes/${exhibition_id}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return response.data.payload;
};

export const postExhibitionDislike = async ({exhibition_id}: PostExhibitionLikeParams): Promise<AxiosResponse<any>> => {
  const userToken = await getToken();
  const response = await mygalleryInstance.delete(`/exhibitions/likes/${exhibition_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data.payload;
};

// 모든 전시 불러오기
export const getAllExhibition = async (keyword: string) => {
  try {
    const response = await exhibitionInstance.get(`/searching/title?exhibitionKeyword=${keyword}&page=0&size=100`);
    return response.data.payload;
  } catch (error) {
    console.log('실패 데이터: ', error);
    throw error;
  }
};
