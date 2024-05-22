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
  url: string;
  token: string;
  thumbnail: FileData;
  representationImg: FileData[] | [];
  requestDto: RequestDto;
}

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
