export interface getExhibitionClusterParams {
  latitude: number | undefined;
  longitude: number | undefined;
  radius: number;
  group: string;
}

export interface getExhibitionListParams {
  state: string;
  city: string;
  town: string;
  page: number;
  size: number;
  sort: string;
}

export interface Cluster {
  state: string;
  city: string;
  town: string;
  thumbnail: string;
  count: number;
  location?: {
    lat: number;
    lng: number;
  };
}
