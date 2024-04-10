import { beforeEach, describe, expect, type Mock } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useDegreesStore } from '@/stores/degrees'
import axios from 'axios'
import { createDegree } from '../../utils/createDegree'

vi.mock('axios')

const axiosGetNock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia())
  })

  it('stores all degrees that jobs may require', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia())
  })
  it('makes API request and stores received degrees', async () => {
    axiosGetNock.mockResolvedValue({ data: [{ id: '1', degree: 'Master`s' }] })
    const store = useDegreesStore()
    await store.fetchDegrees()

    expect(store.degrees).toEqual([{ id: '1', degree: 'Master`s' }])
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia())
  })

  describe('unique degrees', () => {
    const store = useDegreesStore()
    store.degrees = [createDegree({ degree: 'Master`s' }), createDegree({ degree: 'Bachelor`s' })]

    const result = store.uniqueDegrees
    expect(result).toEqual(['Master`s', 'Bachelor`s'])
  })
})
