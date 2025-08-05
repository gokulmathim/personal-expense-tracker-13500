<template>
  <section>
    <h1>Expense Reports</h1>
    <div class="report-container">
      <div class="report-card">
        <h3>Monthly Spending</h3>
        <ExpenseBarChart :data="monthlySpending" />
      </div>
      <div class="report-card">
        <h3>By Category</h3>
        <ExpensePieChart :data="categorySpending" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import ExpenseBarChart from '~/components/charts/ExpenseBarChart.vue'
import ExpensePieChart from '~/components/charts/ExpensePieChart.vue'
const monthlySpending = [
  { month: "Jan", amount: 800 },
  { month: "Feb", amount: 925 },
  { month: "Mar", amount: 720 },
  { month: "Apr", amount: 1230 }
]
const categorySpending = [
  { category: "Food", amount: 520 },
  { category: "Transport", amount: 212 },
  { category: "Housing", amount: 320 },
  { category: "Shopping", amount: 109 },
  { category: "Other", amount: 89 }
]
</script>
<style scoped>
.report-container {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}
.report-card {
  background: #fff;
  border-radius: 1.1em;
  box-shadow: 0 1px 8px rgba(22,31,60,0.08);
  padding: 1.2em 2em;
  min-width: 330px;
  flex: 1 1 340px;
  margin-bottom: 2em;
}
</style>
