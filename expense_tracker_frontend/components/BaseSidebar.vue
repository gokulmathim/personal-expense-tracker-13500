<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <span class="logo">💰 Tracker</span>
    </header>
    <nav>
      <ul>
        <li v-for="item in nav" :key="item.route">
          <NuxtLink
            :to="item.route"
            :class="{active: $route.path.startsWith(item.route)}"
            exact-active-class="active"
          >
            <span class="icon">{{ item.icon }}</span>
            <span class="lbl">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <NuxtLink to="/profile" class="profile-link">
        <span class="icon">👤</span>
        <span class="lbl">Profile</span>
      </NuxtLink>
      <button @click="$emit('logout')" class="logout" v-if="showLogout">
        <span class="icon">🚪</span> Logout
      </button>
    </div>
  </aside>
</template>
<script setup lang="ts">
const props = defineProps({
  showLogout: { type: Boolean, default: false }
});
const nav = [
  { label: 'Dashboard', route: '/', icon: '🏠' },
  { label: 'Expenses', route: '/expenses', icon: '💸' },
  { label: 'Reports', route: '/reports', icon: '📊' },
  { label: 'Categories', route: '/categories', icon: '🏷️' },
];
</script>
<style scoped>
.sidebar {
  background: #fff;
  border-right: 1.5px solid #eee;
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 90;
  box-shadow: 0 1px 12px rgba(40,40,40,.08);
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  font-weight: 900;
  font-size: 1.25em;
  color: var(--primary);
  letter-spacing: 0.2em;
  text-align: left;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-bottom: 10px;
}

nav a {
  display: flex;
  align-items: center;
  padding: 0.75em 2em 0.75em 1.5em;
  border-radius: 0 20px 20px 0;
  color: var(--secondary);
  font-weight: 500;
  transition: background 0.12s, color 0.12s;
  font-size: 1.02em;
  gap: 0.75em;
}

nav a.active, nav a:active {
  background: var(--primary);
  color: #fff;
}

nav a:hover {
  background: var(--accent);
  color: var(--secondary);
}

.icon {
  font-size: 1.18em;
  min-width: 1.7em;
  text-align: center;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1.2rem 1rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.profile-link {
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.6em 1em;
  border-radius: 8px;
  font-size: 0.99em;
  transition: background 0.12s,color 0.12s;
}

.profile-link:hover {
  background: var(--primary);
  color: #fff;
}

.logout {
  background: transparent;
  border: none;
  color: var(--secondary);
  font: inherit;
  padding: 0.6em 1em;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 0.99em;
  cursor: pointer;
  transition: background 0.12s,color 0.12s;
}
.logout:hover {
  background: var(--accent);
  color: var(--secondary);
}
@media (max-width: 900px) {
  .sidebar {
    position: static;
    width: 100vw;
    height: auto;
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #eee;
    flex-wrap: wrap;
    box-shadow: 0 2px 12px rgba(17,17,27,0.04);
  }
  nav ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5em;
  }
  nav a {
    border-radius: 10px;
    padding: 0.8em 1em;
  }
  .sidebar-header, .sidebar-footer {
    display: none;
  }
}
</style>
