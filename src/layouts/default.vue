<template>
  <AppDrawer />
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-main>
  <AppNotification />
</template>

<script setup>
import { useTitle } from '@vueuse/core'
const route = useRoute()
const title = computed(() => {
  let title = route.meta?.title || route.matched[0].meta?.title || ''
  if (title === 'Home' || title === 'home') title = null
  return title
    ? `Dungeons And Dragons Tools - ${title}`
    : 'Dungeons And Dragons Tools'
})
useTitle(title)
</script>

<style scoped>
.v-main {
  padding-top: 0;
  margin-top: var(--v-layout-top);
  padding-bottom: 0;
  margin-bottom: var(--v-layout-bottom);
  height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
  overflow-y: overlay;
  transition-property: padding;
}
</style>
