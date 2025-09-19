'use client'
import { Prefecture } from '@/app/types/types'
import { useState } from 'react'
import PopulationGraph from './PopulationGraph'

const PrefectureCheckBox = ({ data }: { data: Prefecture[] }) => {
  const [checkedCode, setCheckedCode] = useState<number[]>([])

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

      <PopulationGraph checkedCode={checkedCode} prefectures={data}/>
    </>
  )
}

export default PrefectureCheckBox
