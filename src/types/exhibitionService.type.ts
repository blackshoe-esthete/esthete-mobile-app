export interface FilterPhoto {
  gray_scale: number;
  filter_id: string;
}

export interface TagList {
  tag_list: string[];
}

export interface ExhibitionInformation {
  title: string;
  description: string;
  tag_list: TagList;
}

export interface ExhibitionLocation {
  format_address?: string;
  longitude: number;
  latitude: number;
  state: string;
  city: string;
  town: string;
}

export interface ExhibitionRequest {
  filter_photo_list: {
    filter_photos: FilterPhoto[];
  };
  exhibition_information: ExhibitionInformation;
  exhibition_location: ExhibitionLocation;
  tmp_exhibition_id: string;
}

export interface ExhibitionDetails {
  filterPhotos: string[];
  title: string;
  description: string;
  mood: string[];
  location: ExhibitionLocation;
  tmpExhibitionId?: string;
}

export interface ExhibitionDetailsStore {
  details: ExhibitionDetails;
  setDetails: (details: Partial<ExhibitionDetails>) => void;
}
