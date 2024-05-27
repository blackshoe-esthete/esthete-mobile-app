import {create} from 'zustand';

interface ImageItem {
  uri: string;
  identifier: string;
}

interface ExhibitionCreationStore {
  selectedImageUri: string | undefined;
  setSelectedImageUri: (uri: string) => void;
  additionalImageUri: ImageItem[];
  setAdditionalImageUri: (images: ImageItem[]) => void;
}

export const useExhibitionCreationStore = create<ExhibitionCreationStore>(set => ({
  selectedImageUri: undefined,
  setSelectedImageUri: (uri: string) => set({selectedImageUri: uri}),
  additionalImageUri: [],
  setAdditionalImageUri: (images: ImageItem[]) => set({additionalImageUri: images}),
}));

interface ExhibitionDetails {
  title: string;
  description: string;
  mood: string[];
  location: string;
}

interface ExhibitionDetailsStore {
  details: ExhibitionDetails;
  setDetails: (details: Partial<ExhibitionDetails>) => void;
}

export const useExhibitionDetailsStore = create<ExhibitionDetailsStore>(set => ({
  details: {
    title: '',
    description: '',
    mood: [],
    location: '',
  },
  setDetails: newDetails =>
    set(state => ({
      details: {...state.details, ...newDetails},
    })),
}));
