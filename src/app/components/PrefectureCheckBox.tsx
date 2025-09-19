'use client'
import { useState } from 'react'
import PopulationGraph from './PopulationGraph'
import { getPrefectures } from '../utils/prefecture-api'
import useSWR from 'swr'

const PrefectureCheckBox = () => {
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

  const handleCheckboxChange = (target: number) => {
    if (checkedCode.includes(target)) {
      setCheckedCode(checkedCode.filter((code) => code !== target))
    } else {
      setCheckedCode([...checkedCode, target])
    }
  }

  return (
    <>
      <div className="grid grid-cols-7">
        {prefectures.map((pref) => (
          <div key={pref.prefCode}>
            <label>
              <input
                type="checkbox"
                checked={checkedCode.includes(pref.prefCode)}
                onChange={() => handleCheckboxChange(pref.prefCode)}
              />
              {pref.prefName}
            </label>
          </div>
        ))}
      </div>

      <PopulationGraph checkedCode={checkedCode} prefectures={prefectures} />
    </>
  )
}

export default PrefectureCheckBox
