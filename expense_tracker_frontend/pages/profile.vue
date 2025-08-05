<template>
  <section>
    <h1>User Profile</h1>
    <div v-if="isAuthenticated">
      <div class="desc">Logged in as <b>{{ user.name || user.email }}</b></div>
      <form @submit.prevent="updateProfile">
        <label>
          Name:
          <input v-model="editName" placeholder="Your name" />
        </label>
        <button class="accent" type="submit">Update</button>
      </form>
      <button class="logout" @click="logout">Logout</button>
    </div>
    <div v-else class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" autocomplete="username" required />
        <input v-model="password" type="password" placeholder="Password" autocomplete="current-password" required />
        <button class="accent" type="submit">Login</button>
        <button class="secondary" @click="showRegister = true" type="button">Create Account</button>
      </form>
      <div v-if="showRegister" class="register-modal">
        <h3>Create Account</h3>
        <form @submit.prevent="register">
          <input v-model="regEmail" type="email" placeholder="Email" required />
          <input v-model="regName" type="text" placeholder="Name" required />
          <input v-model="regPassword" type="password" placeholder="Password" required />
          <button class="accent" type="submit">Register</button>
        </form>
        <button @click="showRegister = false" class="secondary">Close</button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
const isAuthenticated = computed(() => auth.isAuthenticated)
const user = computed(() => auth.user || {})
const editName = ref(user.value.name)
function updateProfile() {
  auth.setUser({ ...user.value, name: editName.value })
}
function logout() {
  auth.logout()
}
const showRegister = ref(false)
const email = ref('')
const password = ref('')
const regEmail = ref('')
const regName = ref('')
const regPassword = ref('')
function login() {
  // Demo only: just "logs in" a user for frontend functionality; real app should call backend
  auth.login({ id: "1", name: "Demo", email: email.value }, "demo-token")
}
function register() {
  // Fake register, sets as logged in user
  auth.login({ id: "2", name: regName.value, email: regEmail.value }, "demo-token")
  showRegister.value = false
}
</script>
<style scoped>
.desc {
  margin-bottom: 1.2em;
  color: var(--secondary);
}
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
input {
  padding: 0.5em 1em;
  border-radius: 7px;
  border: 1.2px solid #e2e2e2;
  font-size: 1em;
}
button.accent {
  background: var(--accent);
  border: none;
  color: #222;
  font-weight: bold;
  border-radius: 6px;
  font-size: 1.08em;
  padding: 0.7em 2em;
  cursor: pointer;
}
button.secondary {
  background: #eee;
  color: var(--secondary);
  border: none;
  border-radius: 6px;
  font-size: 1.08em;
  padding: 0.7em 2em;
  margin-top: 0.5em;
}
button.logout {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  font-size: 1.04em;
  margin-top: 2em;
  padding: 0.65em 2em;
}
.login-card {
  background: #fff;
  box-shadow: 0 1px 6px #ececec;
  border-radius: 16px;
  padding: 2.3em 2.6em;
  max-width: 340px;
  margin-top: 1.5em;
}
.register-modal {
  margin-top: 1.4em;
  background: #fbfbfb;
  box-shadow: 0 0.5px 4px #e6e6fa;
  border-radius: 10px;
  padding: 2em 1.4em;
}
</style>
