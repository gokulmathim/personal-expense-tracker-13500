import { ref, computed } from "vue"
import { useAuthStore } from "~/stores/auth"

const API_BASE = '/api' // Backend base for user endpoints

export function useAuth() {
  const auth = useAuthStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  // PUBLIC_INTERFACE
  async function login({ email, password }) {
    loading.value = true
    error.value = null
    try {
      // const res = await fetch(`${API_BASE}/login`, {
      //   method: "POST", headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await res.json()
      // auth.login(data.user, data.token)
      auth.login({ id: "1", name: "Demo", email }, "demo-token")
    } catch (e) {
      error.value = "Failed to login"
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function register({ email, name, password }) {
    loading.value = true
    error.value = null
    try {
      // const res = await fetch(`${API_BASE}/register`, { ... })
      // const data = await res.json()
      // auth.login(data.user, data.token)
      auth.login({ id: "2", name, email }, "demo-token")
    } catch {
      error.value = "Registration failed"
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function logout() {
    // await fetch(`${API_BASE}/logout`)
    auth.logout()
  }
  // PUBLIC_INTERFACE
  async function updateProfile({ name }) {
    // await fetch(`${API_BASE}/me`, { method: "PATCH", body: ... })
    auth.setUser({ ...auth.user, name })
  }

  const isAuthenticated = computed(() => auth.isAuthenticated)
  const user = computed(() => auth.user)

  return {
    login, register, logout, updateProfile,
    isAuthenticated, user,
    loading, error
  }
}
