import {create} from 'zustand';

interface FilterCreationStore {
  //   selectedImageIndex: number | null;
  //   setSelectedImageIndex: (index: number) => void;
  selectedImageUri: string | undefined;
  setSelectedImageUri: (uri: string) => void;
  filteredImageUri: string | undefined;
  setFilteredImageUri: (uri: string) => void;
  additionalImageUri: string[];
  setAdditionalImageUri: (uri: string, index: number) => void;
  //   selectedImageThumbUri: string | undefined;
  //   setSelectedImageThumbUri: (uri: string | undefined) => void;
  //   selectedFilterIndex: number | null;
  //   setSelectedFilterIndex: (index: number) => void;
  //   filterValues: number[];
  //   setFilterValues: (values: number[]) => void;
}

export const useFilterCreationStore = create<FilterCreationStore>(set => ({
  //   selectedImageIndex: null,
  //   setSelectedImageIndex: (index: number) => set({selectedImageIndex: index}),
  selectedImageUri: undefined,
  setSelectedImageUri: (uri: string) => set({selectedImageUri: uri}),
  filteredImageUri: undefined,
  setFilteredImageUri: (uri: string) => set({filteredImageUri: uri}),
  additionalImageUri: [], // 최대 3개
  setAdditionalImageUri: (uri: string, index: number) =>
    set(state => {
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
      return {additionalImageUri: updatedUris};
    }),
  //   selectedImageThumbUri: undefined,
  //   setSelectedImageThumbUri: (uri: string | undefined) => set({selectedImageThumbUri: uri}),
  //   selectedFilterIndex: 0,
  //   setSelectedFilterIndex: (index: number) => set({selectedFilterIndex: index}),
  //   filterValues: [],
  //   setFilterValues: (values: number[]) => set({filterValues: values}),
}));
