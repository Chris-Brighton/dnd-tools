<template>
  <div class="px-8 pt-4 pb-12 w-100">
    <v-row no-gutters>
      <v-col cols="8" class="d-flex justify-start align-center">
        <h1>{{ title }}</h1>
      </v-col>
      <v-col cols="4" class="d-flex justify-end align-start">
        <slot name="actions" :location="'top'" />
      </v-col>
    </v-row>

    <v-divider class="mb-4" color="primary" />
    <div class="w-100 h-100 d-flex flex-column ga-10">
      <slot name="default" />
    </div>
    <v-row class="mt-6">
      <v-col cols="12" class="d-flex justify-end align-start">
        <slot name="actions" :location="'bottom'" />
      </v-col>
    </v-row>
    <v-overlay
      persistent
      :model-value="loading || isLoading"
      class="d-flex justify-center align-center flex-column"
    >
      <div class="d-flex justify-center align-center flex-column">
        <v-progress-circular
          indeterminate
          color="primary"
          size="x-large"
          width="10"
        />
        <v-chip v-if="loadingText" color="surface" variant="flat" class="mt-4">
          {{ loadingText }}
        </v-chip>
      </div>
    </v-overlay>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isLoading = ref(false)
const loadingText = ref()

const pageLoading = (v, text = null) => {
  isLoading.value = v
  loadingText.value = text
}

provide('pageLoading', pageLoading)
</script>
