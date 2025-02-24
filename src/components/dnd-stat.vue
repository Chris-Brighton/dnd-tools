<template>
  <div class="stat-display">
    <v-img class="stat-svg" src="/svg/stat.svg" width="81" height="95" />
    <div class="stat-block">
      <div class="stat-title">{{ label }}</div>
      <div class="stat-modifier">
        <button v-ripple class="stat-modifier-btn" @click="click">
          {{ modifier }}
        </button>
      </div>
      <div class="stat-value">{{ value }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
})

const emits = defineEmits(['roll'])

const modifier = computed(() => {
  const mul = Math.floor((Number(props.value) - 10) / 2)
  if (mul < 0) return mul.toString()
  return `+${mul}`
})

function click() {
  emits('roll', {
    stat: props.label.toLowerCase(),
    modifier: Math.floor((Number(props.value) - 10) / 2),
  })
}
</script>

<style scoped>
.stat-display {
  width: 81px;
  height: 95px;
  position: relative;
}
.stat-svg {
  position: absolute !important;
  top: 0;
  left: 0;
}
.stat-block {
  position: absolute !important;
  top: 0;
  left: 0;
}
.stat-title {
  width: 81px;
  height: 26.2px;
  padding-top: 4px;
  display: flex;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
}
.stat-modifier {
  width: 81px;
  height: 37.2px;
  font-size: 26px;
  font-weight: 500;
  display: flex;
  justify-content: center;
}
.stat-modifier-btn {
  height: 34px;
  width: 60px;
  align-items: center;
  background-color: transparent;
  border: 1px solid #bfccd6;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
}
.stat-value {
  font-size: 16px;
  font-weight: 700;
  width: 81px;
  height: 31.61px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
