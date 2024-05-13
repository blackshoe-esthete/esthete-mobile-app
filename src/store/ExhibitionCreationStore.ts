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

const useExhibitionCreationStore = create<ExhibitionCreationStore>(set => ({
  selectedImageUri: undefined,
  setSelectedImageUri: (uri: string) => set({selectedImageUri: uri}),
  additionalImageUri: [],
  setAdditionalImageUri: (images: ImageItem[]) => set({additionalImageUri: images}),
}));

export default useExhibitionCreationStore;
