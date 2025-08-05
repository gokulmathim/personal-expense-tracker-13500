<template>
  <section>
    <div class="header-row">
      <h1>Expenses</h1>
      <button class="accent" @click="showAdd = true">+ Add Expense</button>
    </div>
    <form class="filter-row" @submit.prevent>
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
      </select>
      <input v-model="filterText" type="text" placeholder="Search..." />
    </form>
    <div class="expense-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name/Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="exp in filteredExpenses" :key="exp.id">
            <td>{{ exp.date }}</td>
            <td>{{ exp.name }}</td>
            <td>{{ exp.category }}</td>
            <td>${{ exp.amount }}</td>
            <td>
              <button @click="editExpense(exp)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ExpenseModal
      v-if="showAdd"
      :categories="categories"
      @submit="addExpense"
      @close="showAdd = false"
    />
    <ExpenseModal
      v-if="editItem"
      :categories="categories"
      :expense="editItem"
      @submit="updateExpense"
      @close="editItem = null"
    />
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import ExpenseModal from '~/components/expenses/ExpenseModal.vue'
const showAdd = ref(false)
const editItem = ref(null)
const filterText = ref('')
const selectedCategory = ref('')
const categories = ['Food', 'Transport', 'Shopping', 'Housing', 'Other']
let nextId = 1
const expenses = ref([
  { id: nextId++, date: '2024-04-10', name: 'Groceries', category: 'Food', amount: 80.87 },
  { id: nextId++, date: '2024-04-11', name: 'Uber', category: 'Transport', amount: 23 },
])
const filteredExpenses = computed(() => {
  return expenses.value.filter(exp =>
    (selectedCategory.value === '' || exp.category === selectedCategory.value) &&
    (filterText.value === '' ||
    exp.name.toLowerCase().includes(filterText.value.toLowerCase()) ||
    exp.category.toLowerCase().includes(filterText.value.toLowerCase()))
  )
})
function addExpense(data: any) {
  expenses.value.push({ ...data, id: nextId++ })
  showAdd.value = false
}
function editExpense(exp) {
  editItem.value = { ...exp }
}
function updateExpense(newData) {
  const idx = expenses.value.findIndex(e => e.id === newData.id)
  if (idx !== -1) expenses.value[idx] = newData
  editItem.value = null
}
</script>
<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2vw;
}

.filter-row {
  display: flex;
  gap: 1.2em;
  align-items: center;
  margin: 1.5em 0 2em;
}

.filter-row input, .filter-row select {
  padding: 0.43em 1em;
  border-radius: 8px;
  border: 1.2px solid #e2e2e2;
  min-width: 150px;
}

button.accent {
  background: var(--accent);
  border: none;
  color: #222;
  font-weight: bold;
  border-radius: 6px;
  font-size: 1.05em;
  padding: 0.7em 1.45em;
  cursor: pointer;
  box-shadow: 0 1px 3px var(--primary, #1976D2, 0.06);
  transition: filter 0.06s;
}
button.accent:hover {
  filter: brightness(1.1);
}
.expense-table {
  background: #fff;
  border-radius: 12px;
  padding: 1.6em;
  box-shadow: 0 1px 8px rgba(20,20,60,0.06);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1em;
}
th, td {
  text-align: left;
  padding: 0.8em 1em;
}
th {
  color: var(--secondary);
  font-weight: 700;
  border-bottom: 2px solid #e9e9e9;
}
tr + tr {
  border-top: 1px solid #f2f2f2;
}
tbody tr:hover {
  background: #fcfcfc;
}
td:last-child {
  text-align: right;
}
</style>
