import type { Job } from '@/api/types'

export const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: 'Angular Developer',
  organization: 'Vue and Me',
  degree: "Master's",
  jobType: 'Intern',
  locations: ['Lisbon'],
  minimumQualifications: [
    'Mesh granular deliverables, engineer enterprise convergence, and synergize B2C initiatives'
  ],
  preferredQualifications: [
    'Mesh wireless metrics, syndicate innovative markets, and disintermediate intuitive niches'
  ],
  description: ['Away someone forget effect wait land.'],
  dateAdded: '2021-07-04',
  ...job
})
