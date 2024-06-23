import {create} from 'zustand';

interface HomeSearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const useHomeSearchStore = create<HomeSearchStore>(set => ({
  keyword: '',
  setKeyword: (keyword: string) => set({keyword: keyword}),
}));
