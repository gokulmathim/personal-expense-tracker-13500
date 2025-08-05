<template>
  <div class="modal-bg">
    <div class="modal">
      <form @submit.prevent="submitForm">
        <h3 v-if="!isEdit">Add Expense</h3>
        <h3 v-else>Edit Expense</h3>
        <input v-model="local.date" type="date" required />
        <input v-model="local.name" type="text" required placeholder="Expense Name/Description" />
        <select v-model="local.category" required>
          <option value="">Select Category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <input v-model.number="local.amount" type="number" step="0.01" min="0.01" required placeholder="Amount" />
        <div class="actions">
          <button class="accent" type="submit">{{ isEdit ? "Save" : "Add" }}</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps({
  categories: { type: Array, required: true },
  expense: { type: Object, default: null }
})
const emit = defineEmits(['submit', 'close'])
const isEdit = props.expense != null
const local = ref(props.expense
  ? { ...props.expense }
  : { date: '', name: '', category: '', amount: null }
)
watch(() => props.expense, (val) => {
  if (val) local.value = { ...val }
  else local.value = { date: '', name: '', category: '', amount: null }
})
function submitForm() {
  emit('submit', { ...local.value, id: props.expense?.id || undefined })
}
</script>
<style scoped>
.modal-bg {
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(30,32,34,0.10);
  z-index:1110;
  display:flex;
  justify-content:center;
  align-items:center;
}
.modal {
  background: white;
  border-radius: 14px;
  min-width: 300px;
  max-width:97vw;
  box-shadow: 0 1px 20px #eeeeff;
  padding: 2em 2.2em 2em;
}
form {
  display:flex;
  flex-direction:column;
  gap: 1.2em;
}
input, select {
  padding: 0.47em 1em;
  border: 1.2px solid #e2e2e2;
  border-radius: 8px;
  font-size:1em;
}
.actions {
  display:flex;
  gap:1em;
  justify-content:right;
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
button[type="button"] {
  background: #eee;
  color: #222;
  border: none;
  border-radius: 6px;
  padding: 0.67em 1.7em;
}
</style>
