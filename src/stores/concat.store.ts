import { create } from 'zustand';

export interface ConcatItem {
  id: string;
  text: string;
  isSelected: boolean;
  fileName: string;
  audioUrl: string;
  file?: File;
  status: '대기중' | '완료' | '실패' | '진행';
}

interface ConcatStore {
  // 상태
  items: ConcatItem[];
  audioPlayer: {
    audioElement: HTMLAudioElement | null;
    currentPlayingId: string | null;
  };

  // 액션
  setItems: (items: ConcatItem[]) => void;
  toggleSelection: (id: string) => void;
  toggleSelectAll: () => void;
  deleteSelectedItems: () => void;
  handleAdd: () => void;
  handleTextChange: (id: string, text: string) => void;
  handlePlay: (id: string) => void;
  handlePause: () => void;
  setCurrentPlayingId: (id: string | null) => void;
  showAlert: (message: string, variant: 'default' | 'destructive') => void;
}

export const useConcatStore = create<ConcatStore>((set, get) => ({
  // 초기 상태
  items: [],
  audioPlayer: {
    audioElement: null,
    currentPlayingId: null,
  },

  // 액션
  setItems: (items) => set({ items }),

  toggleSelection: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      ),
    })),

  toggleSelectAll: () =>
    set((state) => {
      const allSelected = state.items.every((item) => item.isSelected);
      return {
        items: state.items.map((item) => ({ ...item, isSelected: !allSelected })),
      };
    }),

  deleteSelectedItems: () =>
    set((state) => ({
      items: state.items.filter((item) => !item.isSelected),
    })),

  handleAdd: () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.multiple = true;
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      const audioFiles = Array.from(files).filter((file) => file.type.startsWith('audio/'));
      const newItems = audioFiles.map((file) => ({
        id: crypto.randomUUID(),
        text: '',
        isSelected: false,
        fileName: file.name,
        audioUrl: URL.createObjectURL(file),
        file,
        status: '대기중' as const,
      }));

      set((state) => ({
        items: [...state.items, ...newItems],
      }));
    };
    input.click();
  },

  handleTextChange: (id, text) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, text } : item)),
    })),

  handlePlay: (id) => {
    const state = get();
    const item = state.items.find((item) => item.id === id);
    if (!item?.audioUrl) return;

    // 같은 오디오 재생 시도시
    if (state.audioPlayer.currentPlayingId === id) {
      state.audioPlayer.audioElement?.play();
      return;
    }

    // 다른 오디오 재생 시도시
    if (state.audioPlayer.audioElement) {
      state.audioPlayer.audioElement.pause();
    }

    // 새로운 오디오 생성
    const audio = new Audio(item.audioUrl);
    audio.onended = () => {
      get().setCurrentPlayingId(null);
      set({
        audioPlayer: {
          audioElement: null,
          currentPlayingId: null,
        },
      });
    };

    audio.play();
    set({
      audioPlayer: {
        audioElement: audio,
        currentPlayingId: id,
      },
    });
  },

  handlePause: () => {
    const state = get();
    state.audioPlayer.audioElement?.pause();
    set({
      audioPlayer: {
        audioElement: null,
        currentPlayingId: null,
      },
    });
  },

  setCurrentPlayingId: (id) =>
    set((state) => ({
      audioPlayer: {
        ...state.audioPlayer,
        currentPlayingId: id,
      },
    })),

  showAlert: (message, variant) => {
    console.log(`${variant}: ${message}`);
  },
}));
