import { create } from "zustand";

interface profileEditStore {
  tab: string;
  setTab: (tab: string) => void;
  editable: boolean;
  setEditable: (edit: boolean) => void;
  id: string;
  setId: (id: string) => void;
  deletable: boolean;
  setDelete: (deletion: boolean) => void;
  resetDeletion: () => void;
  resetEdit: () => void;
}

export const useEditStore = create<profileEditStore>((set) => ({
  tab: 'exhibition',
  editable: false,
  id: '',
  deletable: false,
  setTab: (tab: string) => {
    set({
      tab: tab
    });
  },
  setEditable: (edit: boolean) => {
    set({
      editable: edit
    });
  },
  setId: (id: string) => {
    set({
      id: id,
    });
  },
  setDelete: (deletable: boolean) => {
    set({
      deletable: deletable
    });
  },
  resetDeletion: () => set({
    id: '',
    deletable: false,
  }),
  resetEdit: () => set({
    tab: 'exhibition',
    editable: false,
  })
}));