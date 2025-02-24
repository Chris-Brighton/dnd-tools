<template>
  <v-page title="D&D">
    <v-card>
      <v-card-title>D&D</v-card-title>
      <v-card-text>
        <v-btn @click="write">Write File</v-btn>
        <v-btn @click="read">Read File</v-btn>
      </v-card-text>
    </v-card>
  </v-page>
</template>

<script setup>
const file = useFile()
definePage({
  meta: {
    icon: 'mdi-home',
    title: 'Home',
    drawerIndex: 0,
  },
})

function write() {
  file.write('test', { test: 'data' })
}

async function read() {
  const data = await file.read('test')
  console.log(data)
}
</script>

<style></style>
