import getDegrees from '@/api/getDegrees'
import axios from 'axios'
import type { Mock } from 'vitest'

vi.mock('axios')

const axiosGetMock = axios.get as Mock
describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: 'Master`s'
        }
      ]
    })
  })
  it('fetches degrees that candidates can apply to', async () => {
    await getDegrees()
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees')
  })

  it('extracts degrees from response', async () => {
    const jobs = await getDegrees()
    expect(jobs).toEqual([
      {
        id: 1,
        degree: 'Master`s'
      }
    ])
  })
})
