import { create } from "zustand";

interface profileStore {
  nickname: string;
  setNickname: (name: string) => void;
  intro: string;
  setIntro: (intro: string) => void;
  script: string;
  setScript: (script: string) => void;
}

export const useProfileStore = create<profileStore>((set, get) => ({
  nickname: '',
  intro: '',
  script: '',
  setNickname: (nickname: string) => {
    set({
      nickname: nickname
    });
  },
  setIntro: (intro: string) => {
    set({
      intro: intro
    });
  },
  setScript: (script: string) => {
    set({
      script: script
    });
  },
}));