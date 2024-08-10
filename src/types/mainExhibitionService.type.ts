export interface ExhibitionListResponse {
  exhibition_id: string;
  thumbnail_url: string;
}

// 위치 정보 인터페이스
interface Location {
  city: string;
  latitude: number;
  longitude: number;
  state: string;
  town: string;
}

// 사진 정보 인터페이스
export interface Photo {
  filter_id: string;
  gray_scale: number;
  photo_id: string;
  photo_url: string;
}

// 메인 데이터 인터페이스
export interface ExhibitionData {
  exhibition_id: string;
  author_name: string;
  is_liked?: boolean;
  photographer_name?: string;
  author_profile_url: string;
  date: string;
  description: string;
  location: Location;
  photos: Photo[];
  thumbnail_url: string;
  title: string;
}

export interface IComment {
  comment_id: string;
  name: string;
  date: string;
  profile_url: string;
  content: string;
  is_like: boolean;
}
