<template>
  <v-page title="D&D">
    <v-card>
      <v-card-text v-if="needToPreload">
        <v-alert color="info" icon="mdi-help-circle">
          <v-alert-title>Preload Data</v-alert-title>
          To use the application it needs to do it's initial setup. This
          required an internet connection to download all the information
          required
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn text="Preload Data" :to="{ name: '/config' }" />
            </v-col>
          </v-row>
        </v-alert>
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

const needToPreload = ref(false)

async function createDefaults() {
  await file.write('config', {
    preload: false,
    wildshape: {
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      proficiencyBonus: 0,
      saves: {
        strength: false,
        dexterity: false,
        constitution: false,
        intelligence: false,
        wisdom: false,
        charisma: false,
      },
    },
  })
}

onBeforeMount(async () => {
  const exists = await file.exists('config')
  if (!exists) {
    await createDefaults()
  }
  const config = await file.read('config')
  needToPreload.value = !config.preload
})
</script>

<style></style>
