'use client'
import { useEffect, useMemo, useState } from 'react'
import { GraphOption, Population, Prefecture } from '../types/types'
import { getPopulation } from '../utils/population-api'
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

const PopulationGraph = ({
  checkedCode,
  prefectures,
}: {
  checkedCode: number[]
  prefectures: Prefecture[]
}) => {
  const [populationData, setPopulationData] = useState<Population[]>([])
  const [graphOption, setGraphOption] = useState<GraphOption>('総人口')
  const [isDispRate, setIsDispRate] = useState(false)

  useEffect(() => {
    if (checkedCode.length === 0) {
      setPopulationData([])
      return
    }
    const fetchData = async () => {
      const promises = checkedCode.map((code) => getPopulation(code))
      try {
        const results = await Promise.all(promises)
        setPopulationData(
          results.filter((res): res is Population => res !== undefined),
        )
      } catch {
        setPopulationData([])
      }
    }
    fetchData()
  }, [checkedCode])

  useEffect(() => {
    if (graphOption === '総人口') setIsDispRate(false)
  }, [graphOption])

  const graphData = useMemo(() => {
    if (populationData.length === 0) {
      return []
    }

    const prefMap = new Map(prefectures.map((p) => [p.prefCode, p.prefName]))

    const formattedData: {
      [year: number]: { [prefecture: string]: number }
    } = {}

    populationData.forEach((prefPop) => {
      const prefCode = prefPop.prefCode
      const prefName = prefMap.get(prefCode)
      if (!prefName) return

      // 選択中のラベルからデータを抽出
      const totalPopulation = prefPop.data.find((d) => d.label === graphOption)
      if (!totalPopulation) return

      totalPopulation.data.forEach(({ year, value, rate }) => {
        if (!formattedData[year]) {
          formattedData[year] = { year: year }
        }
        formattedData[year][prefName] = isDispRate ? rate : value
      })
    })
    return Object.values(formattedData).sort(
      (a, b) => (a.year as number) - (b.year as number),
    )
  }, [populationData, prefectures, graphOption, isDispRate])

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
              const prefName = prefectures.find(
                (p) => p.prefCode === code,
              )?.prefName
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
      <label>
        <input
          name="graphOption"
          type="radio"
          checked={graphOption === '総人口'}
          onChange={() => setGraphOption('総人口')}
        />
        総人口
      </label>
      <label>
        <input
          name="graphOption"
          type="radio"
          checked={graphOption === '年少人口'}
          onChange={() => setGraphOption('年少人口')}
        />
        年少人口
      </label>
      <label>
        <input
          name="graphOption"
          type="radio"
          checked={graphOption === '生産年齢人口'}
          onChange={() => setGraphOption('生産年齢人口')}
        />
        生産年齢人口
      </label>
      <label>
        <input
          name="graphOption"
          type="radio"
          checked={graphOption === '老年人口'}
          onChange={() => setGraphOption('老年人口')}
        />
        老年人口
      </label>
      <br />
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
          checked={isDispRate && graphOption !== '総人口'}
          onChange={() => setIsDispRate(true)}
          disabled={graphOption === '総人口'}
        />
        割合
      </label>
    </>
  )
}

export default PopulationGraph
