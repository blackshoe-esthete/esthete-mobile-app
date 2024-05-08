import {create} from 'zustand';

interface FilterCreationStore {
  //   selectedImageIndex: number | null;
  //   setSelectedImageIndex: (index: number) => void;
  selectedImageUri: string | undefined;
  setSelectedImageUri: (uri: string) => void;
  filteredImageUri: string | undefined;
  setFilteredImageUri: (uri: string) => void;
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
  //   selectedImageThumbUri: undefined,
  //   setSelectedImageThumbUri: (uri: string | undefined) => set({selectedImageThumbUri: uri}),
  //   selectedFilterIndex: 0,
  //   setSelectedFilterIndex: (index: number) => set({selectedFilterIndex: index}),
  //   filterValues: [],
  //   setFilterValues: (values: number[]) => set({filterValues: values}),
}));
