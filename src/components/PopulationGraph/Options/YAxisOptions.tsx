import { GraphOption } from '@/types/types'
import React, { SetStateAction } from 'react'

const YAxisOptions = ({
  graphOption,
  isDispRate,
  setIsDispRate,
}: {
  graphOption: GraphOption
  isDispRate: boolean
  setIsDispRate: React.Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <>
      <label>
        <input
          name="y-AxisOption"
          type="radio"
          checked={!isDispRate}
          onChange={() => setIsDispRate(false)}
        />
        人口
      </label>
      <label>
        <input
          name="y-AxisOption"
          type="radio"
          checked={isDispRate}
          onChange={() => setIsDispRate(true)}
          disabled={graphOption === '総人口'}
        />
        割合
      </label>
    </>
  )
}

export default YAxisOptions
