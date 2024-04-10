<script setup lang="ts">
import { ref } from 'vue'
import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubNav from '@/components/Navigation/TheSubNav.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const company = ref('Careers Search')
const menuItems = ref([
  {
    link: '/teams',
    text: 'Teams'
  },
  {
    link: '/',
    text: 'Location'
  },
  {
    link: '/',
    text: 'Students'
  },
  {
    link: '/jobs/results',
    text: 'Jobs'
  }
])

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
</script>
<template>
  <header class="w-full text-sm">
    <div class="sticky w-full top-0 left-0 py-5 border-b border-solid border-brand-gray-1">
      <div class="w-full bg-white container mx-auto">
        <div class="flex flex-nowrap items-center">
          <RouterLink to="/" class="text-xl font-semibold mr-12">{{ company }}</RouterLink>
          <nav class="flex-auto">
            <ul class="flex items-center gap-6">
              <li v-for="menuItem of menuItems" :key="menuItem.text">
                <RouterLink
                  :to="menuItem.link"
                  :href="menuItem.link"
                  class="inline-block py-3 font-medium transition-colors hover:text-brand-blue-1"
                  >{{ menuItem.text }}
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div class="flex items-center gap-2">
            <ProfileImage v-if="isLoggedIn" />
            <ActionButton v-else text="Sign in" @click="userStore.loginUser()" />
          </div>
        </div>
      </div>
    </div>
    <TheSubNav v-if="isLoggedIn" />
  </header>
</template>

<style></style>
