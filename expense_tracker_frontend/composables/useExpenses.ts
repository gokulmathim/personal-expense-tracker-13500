import { ref, computed } from 'vue'

/**
 * API URL for expenses - update this to match the backend endpoint.
 * Example: `${import.meta.env.VITE_API_URL || '/api'}/expenses`
 */
const API_BASE = '/api' // Replace with your backend base API URL

export function useExpenses() {
  const expenses = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  // Categories can come from backend or static fallback
  const categories = ref<string[]>(['Food', 'Transport', 'Shopping', 'Housing', 'Other'])

  // PUBLIC_INTERFACE
  async function fetchExpenses() {
    loading.value = true
    error.value = null
    try {
      // Replace with actual fetch call
      // const res = await fetch(`${API_BASE}/expenses`)
      // expenses.value = await res.json()
      // For FE demo, use local
      // noop: logic should be a direct API call in prod
    } catch (e) {
      error.value = 'Failed to load expenses'
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function addExpense(exp) {
    // const res = await fetch(`${API_BASE}/expenses`, { method: "POST", body: JSON.stringify(exp) })
    // const newExp = await res.json();
    // expenses.value.push(newExp)
    expenses.value.push({ ...exp, id: Date.now() })
  }
  // PUBLIC_INTERFACE
  async function editExpense(updatedExp) {
    // await fetch(`${API_BASE}/expenses/${updatedExp.id}`, { method: "PUT", body: JSON.stringify(updatedExp) })
    const idx = expenses.value.findIndex(e => e.id === updatedExp.id)
    if (idx !== -1) expenses.value[idx] = updatedExp
  }
  // PUBLIC_INTERFACE
  async function removeExpense(id) {
    // await fetch(`${API_BASE}/expenses/${id}`, { method: "DELETE" })
    expenses.value = expenses.value.filter(e => e.id !== id)
  }

  // PUBLIC_INTERFACE
  async function fetchCategories() {
    // const res = await fetch(`${API_BASE}/categories`);
    // categories.value = await res.json();
  }
  // PUBLIC_INTERFACE
  async function addCategory(newCat: string) {
    if (!categories.value.includes(newCat)) categories.value.push(newCat)
    // await fetch(`${API_BASE}/categories`, { method: "POST", body: JSON.stringify({ name: newCat }) })
  }
  // PUBLIC_INTERFACE
  async function removeCategory(cat: string) {
    categories.value = categories.value.filter(c => c !== cat && c !== 'Other')
    // await fetch(`${API_BASE}/categories/${cat}`, { method: "DELETE" })
  }

  // Useful for dashboard summaries
  const thisMonthTotal = computed(() => {
    const now = new Date()
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    return expenses.value
      .filter(e => e.date && e.date.startsWith(ym))
      .reduce((sum, e) => sum + Number(e.amount), 0)
  })
  const byCategory = computed(() => {
    const catMap = {}
    for (const exp of expenses.value) {
      catMap[exp.category] = (catMap[exp.category] || 0) + Number(exp.amount)
    }
    return Object.entries(catMap).map(([category, amount]) => ({ category, amount }))
  })
  const byMonth = computed(() => {
    const monthMap = {}
    for (const exp of expenses.value) {
      if (!exp.date) continue
      const m = exp.date.substring(0, 7)
      monthMap[m] = (monthMap[m] || 0) + Number(exp.amount)
    }
    // Return formatted { month, amount } sorted ascending by date
    return Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount }))
  })

  return {
    expenses, loading, error,
    fetchExpenses, addExpense, editExpense, removeExpense,
    categories, fetchCategories, addCategory, removeCategory,
    thisMonthTotal, byCategory, byMonth,
  }
}
