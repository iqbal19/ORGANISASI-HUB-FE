import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authUser: null,
    expires: null,
  }),
  persist: true,
  getters: {
    getAuthUser: (state) => state.authUser || null,
  },
  actions: {
    setAuthUser(payload) {
      this.authUser = payload;
    },
    setAccessToken(payload) {
      this.authUser.access_token = payload;
    },
    setExpires(payload) {
      this.expires = payload;
    },
    clear() {
      this.authUser = null;
      this.expires = null;
    },
  },
  persist: { key: "nex.auth", paths: ["authUser"], storage: localStorage },
});
