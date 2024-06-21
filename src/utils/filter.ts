import {Filter, FilterTagType, Matrix} from '@types/filterService.type';
import {Platform} from 'react-native';

// =============================================================================
// 필터 리스트
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

// =============================================================================
// 필터 태그 리스트
export const filterTagsData: {name: FilterTagType; id: string}[] = [
  {name: '따뜻한', id: 'd20e2654-3c4a-4ebe-b1c9-5695ac2a6207'},
  {name: '부드러운', id: 'fe96c294-b5f3-425e-a6de-8cc1b13beb5a'},
  {name: '평화로운', id: '118ccbfb-8caf-498b-913a-16a315b3a859'},
  {name: '차가운', id: '4a0db2eb-f4bc-4fa3-ae47-8381ed0da1ab'},
  {name: '빈티지한', id: 'ae4a3cee-f7e3-48a1-8b0a-eb4d177b2267'},
  {name: '몽환적인', id: '3e3f2d48-7e19-4d53-bf91-776d5b0915e3'},
  {name: '싱그러운', id: '7d2b1c46-3f2d-45c1-a6a8-392d2b9b48b6'},
];

// filter name을 id로 변환하는 함수
export const filterNameToId = (name: FilterTagType): string => {
  const filter = filterTagsData.find(tag => tag.name === name);
  return filter ? filter.id : '';
};
