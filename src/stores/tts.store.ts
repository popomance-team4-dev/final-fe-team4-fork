import { create } from 'zustand';

import { TTSSaveDto } from '@/api/aIParkAPI.schemas';
import { TableItem } from '@/types/table';

export interface TTSItem {
  id: string;
  enitityId: number | null;
  text: string;
  isSelected: boolean;
  speed?: number;
  volume: number;
  pitch: number;
  language?: string;
  voice?: string;
  style?: string;
  fileName?: string;
}

interface TTSConfig {
  speed: number;
  volume: number;
  pitch: number;
  language: string;
  voice: string;
  style: string;
}

interface TTSStore {
  // 사이드바 설정
  speed: number;
  volume: number;
  pitch: number;
  language: string;
  voice: string;
  style: string;
  isModified: boolean;
  isAllConfigured: boolean;

  // 테이블 아이템 관련
  items: TTSItem[];

  // 사이드바 액션
  setField: (field: keyof TTSConfig, value: string | number) => void;
  reset: () => void;

  // 테이블 액션
  setItems: (items: TTSItem[]) => void;
  addItems: (newItems?: TableItem[]) => void;
  updateItem: (id: string, updates: Partial<TTSItem>) => void;
  deleteSelectedItems: () => void;
  toggleSelection: (id: string) => void;
  toggleSelectAll: () => void;
  reorderItems: (newItems: TTSItem[]) => void;

  // 프로젝트 데이터
  projectData: TTSSaveDto;

  // 프로젝트 관련 액션
  setProjectData: (data: { projectId: number | null; projectName: string }) => void;
  updateProjectName: (name: string) => void;

  // TTS 설정 적용 액션
  applyToSelected: () => void;

  handleReorder: (items: TableItem[]) => void;
}

const initialProjectData = {
  projectId: null,
  projectName: '새 프로젝트',
  globalVoiceStyleId: 9,
  fullScript: '',
  globalSpeed: 1.0,
  globalPitch: 4.0,
  globalVolume: 60,
  ttsDetails: [],
};

export const ttsInitialSettings = {
  // 사이드바 초기값
  speed: initialProjectData.globalSpeed,
  volume: initialProjectData.globalVolume,
  pitch: initialProjectData.globalPitch,
  language: '',
  voice: '',
  style: '',
  isModified: false,
  isAllConfigured: false,

  // 테이블 초기값
  items: [],
  projectId: null,
  projectName: '새 프로젝트',

  // 프로젝트 초기값
  projectData: initialProjectData,
};

export const useTTSStore = create<TTSStore>((set, get) => ({
  ...ttsInitialSettings,

  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value };
      const isModified = Object.keys(ttsInitialSettings).some(
        (key) => newState[key as keyof TTSConfig] !== ttsInitialSettings[key as keyof TTSConfig]
      );

      const isAllConfigured = ['language', 'voice', 'style'].every(
        (key) => newState[key as keyof TTSConfig] !== ttsInitialSettings[key as keyof TTSConfig]
      );

      return {
        ...newState,
        isModified,
        isAllConfigured,
      };
    }),

  reset: () => set(ttsInitialSettings),

  setItems: (items) => set({ items }),

  addItems: (newItems) =>
    set((state) => {
      if (newItems && newItems.length > 0) {
        const mappedItems = newItems.map((item) => ({
          id: crypto.randomUUID(),
          enitityId: null,
          text: item.text ?? '',
          isSelected: false,
          speed: state.speed ?? ttsInitialSettings.speed,
          volume: state.volume ?? ttsInitialSettings.volume,
          pitch: state.pitch ?? ttsInitialSettings.pitch,
          language: state.language ?? ttsInitialSettings.language,
          voice: state.voice ?? ttsInitialSettings.voice,
          style: state.style ?? ttsInitialSettings.style,
        }));
        return { items: [...state.items, ...mappedItems] };
      } else {
        const newItem: TTSItem = {
          id: crypto.randomUUID(),
          enitityId: null,
          text: '',
          isSelected: false,
          speed: state.speed,
          volume: state.volume,
          pitch: state.pitch,
          language: state.language,
          voice: state.voice,
          style: state.style,
        };
        return { items: [...state.items, newItem] };
      }
    }),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })),

  deleteSelectedItems: () =>
    set((state) => ({
      items: state.items.filter((item) => !item.isSelected),
    })),

  toggleSelection: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      ),
    })),

  toggleSelectAll: () =>
    set((state) => {
      const isAllSelected = state.items.every((item) => item.isSelected);
      return {
        items: state.items.map((item) => ({ ...item, isSelected: !isAllSelected })),
      };
    }),

  reorderItems: (newItems) => set({ items: newItems }),

  setProjectData: (data) =>
    set((state) => ({
      projectData: {
        ...state.projectData,
        ...data,
      },
    })),

  updateProjectName: (name: string) =>
    set((state) => ({
      projectData: {
        ...state.projectData,
        projectName: name,
      },
    })),

  applyToSelected: () => {
    const { items, speed, volume, pitch, language, voice, style } = get();
    set({
      items: items.map((item) =>
        item.isSelected
          ? {
              ...item,
              speed,
              volume,
              pitch,
              language,
              voice,
              style,
            }
          : item
      ),
    });
  },

  handleReorder: (newItems: TableItem[]) => {
    const convertedItems: TTSItem[] = newItems.map((item) => ({
      id: item.id,
      enitityId: null,
      text: item.text,
      isSelected: false,
      speed: item.speed ?? ttsInitialSettings.speed,
      volume: item.volume ?? ttsInitialSettings.volume,
      pitch: item.pitch ?? ttsInitialSettings.pitch,
      language: ttsInitialSettings.language,
    }));
    set({ items: convertedItems });
  },
}));
