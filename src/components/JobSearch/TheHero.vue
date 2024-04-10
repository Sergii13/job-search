<script setup lang="ts">
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import SpotLight from '@/components/JobSearch/SpotLight.vue'
</script>
<template>
  <main class="w-full">
    <section class="h-screen py-32">
      <div class="container max-w-screen-lg mx-auto">
        <div class="flex items-center gap-10 justify-between">
          <div class="max-w-3xl">
            <TheHeadline />
            <JobSearchForm />
          </div>
          <div>
            <img
              class="w-80 h-80 object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container mx-auto">
        <spot-light class="flex flex-row justify-center pb-16">
          <template #default="{ img, description, title }">
            <RouterLink
              to="/jobs/results"
              class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2"
            >
              <img :src="img" alt="" class="object-contain" />

              <div class="mt-3 h-48 px-6 py-4">
                <h3 class="text-lg font-medium">
                  {{ title }}
                </h3>

                <p class="mt-3 text-sm">
                  {{ description }}
                </p>
              </div>

              <RouterLink to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1"
                >See jobs
              </RouterLink>
            </RouterLink>
          </template>
        </spot-light>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
