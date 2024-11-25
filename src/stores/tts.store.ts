import { create } from 'zustand';

export interface TTSStore {
  speed: number;
  volume: number;
  pitch: number;
  language: string;
  voice: string;
  style: string;
  setField: (field: string, value: number | string) => void;
  reset: () => void;
  isModified: boolean;
  isAllConfigured: boolean;
}

const initialState = {
  speed: 0,
  volume: 0,
  pitch: 0,
  language: '',
  voice: '',
  style: '',
};

export const useTTSStore = create<TTSStore>((set, _get) => ({
  ...initialState,
  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value };
      return {
        ...newState,
        isModified: Object.entries(newState).some(
          ([key, val]) => val !== initialState[key as keyof typeof initialState]
        ),
        isAllConfigured: Object.entries(newState).every(
          ([key, val]) => val !== initialState[key as keyof typeof initialState]
        ),
      };
    }),
  reset: () => set(initialState),
  isModified: false,
  isAllConfigured: false,
}));
