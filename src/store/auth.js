/* eslint-disable */

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export const authStore = createStore({
  state() {
    return { user: null };
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  plugins: [createPersistedState()],
});
