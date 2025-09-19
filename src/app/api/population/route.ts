import { PopulationResponse } from '@/app/types/types'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('prefCode')

  const APIKEY = process.env.YUMEMI_API_KEY
  const response = await fetch(
    `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-API-KEY': APIKEY || '',
      },
    },
  )

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch population data' }),
      {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const data: PopulationResponse = await response.json()
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
