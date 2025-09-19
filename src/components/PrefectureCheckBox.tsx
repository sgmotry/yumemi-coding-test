'use client'
import { SetStateAction } from 'react'
import { Prefecture } from '../types/types'

const PrefectureCheckBox = ({
  prefectures,
  checkedCode,
  setCheckedCode,
}: {
  prefectures: Prefecture[]
  checkedCode: number[]
  setCheckedCode: React.Dispatch<SetStateAction<number[]>>
}) => {
  const handleCheckboxChange = (target: number) => {
    if (checkedCode.includes(target)) {
      setCheckedCode(checkedCode.filter((code) => code !== target))
    } else {
      setCheckedCode([...checkedCode, target])
    }
  }
  return (
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
  )
}

export default PrefectureCheckBox
