import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id?: number;
  email?: string;
  name?: string;
  phoneNumber?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>; // 서버에서 사용자 정보 가져오기
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      fetchUser: async () => {
        const id = JSON.parse(localStorage.getItem('auth-storage') || '{}').user?.id;
        if (id) {
          try {
            const response = await fetch(`/api/user/${id}`);
            const userData = await response.json();
            set({ user: userData });
          } catch (error) {
            console.error('Failed to fetch user:', error);
          }
        }
      },
    }),
    {
      name: 'auth-storage', // 로컬스토리지에 id만 저장
      partialize: (state) => ({
        user: state.user ? { id: state.user.id } : null, // id만 저장
      }),
    }
  )
);
