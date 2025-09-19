import { PopulationResponse } from '@/app/types/types'

export const getPopulation = async (prefCode: number) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  const response = await fetch(
    `${baseUrl}/api/population?prefCode=${prefCode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
  )

  if (!response.ok) {
    return undefined
  }

  const data: PopulationResponse = await response.json()

  return data.result
}
