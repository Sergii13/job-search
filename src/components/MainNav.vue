<script setup>
import { ref } from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import ProfileImage from '@/components/ProfileImage.vue'
import TheSubNav from '@/components/TheSubNav.vue'

const company = ref('Careers Search')
const menuItems = ref([
  {
    link: '/',
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
    link: '/',
    text: 'Jobs'
  }
])

const isLoggedIn = ref(false)

function loginUser() {
  isLoggedIn.value = true
}
</script>
<template>
  <header class="w-full text-sm">
    <div class="sticky w-full top-0 left-0 py-5 border-b border-solid border-brand-gray-1">
      <div class="w-full bg-white container mx-auto"></div>
      <div class="flex flex-nowrap px-8 items-center">
        <a href="/" class="text-xl font-semibold mr-12">{{ company }}</a>
        <nav class="flex-auto">
          <ul class="flex items-center gap-6">
            <li v-for="menuItem of menuItems" :key="menuItem.text">
              <a
                :href="menuItem.link"
                class="inline-block py-3 font-medium transition-colors hover:text-brand-blue-1"
                >{{ menuItem.text }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center gap-2">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else text="Sign in" @click="loginUser" />
        </div>
      </div>
    </div>
    <TheSubNav v-if="isLoggedIn" />
  </header>
</template>

<style></style>
