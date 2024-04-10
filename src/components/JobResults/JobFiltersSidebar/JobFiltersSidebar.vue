<script setup lang="ts">
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFilterSidebarDegrees from '@/components/JobResults/JobFiltersSidebar/JobFilterSidebarDegrees.vue'
import JobSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobSidebarOrganizations.vue'
import JobSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobSidebarJobTypes.vue'
import JobFilterSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFilterSidebarPrompt.vue'
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue'
</script>

<template>
  <div class="w-96 flex border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5 w-full">
      <JobFilterSidebarPrompt />

      <JobFiltersSidebarSkills />

      <CollapsibleAccordion header="Degrees">
        <JobFilterSidebarDegrees />
      </CollapsibleAccordion>

      <CollapsibleAccordion header="Job Types">
        <JobSidebarJobTypes />
      </CollapsibleAccordion>

      <CollapsibleAccordion header="Organizations">
        <JobSidebarOrganizations />
      </CollapsibleAccordion>
    </section>
  </div>
</template>

<style scoped></style>
