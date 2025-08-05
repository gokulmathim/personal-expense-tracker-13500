<template>
  <section>
    <div class="header-row">
      <h1>Categories</h1>
      <button class="accent" @click="showAdd = true">+ Add Category</button>
    </div>
    <ul class="cat-list">
      <li v-for="cat in categories" :key="cat">
        <span class="cat-chip">{{ cat }}</span>
        <button @click="removeCategory(cat)" v-if="cat !== 'Other'" class="del">&times;</button>
      </li>
    </ul>
    <div v-if="showAdd" class="cat-modal">
      <form @submit.prevent="addCategory">
        <input v-model="newCat" type="text" placeholder="Category Name" />
        <button class="accent" type="submit">Add</button>
        <button @click="showAdd = false" type="button">Cancel</button>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const showAdd = ref(false)
const newCat = ref('')
const categories = ref(['Food', 'Transport', 'Shopping', 'Housing', 'Other'])
function addCategory() {
  const n = newCat.value.trim()
  if (n && !categories.value.includes(n)) {
    categories.value.push(n)
  }
  showAdd.value = false
  newCat.value = ''
}
function removeCategory(cat: string) {
  categories.value = categories.value.filter(c => c !== cat)
}
</script>
<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2em;
}
.cat-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 2em;
  list-style: none;
  padding: 0;
}
.cat-chip {
  background: var(--primary);
  color: #fff;
  padding: 0.5em 1.2em;
  border-radius: 20px;
  font-size: 1.06em;
  margin-right: 0.5em;
  font-weight: 500;
}
.del {
  background: transparent;
  border: none;
  color: var(--accent);
  font-size: 1.35em;
  cursor: pointer;
  font-weight: bold;
  margin-left: 0.3em;
}
.cat-modal {
  background: #fefefe;
  box-shadow: 0 1px 10px #eaeaea;
  border-radius: 12px;
  padding: 2em 1em 1.5em;
  width: 330px;
  max-width: 96vw;
}
.cat-modal form {
  display: flex;
  gap: 1em;
}
.cat-modal input {
  flex: 1 1 110px;
  padding: 0.4em 1em;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.cat-modal button {
  font-size: 1em;
  border-radius: 6px;
  padding: 0.35em 1.1em;
  margin: 0;
  border: none;
  background: var(--accent);
  color: #333;
  cursor: pointer;
}
.cat-modal button[type="button"] {
  background: #eee;
  color: #222;
}
</style>
