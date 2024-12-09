import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ConcatItem, ConcatProjectConfig } from '@/stores/concat.store';
import { TTSItem, TTSProjectConfig } from '@/stores/tts.store';
import { VCProjectConfig } from '@/stores/vc.store';
import { VCItem } from '@/types/table';

interface TTSData {
  items: TTSItem[];
  project: TTSProjectConfig;
}

interface VCData {
  items: VCItem[];
  project: VCProjectConfig;
}

interface ConcatData {
  items: ConcatItem[];
  project: ConcatProjectConfig;
}

export interface Project<T> {
  id: string;
  name: string;
  type: 'TTS' | 'VC' | 'Concat';
  createdAt: Date;
  data?: T;
}

interface ProjectState<T> {
  projects: Project<T>[];
  addProject: (project: Omit<Project<T>, 'id' | 'createdAt'>) => Project<T>;
  removeProject: (id: string) => void;
  updateProject: (id: string, project: Partial<Project<T>>) => void;
  getProject: (id: string) => Project<T> | undefined;
}

function createProjectStore<T>(storeName: string) {
  return create<ProjectState<T>>()(
    persist(
      (set, get) => ({
        projects: [],
        addProject: (project) => {
          const newProject = {
            ...project,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          };
          set((state) => ({
            projects: [...state.projects, newProject],
          }));
          return newProject;
        },
        updateProject: (id, project) =>
          set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
          })),
        removeProject: (id) =>
          set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
          })),
        getProject: (id) => {
          return get().projects.find((project) => project.id === id);
        },
      }),
      {
        name: storeName,
      }
    )
  );
}

export const useTTSProjectStore = createProjectStore<TTSData>('project-storage-TTSData');
export const useVCProjectStore = createProjectStore<VCData>('project-storage-VCData');
export const useConcatProjectStore = createProjectStore<ConcatData>('project-storage-ConcatData');
