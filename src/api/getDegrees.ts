import axios from 'axios'
import type { Degree } from '@/api/types'

async function getDegrees() {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/degrees`
  const response = await axios.get<Degree[]>(url)

  return response.data
}

export default getDegrees
