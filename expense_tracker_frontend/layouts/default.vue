<template>
  <div class="layout-root">
    <BaseSidebar :showLogout="isAuthenticated" @logout="handleLogout" />
    <main class="page-main">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import BaseSidebar from '~/components/BaseSidebar.vue'
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
const isAuthenticated = auth.isAuthenticated
function handleLogout() {
  auth.logout()
}
</script>
<style scoped>
.layout-root {
  display: flex;
  min-height: 100vh;
  background: var(--bg, #F9FAFB);
}

.page-main {
  flex: 1;
  min-width: 0;
  padding: 3vw 4vw 3vw calc(var(--sidebar-width) + 2vw);
}

@media (max-width: 900px) {
  .layout-root {
    flex-direction: column;
  }
  .page-main {
    padding: 2vw 3vw;
  }
}
</style>
