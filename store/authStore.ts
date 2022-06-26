import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const res = await axios.get(`${BASE_URL}/api/auth`);

    set({ allUsers: res.data });
  },
});

const useAuthStore = create((
  persist(authStore, {
    name: 'auth',
  })
));

export default useAuthStore;
