import { PrefectureResponse } from '@/types/types'

export async function GET() {
  const APIKEY = process.env.YUMEMI_API_KEY

  const response = await fetch(
    'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures',
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
      JSON.stringify({ error: 'Failed to fetch prefecture data' }),
      {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const data: PrefectureResponse = await response.json()
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
