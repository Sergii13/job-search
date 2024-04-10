<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-row justify-between w-full gap-2">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <ActionButton
        text="Clear filters"
        type="secondary"
        @click="userStore.clearUserJobFilterSelections"
      />
    </div>
  </div>
</template>
