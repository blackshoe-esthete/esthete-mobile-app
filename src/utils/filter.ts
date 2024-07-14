import {Filter, FilterTagType, Matrix} from '@types/filterService.type';
import {Platform} from 'react-native';

// =============================================================================
// 필터 리스트
export const filters: Filter[] = [
  {
    type: 'sharpness',
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
    type: 'gray_scale',
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
  {name: '세련된', id: 'ae4a3cee-f7e3-48a1-8b0a-eb4d177b2267'},
  {name: '자연스러운', id: '1f479a8d-dab2-4d95-96c9-73d5f7382a01'},
  {name: '클래식한', id: '8969e7f1-2d1e-4a6d-b234-73c2aa7b24ff'},
  {name: '쾌활한', id: '9b11a16b-6786-4a28-8273-ff9e06b80318'},
  {name: '우아한', id: '35009d25-65e1-48da-800e-44be42bf3b4e'},
  {name: '잔잔한', id: '775f2020-070f-4ba1-b601-b456b4a8c165'},
  {name: '풍요로운', id: '5b3a7d95-529d-42a4-a9eb-9e3fd3c42933'},
  {name: '짙은', id: 'e8e34cc1-27e1-4875-b474-90c3c1c2a7bb'},
  {name: '화사한', id: 'f9abf63a-bfd3-4960-840e-45841a1c50d3'},
  {name: '모던한', id: '3c0c90ff-f775-474a-bc6d-83f1c8c30536'},
  {name: '수수한', id: '8a3eb59d-263e-486a-aa9c-c672d2599a8b'},
  {name: '사랑스러운', id: '45633dc1-34d0-4a2c-8cc9-0bf7ecbb6e3c'},
  {name: '캐주얼한', id: '8954a54d-2e9a-4a6e-b63e-081119c4a93c'},
  {name: '자유분방한', id: '89fde358-fd6b-4d6b-ba07-057e6c4e4b8b'},
  {name: '다채로운', id: '05e59ff6-7d1c-4497-850a-1683de7e7e59'},
  {name: '차분한', id: '1b2f7f85-5d71-4881-81ad-70a1b2d1c1a0'},
  {name: '신비로운', id: '61715019-1f05-45e6-91e2-13b50d818efb'},
  {name: '순수한', id: 'b06da443-52c2-4398-9bdf-6a7f3f14f29f'},
  {name: '고요한', id: 'c5a5ff7b-0b40-4683-b796-5c295b1908a5'},
  {name: '고급스러운', id: 'ec2b0244-e37c-4fd0-8aee-c11c831124b3'},
];

// filter name을 id로 변환하는 함수
export const filterNameToId = (name: FilterTagType): string => {
  const filter = filterTagsData.find(tag => tag.name === name);
  return filter ? filter.id : '';
};

// filter id를 name으로 변환하는 함수
export const filterIdToName = (id: string): FilterTagType => {
  const filter = filterTagsData.find(tag => tag.id === id);
  return filter?.name!;
};
