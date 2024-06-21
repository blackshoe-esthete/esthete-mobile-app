export type FilterType =
  | 'sharpeness'
  | 'exposure'
  | 'brightness'
  | 'contrast'
  | 'saturation'
  | 'hue'
  | 'temperature'
  | 'grayscale';

export type FilterValue = Partial<Record<FilterType, number>> & {
  grayscale?: number;
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
export type FilterTagType = '따뜻한' | '부드러운' | '평화로운' | '차가운' | '빈티지한' | '몽환적인' | '싱그러운';
