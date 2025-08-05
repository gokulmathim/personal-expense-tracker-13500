import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string, name: string, email: string },
    token: null as null | string
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token
    }
  },
  actions: {
    // PUBLIC_INTERFACE
    login(user, token) {
      this.user = user
      this.token = token
    },
    // PUBLIC_INTERFACE
    logout() {
      this.user = null
      this.token = null
    },
    // PUBLIC_INTERFACE
    setUser(user) {
      this.user = user
    },
    // PUBLIC_INTERFACE
    setToken(token) {
      this.token = token
    }
  }
})
