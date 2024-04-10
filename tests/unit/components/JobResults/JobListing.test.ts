import { render, screen } from '@testing-library/vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'
import type { Job } from '@/api/types'
import { createJob } from '../../../utils/createJob'

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        job: {
          ...job
        }
      }
    })
  }
  it('renders job title', () => {
    const jobProps = createJob({ title: 'Vue developer' })
    renderJobListing(jobProps)
    const title = screen.getByText('Vue developer')

    expect(title).toBeInTheDocument()
  })

  it('renders job organization', () => {
    const jobProps = createJob({ title: 'AirBnb' })
    renderJobListing(jobProps)

    const organization = screen.getByText('AirBnb')

    expect(organization).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJob({
      locations: ['Orlando', 'New york']
    })
    renderJobListing(jobProps)

    const location1 = screen.getByText('Orlando')
    const location2 = screen.getByText('New york')

    expect(location1).toBeInTheDocument()
    expect(location2).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJob({
      minimumQualifications: ['Code', 'Develop']
    })
    renderJobListing(jobProps)

    const qualification1 = screen.getByText('Code')
    const qualification2 = screen.getByText('Develop')

    expect(qualification1).toBeInTheDocument()
    expect(qualification2).toBeInTheDocument()
  })
})
