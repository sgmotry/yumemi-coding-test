'use client'
import { useEffect, useMemo, useState } from 'react'
import { GraphOption, Prefecture } from '../types/types'
import COLORS from '../utils/colors'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import usePopulationData from '@/hooks/usePopulationData'
import GraphOptions from './GraphOptions'
import YAxisOptions from './YAxisOptions'
import useGraphData from '@/hooks/useGraphData'

const PopulationGraph = ({
  checkedCode,
  prefectures,
}: {
  checkedCode: number[]
  prefectures: Prefecture[]
}) => {
  const [graphOption, setGraphOption] = useState<GraphOption>('総人口')
  const [isDispRate, setIsDispRate] = useState(false)
  const populationData = usePopulationData(checkedCode)

  useEffect(() => {
    if (graphOption === '総人口') setIsDispRate(false)
  }, [graphOption])

  const prefMap = useMemo(() => {
    return new Map(prefectures.map((p) => [p.prefCode, p.prefName]))
  }, [prefectures])
  
  const graphData = useGraphData(
    populationData,
    prefMap,
    graphOption,
    isDispRate,
  )

  return (
    <>
      <div className="h-[30rem] w-[50%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              label={{
                value: '年度',
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <YAxis
              width={80}
              tickFormatter={(value) =>
                isDispRate ? `${value}%` : `${(value as number) / 10000}万人`
              }
              label={{
                value: isDispRate ? '割合' : '人口数',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            {checkedCode.map((code) => {
              const prefName = prefMap.get(code)
              if (!prefName) return null
              return (
                <Line
                  key={prefName}
                  type="monotone"
                  dataKey={prefName}
                  stroke={COLORS[code % COLORS.length]}
                  strokeWidth={2}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <GraphOptions graphOption={graphOption} setGraphOption={setGraphOption} />
      <br />
      <YAxisOptions
        graphOption={graphOption}
        isDispRate={isDispRate}
        setIsDispRate={setIsDispRate}
      />
    </>
  )
}

export default PopulationGraph
