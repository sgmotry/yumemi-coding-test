import COLORS from '@/utils/colors'
import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'

const GraphManager = ({
  graphData,
  isDispRate,
  checkedCode,
  prefMap,
}: {
  graphData: {
    [prefecture: string]: number
  }[]
  isDispRate: boolean
  checkedCode: number[]
  prefMap: Map<number, string>
}) => {
  return (
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
  )
}

export default GraphManager
