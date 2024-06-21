export interface getExhibitionClusterParams {
  latitude: number;
  longitude: number;
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
