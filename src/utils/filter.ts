import {Filter, Matrix} from '@types/filterService.type';
import {Platform} from 'react-native';

export const filters: Filter[] = [
  {
    type: 'sharpeness',
    label: '선명도',
    min: -1,
    max: 1,
    default: 0,
    step: 0.05,
    marginHorizontal: {marginLeft: 20},
  },
  {
    type: 'exposure',
    label: '노출',
    min: 0.3,
    max: 2,
    default: 1,
    step: 0.1,
  },
  {
    type: 'brightness',
    label: '밝기',
    min: 0,
    max: 0.5,
    default: 0,
    step: 0.025,
  },
  {
    type: 'contrast',
    label: '대비',
    min: 0.3,
    max: 2,
    default: 1,
    step: 0.1,
  },
  {
    type: 'saturation',
    label: '채도',
    min: 0,
    max: 3,
    default: 1,
    step: 0.05,
  },
  {
    type: 'hue',
    label: '색조',
    min: 0,
    max: 6,
    default: 0,
    step: 0.1,
  },
  {
    type: 'temperature',
    label: '온도',
    min: -0.3,
    max: 0.3,
    default: 0,
    step: 0.025,
  },
  {
    type: 'grayscale',
    label: '흑백',
    min: 0,
    max: 1,
    default: 0,
    step: 0.05,
    marginHorizontal: {marginRight: 20},
  },
];

// =============================================================================
// brightness 효과를 적용하는 함수
const bias = Platform.OS === 'ios' ? 1 : 255;

export const brightness = (v = 1): Matrix => {
  // v 값의 범위를 0에서 2 사이로 제한
  v = Math.max(0, Math.min(2, v));

  const n = v;

  return [1, 0, 0, 0, bias * n, 0, 1, 0, 0, bias * n, 0, 0, 1, 0, bias * n, 0, 0, 0, 1, 0];
};
