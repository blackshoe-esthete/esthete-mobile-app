import {create} from 'zustand';
import {ExhibitionDetailsStore, ImageItem} from '../types/exhibitionService.type';

export interface FilterAttributes {
  brightness?: number;
  sharpness?: number;
  exposure?: number;
  contrast?: number;
  saturation?: number;
  hue?: number;
  temperature?: number;
  grayScale?: number;
}

// 개별 이미지의 필터와 슬라이더 값을 위한 인터페이스
export interface ImageFilterSettings {
  filterId: string;
  filterAttributes: FilterAttributes;
  sliderValue: number;
}

interface ExhibitionCreationStore {
  selectedImageUri: string | undefined;
  setSelectedImageUri: (uri: string) => void;
  resetImages: () => void;
  additionalImageUri: ImageItem[];
  setAdditionalImageUri: (images: ImageItem[]) => void;
  currentFilterIds: string[]; // 각 이미지의 필터 ID 배열
  setCurrentFilterId: (filterId: string, imageIndex: number) => void;
  setCurrentFilterIdForAll: (filterId: string) => void;
  currentGrayScales: number[]; // 각 이미지의 회색조 배열
  setCurrentGrayScale: (grayScale: number, imageIndex: number) => void;
  setCurrentGrayScaleForAll: (grayScale: number) => void;
  sliderValues: number[]; // 각 이미지의 슬라이더 값 배열
  setSliderValue: (value: number, imageIndex: number) => void;
  setSliderValueForAll: (value: number) => void;
  imageFilterSettings: ImageFilterSettings[]; // 이미지별 필터 설정 배열
  setImageFilterSettings: (settings: ImageFilterSettings, imageIndex: number) => void;
  setImageFilterSettingsForAll: (settings: ImageFilterSettings) => void;
}

