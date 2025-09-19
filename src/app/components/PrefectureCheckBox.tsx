'use client'
import { useState } from 'react'
import PopulationGraph from './PopulationGraph'
import { getPrefectures } from '../utils/prefecture-api'
import useSWR from 'swr'

const PrefectureCheckBox = () => {
  const [checkedCode, setCheckedCode] = useState<number[]>([])

  const { data, error, isLoading } = useSWR('prefectures', getPrefectures)
  if (isLoading) return '読み込み中です。'
  if (error || !data) return '都道府県データが取得できませんでした。'

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
        {data.map((pref) => (
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

      <PopulationGraph checkedCode={checkedCode} prefectures={data} />
    </>
  )
}

export default PrefectureCheckBox
