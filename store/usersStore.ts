import create from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from './../utils/index';

const useUsersStore = create(
  devtools((set) => ({
    suggestedAccounts: [],
    fetchSuggestedAccounts: async () => {
      const res = await axios.get(`${BASE_URL}/api/auth`);
      set({ suggestedAccounts: res.data });
    },
  }))
);

export default useUsersStore;
