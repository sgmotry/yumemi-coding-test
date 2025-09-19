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
    <div className='h-0 flex justify-evenly my-5'>
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
    </div>
  )
}

export default YAxisOptions
