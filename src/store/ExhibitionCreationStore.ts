import {create} from 'zustand';

interface ExhibitionCreationStore {
  selectedImageUris: string[];
}

const useExhibitionCreationStore = create<ExhibitionCreationStore>(set => ({
  selectedImageUris: [],
}));

export default useExhibitionCreationStore;
