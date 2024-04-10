<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import nextElementInList from '@/utils/nextElementInList'

const actions = ref(['Build', 'Create', 'Design', 'Code'])

const action = ref(actions.value[0])
const actionClasses = computed(() => {
  return { [action.value.toLowerCase()]: true }
})

const interval = ref<ReturnType<typeof setInterval>>()

onMounted(() => {
  changeTitle()
})
onBeforeUnmount(() => {
  clearInterval(interval.value)
})

function changeTitle() {
  interval.value = setInterval(() => {
    action.value = nextElementInList(actions.value, action.value)
  }, 3000)
}
</script>
<template>
  <section class="mb-14">
    <h1 class="text-8xl font-bold tracking-tighter mb-14">
      <span class="block leading-snug">
        <span class="block" :class="actionClasses">
          <span> {{ action }}</span>
        </span>
      </span>
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp.</h2>
  </section>
</template>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93035;
}
</style>
