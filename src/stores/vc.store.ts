import { create } from 'zustand';

import { useAudioUpload, useTextUpload } from '@/hooks/useFileUpload';
import { VCItem } from '@/types/table';

interface Alert {
  show: boolean;
  message: string;
  variant: 'default' | 'destructive';
}

interface VCStore {
  // 상태
  items: VCItem[];
  selectedVoice: string;
  projectData: {
    projectId: number | null;
    projectName: string;
  };
  alert: Alert;

  // 기본 액션
  setItems: (items: VCItem[]) => void;
  addItems: (newItems: VCItem[]) => void;
  updateItem: (id: string, updates: Partial<VCItem>) => void;
  deleteSelectedItems: () => void;
  toggleSelection: (id: string) => void;
  toggleSelectAll: () => void;
  setSelectedVoice: (voice: string) => void;
  showAlert: (message: string, variant?: 'default' | 'destructive') => void;
  hideAlert: () => void;
  setProjectData: (data: { projectId: number | null; projectName: string }) => void;
  updateProjectName: (name: string) => void;

  // 파일 핸들러
  handleAdd: () => void;
  handleFileUpload: (files: FileList | null) => void;
  handleTextChange: (id: string, newText: string) => void;
  handlePlay: (id: string) => void;
}

export const useVCStore = create<VCStore>((set, get) => {
  // 오디오 업로드 설정
  const { openFileDialog } = useAudioUpload(
    (newItems) => get().addItems(newItems),
    (error) => get().showAlert(error, 'destructive')
  );

  // 텍스트 업로드 설정
  const { handleFiles } = useTextUpload((texts) => {
    const { items, updateItem } = get();
    items.forEach((item) => {
      if (item.isSelected) {
        updateItem(item.id, { text: texts[0] || '' });
      }
    });
  });

  return {
    // 초기 상태
    items: [],
    selectedVoice: '',
    projectData: {
      projectId: null,
      projectName: '새 프로젝트',
    },
    alert: {
      show: false,
      message: '',
      variant: 'default',
    },

    // 기존 액션들
    setItems: (items) => set({ items }),
    addItems: (newItems) => set((state) => ({ items: [...state.items, ...newItems] })),
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
    setSelectedVoice: (voice) => set({ selectedVoice: voice }),
    showAlert: (message, variant = 'destructive') => {
      set({ alert: { show: true, message, variant } });
      setTimeout(() => set((state) => ({ alert: { ...state.alert, show: false } })), 3000);
    },
    hideAlert: () => set((state) => ({ alert: { ...state.alert, show: false } })),
    setProjectData: (data) => set({ projectData: data }),
    updateProjectName: (name) =>
      set((state) => ({ projectData: { ...state.projectData, projectName: name } })),

    // 파일 핸들러
    handleAdd: () => openFileDialog(),
    handleFileUpload: (files) => handleFiles(files),
    handleTextChange: (id, newText) => get().updateItem(id, { text: newText }),
    handlePlay: (id) => console.log('Play item:', id),
  };
});
