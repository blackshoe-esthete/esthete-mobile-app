export type FilterType =
  | 'sharpness'
  | 'exposure'
  | 'brightness'
  | 'contrast'
  | 'saturation'
  | 'hue'
  | 'temperature'
  | 'gray_scale';

export type FilterValue = Partial<Record<FilterType, number>> & {
  gray_scale?: number;
};

// 필터 생성 시 필요한 데이터
export interface FileData {
  uri: string;
  name: string;
  type: string;
}

export interface TagList {
  tags: string[];
}

export interface FilterInformation {
  name: string;
  description: string;
  tag_list: TagList;
}

export interface RequestDto {
  filter_attribute: FilterValue;
  gray_scale: number;
  filter_information: FilterInformation;
  tmp_filter_id: string;
}

export interface CreateFilterParams {
  url: '' | '/temporary_filter';
  token: string;
  thumbnail: FileData;
  representationImg: FileData[] | [];
  requestDto: RequestDto;
}

export interface CreateFilterResponse {
  filter_id: string;
  created_at: string;
}

// 필터 기본 정보
export type Filter = {
  type: FilterType;
  label: string;
  min: number;
  max: number;
  default: number;
  step: number;
  marginHorizontal?: {marginLeft?: number; marginRight?: number};
};

// 필터 매트릭스
export type Matrix = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

// 필터 태그
export type FilterTagType =
  | '따뜻한'
  | '부드러운'
  | '평화로운'
  | '차가운'
  | '빈티지한'
  | '몽환적인'
  | '싱그러운'
  | '세련된'
  | '자연스러운'
  | '클래식한'
  | '쾌활한'
  | '우아한'
  | '잔잔한'
  | '풍요로운'
  | '짙은'
  | '화사한'
  | '모던한'
  | '수수한'
  | '사랑스러운'
  | '캐주얼한'
  | '자유분방한'
  | '다채로운'
  | '차분한'
  | '신비로운'
  | '순수한'
  | '고요한'
  | '고급스러운';

// 필터 태그 리스트
interface FilterAttributes {
  filter_id: string;
  brightness: number;
  sharpness: number;
  exposure: number;
  contrast: number;
  saturation: number;
  hue: number;
  temperature: number;
  gray_scale: number;
}

// 필터 이미지 리스트
interface RepresentationImgList {
  representation_img_list: string[];
}

//
interface FilterTagList {
  filter_tag_list: FilterTagType[];
}

export interface TemporaryFilter {
  temporary_filter_id: string;
  filter_thumbnail: string;
  filter_attributes: FilterAttributes;
  representation_img_list: RepresentationImgList;
  filter_tag_list: FilterTagList;
  updated_at: string;
  filter_name: string;
  description: string;
}
