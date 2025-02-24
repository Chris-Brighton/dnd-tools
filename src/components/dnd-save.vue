<template>
  <div class="save-display">
    <v-img :src="svg" class="save-svg" />
    <div class="save-block">
      <div class="save-stat">{{ label }}</div>
      <button v-ripple class="save-btn">{{ modifier }}</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  proficient: {
    type: Boolean,
    default: false,
  },
  proficiencyBonus: {
    type: [String, Number],
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
})

const svg = computed(() => {
  if (props.proficient) return '/svg/save-prof.svg'
  return '/svg/save.svg'
})

const modifier = computed(() => {
  let bonus = Math.floor((Number(props.value) - 10) / 2)
  if (props.proficient) {
    bonus += Number(props.proficiencyBonus)
  }
  if (bonus > 0) {
    return `+${bonus.toString()}`
  }
  return bonus.toString()
})
</script>

<style scoped>
.save-display {
  width: 120px;
  height: 34px;
  position: relative;
}
.save-svg {
  position: absolute;
  height: 34px;
  width: 120px;
  top: 0;
  left: 0;
}
.save-block {
  position: absolute;
  height: 34px;
  width: 120px;
  top: 0;
  left: 0;
  display: flex;
}

.save-stat {
  height: 34px;
  width: 80px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
}
.save-btn {
  height: 34px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  border-radius: 50%;
}
</style>
