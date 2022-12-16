import Vue from "vue";
import Vuex from "vuex";

import userStore from "@/store/modules/userStore.js";
import boardStore from "@/store/modules/boardStore.js";

import { createVuexPersistedState } from "vue-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      storage: window.localStorage,
    }),
  ],
  modules: { userStore, boardStore },
});