export const useExhibitionCreationStore = create<ExhibitionCreationStore>((set, get) => ({
  selectedImageUri: undefined,
  additionalImageUri: [],
  currentFilterIds: [],
  currentGrayScales: [],
  sliderValues: [],
  imageFilterSettings: [],

  setSelectedImageUri: (uri: string) => set({selectedImageUri: uri}),

  setAdditionalImageUri: (images: ImageItem[]) => {
    const initialSettings = images.map(() => ({
      filterId: '0',
      filterAttributes: {
        brightness: 1,
        sharpness: 0,
        exposure: 0,
        contrast: 1,
        saturation: 1,
        hue: 0,
        temperature: 0,
        grayScale: 0,
      },
      sliderValue: 50,
    }));

    set({
      additionalImageUri: images,
      imageFilterSettings: initialSettings,
      currentFilterIds: initialSettings.map(() => '0'),
      currentGrayScales: initialSettings.map(() => 0),
      sliderValues: initialSettings.map(() => 50),
    });
  },

  setCurrentFilterId: (filterId: string, imageIndex: number) => {
    const {currentFilterIds} = get();
    const newFilterIds = [...currentFilterIds];
    newFilterIds[imageIndex] = filterId;
    set({currentFilterIds: newFilterIds});
  },

  setCurrentFilterIdForAll: (filterId: string) => {
    const {currentFilterIds} = get();
    const newFilterIds = currentFilterIds.map(() => filterId);
    set({currentFilterIds: newFilterIds});
  },

  setCurrentGrayScale: (grayScale: number, imageIndex: number) => {
    const {currentGrayScales} = get();
    const newGrayScales = [...currentGrayScales];
    newGrayScales[imageIndex] = grayScale;
    set({currentGrayScales: newGrayScales});
  },

  setCurrentGrayScaleForAll: (grayScale: number) => {
    const {currentGrayScales} = get();
    const newGrayScales = currentGrayScales.map(() => grayScale);
    set({currentGrayScales: newGrayScales});
  },

  setSliderValue: (value: number, imageIndex: number) => {
    const {sliderValues} = get();
    const newSliderValues = [...sliderValues];
    newSliderValues[imageIndex] = value;
    set({sliderValues: newSliderValues});
  },

  setSliderValueForAll: (value: number) => {
    const {sliderValues} = get();
    const newSliderValues = sliderValues.map(() => value);
    set({sliderValues: newSliderValues});
  },

  setImageFilterSettings: (settings: ImageFilterSettings, imageIndex: number) => {
    const {imageFilterSettings} = get();
    const newSettings = [...imageFilterSettings];
    newSettings[imageIndex] = settings;
    set({imageFilterSettings: newSettings});
  },

  setImageFilterSettingsForAll: (settings: ImageFilterSettings) => {
    set({
      imageFilterSettings: get().imageFilterSettings.map(() => settings),
    });
  },

  resetImages: () =>
    set({
      selectedImageUri: undefined,
      additionalImageUri: [],
      currentFilterIds: [],
      currentGrayScales: [],
      sliderValues: [],
      imageFilterSettings: [],
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

export interface FilterAttributes {
  brightness?: number;
  sharpness?: number;
  exposure?: number;
  contrast?: number;
  saturation?: number;
  hue?: number;
  temperature?: number;
  grayScale?: number;
}

interface Filter {
  filter_id: string;
  filter_name: string;
  attributes: FilterAttributes;
}

interface FilterDetailsStore {
  filters: Filter[];
  selectedFilterId: string | null; // 선택된 필터의 ID
  selectedFilterAttributes: FilterAttributes | null; // 선택된 필터의 속성
  currentFilterAttributes: FilterAttributes; // 현재 필터 속성
  setFilters: (filters: Filter[]) => void;
  setSelectedFilterId: (id: string | null) => void; // 선택된 필터 ID 설정
  setSelectedFilterAttributes: (attributes: FilterAttributes | null) => void; // 선택된 필터의 속성 설정
  setCurrentFilterAttributes: (attributes: FilterAttributes) => void; // 현재 필터 속성 설정
  updateFilterAttributes: (id: string, attributes: Partial<FilterAttributes>) => void;
  resetFilters: () => void; // 필터 초기화
}

export const useFilterDetailsStore = create<FilterDetailsStore>((set, get) => ({
  filters: [],
  selectedFilterId: null,
  selectedFilterAttributes: null,
  currentAdjustedFilterAttributes: null,
  currentFilterAttributes: {
    brightness: 1,
    sharpness: 0,
    exposure: 0,
    contrast: 1,
    saturation: 1,
    hue: 0,
    temperature: 0,
    grayScale: 0,
  },

  setFilters: filters => set({filters}),
  setSelectedFilterId: id => {
    const filter = get().filters.find(f => f.filter_id === id);
    set({
      selectedFilterId: id,
      selectedFilterAttributes: filter ? filter.attributes : null,
    });
  },
  setSelectedFilterAttributes: attributes => set({selectedFilterAttributes: attributes}),
  setCurrentFilterAttributes: attributes => set({currentFilterAttributes: attributes}),
  updateFilterAttributes: (id, attributes) =>
    set(state => {
      const updatedFilters = state.filters.map(filter =>
        filter.filter_id === id ? {...filter, attributes: {...filter.attributes, ...attributes}} : filter,
      );
      const updatedAttributes =
        state.selectedFilterId === id
          ? {...state.selectedFilterAttributes, ...attributes}
          : state.selectedFilterAttributes;

      return {
        filters: updatedFilters,
        selectedFilterAttributes: updatedAttributes,
      };
    }),
  resetFilters: () =>
    set({
      filters: [],
      selectedFilterId: null,
      selectedFilterAttributes: null,
      currentFilterAttributes: {
        brightness: 1,
        sharpness: 0,
        exposure: 0,
        contrast: 1,
        saturation: 1,
        hue: 0,
        temperature: 0,
        grayScale: 0,
      },
    }),
}));
