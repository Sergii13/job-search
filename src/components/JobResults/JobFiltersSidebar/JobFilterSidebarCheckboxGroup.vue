<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  uniqueValues: { type: [Set<string>, Array<string>], required: true },
  action: { type: Function, required: true }
})

const userStore = useUserStore()
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === 'clearUserJobFilterSelections') {
      selectedValues.value = []
    }
  })
})

const router = useRouter()

const selectedValues = ref<string[]>([])

function selectValue() {
  props.action(selectedValues.value)
  router.push({ name: 'JobResults' })
}
</script>

<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="uniqueValue in uniqueValues" :key="uniqueValue" class="h-8 w-1/2">
          <input
            :id="uniqueValue"
            v-model="selectedValues"
            :value="uniqueValue"
            class="mr-3"
            type="checkbox"
            @change="selectValue"
          />
          <label :for="uniqueValue">{{ uniqueValue }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<style scoped></style>
