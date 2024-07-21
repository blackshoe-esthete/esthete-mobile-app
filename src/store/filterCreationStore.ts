import { FilterType, FilterValue } from '#types/filterService.type';
import { filters } from '@utils/filter';
import { create } from 'zustand';

interface FilterCreationStore {
  selectedImageUri: string | undefined;
  setSelectedImageUri: (uri: string) => void;

  filteredImageUri: string | undefined;
  setFilteredImageUri: (uri: string) => void;

  additionalImageUri: string[];
  setAdditionalImageUri: (uri: string, index: number) => void;
  setAdditionalImageUriEmpty: () => void;

  filterValue: FilterValue;
  setFilterValue: (filterValue: FilterValue) => void;
  setFilterValueInitial: () => void;
}

export const useFilterCreationStore = create<FilterCreationStore>((set) => ({
  selectedImageUri: undefined,
  setSelectedImageUri: (uri: string) => set({ selectedImageUri: uri }),

  filteredImageUri: undefined,
  setFilteredImageUri: (uri: string) => set({ filteredImageUri: uri }),

  additionalImageUri: [], // 최대 3개
  setAdditionalImageUri: (uri: string, index: number) =>
    set((state) => {
      // 기존 배열을 복사합니다.
      const updatedUris = [...state.additionalImageUri];
      // 특정 인덱스의 값을 새로운 `uri`로 업데이트합니다.
      if (index >= 0 && index < updatedUris.length) {
        updatedUris[index] = uri;
      } else if (index === updatedUris.length) {
        // 배열의 길이와 인덱스가 같은 경우, 배열의 끝에 새 항목을 추가합니다.
        updatedUris.push(uri);
      }
      // 수정된 배열을 상태로 설정합니다.
      return { additionalImageUri: updatedUris };
    }),
  setAdditionalImageUriEmpty: () => set({ additionalImageUri: [] }),

  filterValue: filters.reduce((acc, filter) => ({ ...acc, [filter.type]: filter.default }), {}),
  setFilterValue: (filterValue) => set({ filterValue }),
  setFilterValueInitial: () =>
    set({
      filterValue: filters.reduce((acc, filter) => ({ ...acc, [filter.type]: filter.default }), {}),
    }),
}));
