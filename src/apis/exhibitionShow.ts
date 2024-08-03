import {AxiosError, AxiosResponse} from 'axios';
import {exhibitionInstance} from './instance';
import Config from 'react-native-config';
import {useMutation} from '@tanstack/react-query';

const apiToken = Config.API_TOKEN;

export const getExhibitionDetails = async (id: string) => {
  const response = await exhibitionInstance.get(`/details/${id}`);
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

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiToken}`,
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

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiToken}`,
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

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiToken}`,
  };

  const response = await exhibitionInstance.post(`/comments`, data, {headers});

  return response.data.payload;
};

interface PostCommentLikeParams {
  commentId: string;
}

export const postExhibitionCommentLike = async ({commentId}: PostCommentLikeParams): Promise<AxiosResponse<any>> => {
  const response = await exhibitionInstance.post(
    `/comments/like/${commentId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    },
  );
  return response.data.payload;
};

export const postExhibitionCommentDislike = async ({commentId}: PostCommentLikeParams): Promise<AxiosResponse<any>> => {
  const response = await exhibitionInstance.delete(`/comments/like/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return response.data.payload;
};
