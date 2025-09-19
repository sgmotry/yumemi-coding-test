'use client'
import { useState } from 'react'
import PopulationGraph from './PopulationGraph'
import PrefectureCheckBox from './PrefectureCheckBox'
import { getPrefectures } from '../utils/prefecture-api'
import useSWR from 'swr'

const PopulationTrendApp = () => {
  const [checkedCode, setCheckedCode] = useState<number[]>([])

  const {
    data: prefectures,
    error,
    isLoading,
  } = useSWR('prefectures', getPrefectures, {
    revalidateOnFocus: false,
  })
  if (isLoading) return '読み込み中です。'
  if (error || !prefectures) return '都道府県データが取得できませんでした。'

  return (
    <>
      <PrefectureCheckBox
        prefectures={prefectures}
        checkedCode={checkedCode}
        setCheckedCode={setCheckedCode}
      />
      <PopulationGraph checkedCode={checkedCode} prefectures={prefectures} />
    </>
  )
}

export default PopulationTrendApp
