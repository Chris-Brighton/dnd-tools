<template>
  <v-row>
    <v-col cols="2" class="d-flex justify-center">
      <dnd-stat label="Strength" :value="strength" @click="click" />
    </v-col>
    <v-col cols="2" class="d-flex justify-center">
      <dnd-stat label="Dexterity" :value="dexterity" @click="click" />
    </v-col>
    <v-col cols="2" class="d-flex justify-center">
      <dnd-stat label="Constitution" :value="constitution" @click="click" />
    </v-col>
    <v-col cols="2" class="d-flex justify-center">
      <dnd-stat label="Intelligence" :value="intelligence" @click="click" />
    </v-col>
    <v-col cols="2" class="d-flex justify-center">
      <dnd-stat label="Wisdom" :value="wisdom" @click="click" />
    </v-col>
    <v-col cols="2" class="d-flex justify-center">
      <dnd-stat label="Charisma" :value="charisma" @click="click" />
    </v-col>
  </v-row>
</template>

<script setup>
const emits = defineEmits('roll')
const props = defineProps({
  strength: {
    type: [String, Number],
    required: true,
  },
  dexterity: {
    type: [String, Number],
    required: true,
  },
  constitution: {
    type: [String, Number],
    required: true,
  },
  intelligence: {
    type: [String, Number],
    required: true,
  },
  wisdom: {
    type: [String, Number],
    required: true,
  },
  charisma: {
    type: [String, Number],
    required: true,
  },
})

function click(data) {
  emits('roll', data)
}
</script>
