import { computed } from "vue"
import { useExpenses } from './useExpenses'

/**
 * Generates summary and graph/report data from expenses.
 */
export function useReports() {
  const { expenses, byCategory, byMonth } = useExpenses()

  // PUBLIC_INTERFACE
  const monthlySpending = computed(() => byMonth.value)
  // PUBLIC_INTERFACE
  const categorySpending = computed(() => byCategory.value)
  // PUBLIC_INTERFACE
  const totalExpenses = computed(() => expenses.value.reduce((sum, e) => sum + Number(e.amount), 0))
  // PUBLIC_INTERFACE
  const transactionCount = computed(() => expenses.value.length)
  // PUBLIC_INTERFACE
  const biggestExpense = computed(() =>
    expenses.value.length ? Math.max(...expenses.value.map(e => Number(e.amount))) : 0
  )
  // PUBLIC_INTERFACE
  function generateAdvancedReport(params = {}) {
    // Placeholder for generating advanced reports (trend analysis, time windows, custom logic) --
    // Connect to backend API as needed!
    return {}
  }

  return {
    monthlySpending,
    categorySpending,
    totalExpenses,
    transactionCount,
    biggestExpense,
    generateAdvancedReport,
  }
}
