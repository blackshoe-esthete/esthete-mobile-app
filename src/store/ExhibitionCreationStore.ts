import {create} from 'zustand';
import {ExhibitionDetailsStore, ImageItem} from '../types/exhibitionService.type';

interface ExhibitionCreationStore {
  selectedImageUri: string | undefined;
  setSelectedImageUri: (uri: string) => void;
  resetImages: () => void;
  additionalImageUri: ImageItem[];
  setAdditionalImageUri: (images: ImageItem[]) => void;
  currentFilterId: string;
  setCurrentFilterId: (filterId: string) => void; // 필터 이름 추가
  setCurrentFilterIdForAll: (filterId: string) => void; // 모든 이미지에 필터 적용
  currentGrayScale: number;
  setCurrentGrayScale: (grayScale: number, imageIndex: number) => void; // 이미지 인덱스 추가
  setCurrentGrayScaleForAll: (grayScale: number) => void; // 모든 이미지에 적용
}

export const useExhibitionCreationStore = create<ExhibitionCreationStore>((set, get) => ({
  selectedImageUri: undefined,
  additionalImageUri: [],
  currentFilterId: '',
  currentGrayScale: 0,

  setSelectedImageUri: (uri: string) => set({selectedImageUri: uri}),
  setAdditionalImageUri: (images: ImageItem[]) => set({additionalImageUri: images}),
  setCurrentFilterId: (filterId: string) => {
    const {additionalImageUri, currentGrayScale} = get();
    set({
      currentFilterId: filterId,
      additionalImageUri: additionalImageUri.map(image => ({
        ...image,
        filterDetails: {
          ...image.filterDetails,
          id: filterId,

          grayScale: currentGrayScale,
        },
      })),
    });
  },
  setCurrentFilterIdForAll: (filterId: string) => {
    const {additionalImageUri, currentGrayScale} = get();
    set({
      currentFilterId: filterId,
      additionalImageUri: additionalImageUri.map(image => ({
        ...image,
        filterDetails: {
          ...image.filterDetails,
          id: filterId,
          grayScale: currentGrayScale,
        },
      })),
    });
  },
  setCurrentGrayScale: (grayScale: number, imageIndex: number) => {
    const {additionalImageUri, currentFilterId} = get();
    set({
      currentGrayScale: grayScale,
      additionalImageUri: additionalImageUri.map((image, index) => {
        if (index === imageIndex) {
          return {
            ...image,
            filterDetails: {
              ...image.filterDetails,
              id: currentFilterId,
              grayScale: grayScale,
            },
          };
        }
        return image;
      }),
    });
  },
  setCurrentGrayScaleForAll: (grayScale: number) => {
    const {additionalImageUri, currentFilterId} = get();
    set({
      currentGrayScale: grayScale,
      additionalImageUri: additionalImageUri.map(image => ({
        ...image,
        filterDetails: {
          ...image.filterDetails,
          id: currentFilterId,
          grayScale: grayScale,
        },
      })),
    });
  },
  resetImages: () =>
    set({
      selectedImageUri: undefined,
      additionalImageUri: [],
      currentFilterId: '',
      currentGrayScale: 0,
    }),
}));

export const useExhibitionDetailsStore = create<ExhibitionDetailsStore>(set => ({
  details: {
    filterPhotos: [],
    title: '',
    description: '',
    mood: [],
    location: {
      format_address: '',
      longitude: 0,
      latitude: 0,
      state: '',
      city: '',
      town: '',
    },
    tmpExhibitionId: undefined,
  },
  setDetails: newDetails =>
    set(state => ({
      details: {...state.details, ...newDetails},
    })),
  resetDetails: () =>
    set({
      details: {
        filterPhotos: [],
        title: '',
        description: '',
        mood: [],
        location: {
          format_address: '',
          longitude: 0,
          latitude: 0,
          state: '',
          city: '',
          town: '',
        },
        tmpExhibitionId: undefined,
      },
    }),
}));
