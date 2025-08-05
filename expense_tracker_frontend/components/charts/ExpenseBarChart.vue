<template>
  <div class="bar-chart">
    <div v-for="item in data" :key="item.month" class="bar-wrap">
      <div class="bar" :style="{height: (item.amount / max) * 100 + '%'}"></div>
      <div class="label">{{ item.month }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  data: { type: Array, default: () => [] }
})
const max = Math.max(...props.data.map(x => x.amount), 1)
</script>
<style scoped>
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 17px;
  height: 170px;
  margin-top: 1em;
}
.bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 36px;
  min-width: 36px;
}
.bar {
  width: 86%;
  background: linear-gradient(110deg, var(--primary) 70%, var(--accent));
  border-radius: 10px 10px 4px 4px;
  transition: height 0.14s;
  min-height: 8px;
}
.label {
  margin-top: 0.6em;
  font-size: 0.94em;
  color: var(--secondary);
}
</style>
