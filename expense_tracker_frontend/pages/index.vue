<template>
  <section>
    <h1>Expense Dashboard</h1>
    <div class="widgets">
      <SummaryWidget
        v-for="item in summaryItems"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :icon="item.icon"
      />
    </div>
    <div class="charts">
      <div class="card">
        <h3>Monthly Spending</h3>
        <ExpenseBarChart :data="monthlySpending" />
      </div>
      <div class="card">
        <h3>Spending by Category</h3>
        <ExpensePieChart :data="categorySpending" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import SummaryWidget from '~/components/widgets/SummaryWidget.vue'
import ExpenseBarChart from '~/components/charts/ExpenseBarChart.vue'
import ExpensePieChart from '~/components/charts/ExpensePieChart.vue'
const summaryItems = [
  { label: "This Month", value: "$1,250.80", icon: "💳" },
  { label: "Categories", value: "5", icon: "🏷️" },
  { label: "Transactions", value: "31", icon: "💸" },
  { label: "Biggest Expense", value: "$295", icon: "⚡" },
]
// Placeholder data for bar chart/monthly spending
const monthlySpending = [
  { month: "Jan", amount: 800 },
  { month: "Feb", amount: 925 },
  { month: "Mar", amount: 720 },
  { month: "Apr", amount: 1230 }
]
// Placeholder data for pie chart/category breakdown
const categorySpending = [
  { category: "Food", amount: 520 },
  { category: "Transport", amount: 212 },
  { category: "Housing", amount: 320 },
  { category: "Shopping", amount: 109 },
  { category: "Other", amount: 89 }
]
</script>
<style scoped>
.widgets {
  display: flex;
  gap: 2rem;
  margin: 2rem 0 2.5rem;
  flex-wrap: wrap;
}
.charts {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.card {
  background: #fff;
  border-radius: 1.1em;
  box-shadow: 0 1px 8px rgba(22,31,60,0.08);
  padding: 1.2em 1.5em;
  min-width: 320px;
  flex: 1 1 340px;
  margin-bottom: 2rem;
}
</style>
