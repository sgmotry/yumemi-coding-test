import { PopulationResponse } from '@/types/types'

export const getPopulation = async (prefCode: number) => {
  const response = await fetch(`/api/population?prefCode=${prefCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  if (!response.ok) {
    return undefined
  }

  const data: PopulationResponse = await response.json()

  return data.result
}
