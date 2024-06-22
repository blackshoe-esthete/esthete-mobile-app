// src/hooks/useExhibitionDetails.ts
import {useQuery} from '@tanstack/react-query';
import {getExhibitionDetails} from '../apis/exhibitionShow';

export const useExhibitionDetails = (id: string) => {
  return useQuery({
    queryKey: ['exhibitionDetails', id],
    queryFn: () => getExhibitionDetails(id),
  });
};
