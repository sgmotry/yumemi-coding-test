import { GraphOption } from '@/types/types'
import React, { SetStateAction } from 'react'

const OPTIONS: GraphOption[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
]

const GraphOptions = ({
  graphOption,
  setGraphOption,
}: {
  graphOption: GraphOption
  setGraphOption: React.Dispatch<SetStateAction<GraphOption>>
}) => {
  return (
    <div className='h-0 flex justify-center'>
      {OPTIONS.map((option) => (
        <label key={option} className='mx-2'>
          <input
            name="graphOption"
            type="radio"
            checked={graphOption === option}
            onChange={() => setGraphOption(option)}
          />
          {option}
        </label>
      ))}
    </div>
  )
}

export default GraphOptions
