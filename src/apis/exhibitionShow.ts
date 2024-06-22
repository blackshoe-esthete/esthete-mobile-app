import {AxiosError, AxiosResponse} from 'axios';
import {exhibitionInstance} from './instance';
import Config from 'react-native-config';

//const apiToken = Config.API_TOKEN;

export const getExhibitionDetails = async (id: string) => {
  const response = await exhibitionInstance.get(`/details/${id}`);
  return response.data.payload;
};

export const getExhibitionComments = async (id: string) => {
  const response = await exhibitionInstance.get(`/comments/${id}`);
  return response.data.payload;
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

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyM2U3YjJiNC1jMWFjLTQ1OTEtYmI3Zi1jNjcwNmRhZjIyYWEiLCJleHAiOjE3MjEwMzg1MDl9.tnRBqIdMlutauMAdSgoutnacHNVTk8qIA3RPftp4D1I';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await exhibitionInstance.post(`/comments`, data, {headers});

  return response.data.payload;
};

interface PostCommentLikeParams {
  commentId: string;
}

export const postExhibitionCommentLike = async ({commentId}: PostCommentLikeParams): Promise<AxiosResponse<any>> => {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyM2U3YjJiNC1jMWFjLTQ1OTEtYmI3Zi1jNjcwNmRhZjIyYWEiLCJleHAiOjE3MjEwMzg1MDl9.tnRBqIdMlutauMAdSgoutnacHNVTk8qIA3RPftp4D1I';

  const response = await exhibitionInstance.post(
    `/comments/like/${commentId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.payload;
};

export const postExhibitionCommentDislike = async ({commentId}: PostCommentLikeParams): Promise<AxiosResponse<any>> => {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyM2U3YjJiNC1jMWFjLTQ1OTEtYmI3Zi1jNjcwNmRhZjIyYWEiLCJleHAiOjE3MjEwMzg1MDl9.tnRBqIdMlutauMAdSgoutnacHNVTk8qIA3RPftp4D1I';

  const response = await exhibitionInstance.delete(`/comments/like/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.payload;
};
