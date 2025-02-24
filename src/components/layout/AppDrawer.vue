<template>
  <v-navigation-drawer v-model="drawer" rail expand-on-hover permanent>
    <template #prepend>
      <v-list>
        <v-list-item class="pa-1">
          <template #prepend>
            <v-icon
              icon="custom:dnd"
              size="x-large"
              class="drawer-header-icon"
              color="primary"
            />
          </template>
          <v-list-item-title class="font-weight-bold" style="line-height: 2rem">
            Dungeons & Dragons Tools
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
    <v-list nav density="compact">
      <AppDrawerItem v-for="route in routes" :key="route.name" :item="route" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { routes } from 'vue-router/auto-routes'

const appStore = useAppStore()
const { drawer: drawerStored } = storeToRefs(appStore)

const { mobile, lgAndUp, width } = useDisplay()
const drawer = computed({
  get() {
    return drawerStored.value || !mobile.value
  },
  set(val: boolean) {
    drawerStored.value = val
  },
})
const rail = computed(() => !drawerStored.value && !mobile.value)
routes.sort((a, b) => (a.meta?.drawerIndex ?? 99) - (b.meta?.drawerIndex ?? 98))

nextTick(() => {
  drawerStored.value = lgAndUp.value && width.value !== 1280
})
</script>

<style></style>
