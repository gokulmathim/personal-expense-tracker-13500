<template>
  <div class="widget">
    <span class="icon">{{ icon }}</span>
    <div class="info">
      <div class="value">{{ value }}</div>
      <div class="lbl">{{ label }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps(['icon', 'label', 'value'])
</script>
<style scoped>
.widget {
  background: #fff;
  border-radius: 1em;
  box-shadow: 0 1px 8px rgba(22,31,60,0.08);
  padding: 1.1em 2em;
  min-width: 155px;
  flex: 1 1 170px;
  display: flex;
  align-items: center;
  gap: 1.1em;
}
.icon {
  font-size: 2.07em;
}
.info .value {
  font-size: 1.3em;
  font-weight: 700;
}
.info .lbl {
  color: var(--text-muted);
  font-size: 1em;
}
</style>
