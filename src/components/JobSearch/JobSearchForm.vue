<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ActionButton from '@/components/Shared/ActionButton.vue'
import { ref } from 'vue'
import TextInput from '@/components/Shared/TextInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const location = ref('')
const role = ref('')

function searchForJobs() {
  router.push({
    name: 'JobResults',
    query: { role: role.value, location: location.value }
  })
}
</script>
<template>
  <form
    class="flex w-full items-center border border-solid border-brand-gray-3 rounded-3xl"
    action="#"
    @submit.prevent="searchForJobs"
  >
    <FontAwesomeIcon :icon="['fas', 'search']" class="ml-4 mr-4" />
    <div class="flex flex-1 flex-nowrap text-base font-light">
      <div class="flex flex-1 items-center pr-3 relative">
        <label for="role" class="absolute left-0 -top-10">Role</label>
        <TextInput id="role" v-model="role" placeholder="Software engineer" />
      </div>
      <span class="flex items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3">
        in
      </span>
      <div class="flex flex-1 relative items-center pl-3">
        <label for="location" class="absolute left-0 -top-10">Where?</label>
        <TextInput id="location" v-model="location" placeholder="Toronto" />
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl -mr-0.5" />
  </form>
</template>

<style lang="scss" scoped></style>
