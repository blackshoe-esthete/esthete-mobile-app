import {Platform} from 'react-native';

type FilterType =
  | 'sharpen'
  | 'exposure'
  | 'brightness'
  | 'contrast'
  | 'saturate'
  | 'hueRotate'
  | 'temperature'
  | 'grayscale';

type Filter = {
  type: FilterType;
  label: string;
  min: number;
  max: number;
  marginHorizontal?: {marginLeft?: number; marginRight?: number};
};

export const filters: Filter[] = [
  {
    type: 'sharpen',
    label: '선명도',
    min: -1,
    max: 1,
    marginHorizontal: {marginLeft: 20},
  },
  {
    type: 'exposure',
    label: '노출',
    min: 0.3,
    max: 2,
  },
  {
    type: 'brightness',
    label: '밝기',
    min: 0,
    max: 0.5,
  },
  {
    type: 'contrast',
    label: '대비',
    min: 0.3,
    max: 2,
  },
  {
    type: 'saturate',
    label: '채도',
    min: 0,
    max: 3,
  },
  {
    type: 'hueRotate',
    label: '색조',
    min: 0,
    max: 6,
  },
  {
    type: 'temperature',
    label: '온도',
    min: -0.3,
    max: 0.3,
  },
  {
    type: 'grayscale',
    label: '흑백',
    min: 0,
    max: 1,
    marginHorizontal: {marginRight: 20},
  },
];

const bias = Platform.OS === 'ios' ? 1 : 255;

type Matrix = [
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

export const brightness = (v = 1): Matrix => {
  // v 값의 범위를 0에서 2 사이로 제한
  v = Math.max(0, Math.min(2, v));

  const n = v;

  return [1, 0, 0, 0, bias * n, 0, 1, 0, 0, bias * n, 0, 0, 1, 0, bias * n, 0, 0, 0, 1, 0];
};
