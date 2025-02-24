<template>
  <sup>{{ sup }}</sup>
  &frasl;
  <sub>{{ sub }}</sub>
</template>

<script setup>
const props = defineProps({
  sup: {
    type: [String, Number],
    required: true,
  },
  sub: {
    type: [String, Number],
    required: true,
  },
})
</script>
