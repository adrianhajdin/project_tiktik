import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const authStore = (set: any) => ({
  userProfile: null,
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: 'auth',
    })
  )
);

export default useAuthStore;
