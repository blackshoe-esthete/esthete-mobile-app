import {useQuery} from '@tanstack/react-query';
import {Cluster} from '@types/mapService.type';
import {getExhibitionCluster, getExhibitionList} from 'src/apis/mapService';

export const useExhibitionCluster = (latitude: number, longitude: number, radius: number, group: string) => {
  return useQuery({
    queryKey: ['exhibitionCluster', {latitude, longitude, radius, group}],
    queryFn: () => getExhibitionCluster({latitude, longitude, radius, group}),
  });
};

export const useNearbyExhibitions = (cluster: Cluster | null) => {
  return useQuery({
    queryKey: [
      'clickedClusterExhibitionList',
      {
        state: cluster?.state || '',
        city: cluster?.city || '',
        town: cluster?.town || '',
        page: 0,
        size: 10,
        sort: 'trending',
      },
    ],
    queryFn: () =>
      getExhibitionList({
        state: cluster?.state || '',
        city: cluster?.city || '',
        town: cluster?.town || '',
        page: 0,
        size: 10,
        sort: 'trending',
      }),
    enabled: !!cluster,
  });
};
