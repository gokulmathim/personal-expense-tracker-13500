<template>
  <svg viewBox="0 0 80 80" width="110" height="110">
    <g>
      <template v-for="(seg, idx) in segments" :key="idx">
        <path
          :d="describeArc(40, 40, 36, seg.start, seg.end)"
          :fill="seg.color"
          stroke="#fff"
          stroke-width="1.6"
        />
      </template>
    </g>
  </svg>
  <div class="legend">
    <div v-for="seg in segments" :key="seg.label" class="legend-item">
      <span class="color-box" :style="{background: seg.color}"></span>
      <span>{{ seg.label }} (${{ seg.value }})</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  data: { type: Array, default: () => [] }
})
const colors = ["#FFB300", "#1976D2", "#56B8D7", "#22BAAA", "#F57C00", "#C7B28C"]
let total = 0
const segments = []
if(props.data.length) {
  total = props.data.reduce((sum, itm) => sum + itm.amount, 0) || 1
  let lastAngle = 0
  for(let i=0; i < props.data.length; ++i) {
    const v = props.data[i]
    const angle = (v.amount / total) * 360
    segments.push({
      start: lastAngle,
      end: lastAngle + angle,
      color: colors[i % colors.length],
      value: v.amount,
      label: v.category
    })
    lastAngle += angle
  }
}
function describeArc(x, y, radius, startAngle, endAngle) {
  const rad = Math.PI / 180
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1"
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
    "L", x, y,
    "Z"
  ].join(" ")
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
</script>
<style scoped>
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-top: 0.2em;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: var(--secondary);
}
.color-box {
  width: 17px; height:17px;
  display: inline-block;
  border-radius: 4px;
  margin-right: 2px;
  border: 1px solid #eee;
}
</style>
