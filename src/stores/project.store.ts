import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Project {
  id: string;
  name: string;
  type: 'TTS' | 'VC' | 'Concat';
  createdAt: Date;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
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
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
    }),
    {
      name: 'project-storage',
    }
  )
);
