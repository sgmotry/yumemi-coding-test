'use client'
import { useEffect, useState } from 'react'
import PopulationGraph from './PopulationGraph'
import { getPrefectures } from '../utils/prefecture-api'
import { Prefecture } from '../types/types'

const PrefectureCheckBox = () => {
  const [prefectureData, setPrefectureData] = useState<Prefecture[]|undefined>();
  const [checkedCode, setCheckedCode] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPrefectures();
      setPrefectureData(data);
    }
    fetchData();
  },[])
  if (!prefectureData) return '都道府県データが取得できませんでした。'
  
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
        {prefectureData.map((pref) => (
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

      <PopulationGraph checkedCode={checkedCode} prefectures={prefectureData} />
    </>
  )
}

export default PrefectureCheckBox
