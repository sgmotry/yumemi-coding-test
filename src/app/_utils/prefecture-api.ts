import { PrefectureResponse } from '@/app/_types/types'

export const getPrefectures = async () => {
  const response = await fetch('/api/prefectures', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  if (!response.ok) {
    return undefined
  }

  const data: PrefectureResponse = await response.json()

  return data.result
}
