import { PrefectureResponse } from '@/app/types/types'

export const getPrefectures = async () => {
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
    return undefined
  }

  const data: PrefectureResponse = await response.json()

  return data.result
}
