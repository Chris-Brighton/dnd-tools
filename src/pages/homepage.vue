<template>
  <v-page title="D&D">
    <v-card>
      <v-card-title>D&D</v-card-title>
      <v-card-text>
        <v-btn text="Click" @click="click" />
      </v-card-text>
    </v-card>
  </v-page>
</template>

<script setup>
const { monster } = useApi()
definePage({
  meta: {
    icon: 'mdi-home',
    title: 'D&D',
    drawerIndex: 0,
  },
})
async function click() {
  const res = await monster('/test', {})
}
</script>

<style></style>
