// src/hooks/useExhibitionDetails.ts
import {useQuery, UseMutationResult, useMutation, UseMutationOptions} from '@tanstack/react-query';
import {
  getExhibitionDetails,
  getExhibitionComments,
  postExhibitionCommentLike,
  postExhibitionComment,
  postExhibitionCommentDislike,
} from '../apis/exhibitionShow';
import {AxiosError, AxiosResponse} from 'axios';

export const useExhibitionDetails = (id: string) => {
  return useQuery({
    queryKey: ['exhibitionDetails', id],
    queryFn: () => getExhibitionDetails(id),
  });
};

export const useExhibitionComments = (id: string) => {
  return useQuery({
    queryKey: ['exhibitionComments', id],
    queryFn: () => getExhibitionComments(id),
  });
};

interface PostCommentParams {
  exhibitionId: string;
  content: string;
}

export const usePostComment = (): UseMutationResult<AxiosResponse<any>, AxiosError, PostCommentParams> => {
  return useMutation<AxiosResponse<any>, AxiosError, PostCommentParams>({
    mutationFn: postExhibitionComment,
  });
};

interface PostCommentLikeParams {
  commentId: string;
}

export const useLikeComment = (): UseMutationResult<AxiosResponse<any>, AxiosError, PostCommentLikeParams> => {
  return useMutation<AxiosResponse<any>, AxiosError, PostCommentLikeParams>({
    mutationFn: postExhibitionCommentLike,
  });
};

export const useDislikeComment = (): UseMutationResult<AxiosResponse<any>, AxiosError, PostCommentLikeParams> => {
  return useMutation<AxiosResponse<any>, AxiosError, PostCommentLikeParams>({
    mutationFn: postExhibitionCommentDislike,
  });
};
