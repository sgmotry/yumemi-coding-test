'use client'
import { useEffect, useMemo, useState } from 'react'
import { Population, Prefecture } from '../types/types'
import { getPopulation } from '../utils/population-api'
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

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#ff7300',
  '#413ea0',
  '#ffc658',
  '#82ca9d',
  '#d0ed57',
  '#a4de6c',
  '#8dd1e1',
]

const PopulationGraph = ({
  checkedCode,
  prefectures,
}: {
  checkedCode: number[]
  prefectures: Prefecture[]
}) => {
  const [populationData, setPopulationData] = useState<Population[]>([])

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
      } catch (error) {
        console.error('error:', error)
        setPopulationData([])
      }
    }
    fetchData()
  }, [checkedCode])

  const graphData = useMemo(() => {
    if (populationData.length === 0) {
      return []
    }

    // 都道府県コードと都道府県名の対応マップを作成（処理の高速化のため）
    const prefMap = new Map(prefectures.map((p) => [p.prefCode, p.prefName]))

    // recharts用のデータ構造に変換する
    const formattedData: {
      [year: number]: { [prefecture: string]: number }
    } = {}

    // 取得した各都道府県の人口データをループ
    populationData.forEach((prefPop, index) => {
      // APIレスポンスとチェックされたコードの順番は対応している
      const prefCode = checkedCode[index]
      const prefName = prefMap.get(prefCode)
      if (!prefName) return

      // 「総人口」のデータのみを抽出
      const totalPopulation = prefPop.data.find((d) => d.label === '総人口')
      if (!totalPopulation) return

      // 年ごとのデータを整形
      totalPopulation.data.forEach(({ year, value }) => {
        if (!formattedData[year]) {
          formattedData[year] = { year: year }
        }
        formattedData[year][prefName] = value
      })
    })
    console.log(formattedData)
    // オブジェクトを配列に変換して年でソートする
    return Object.values(formattedData).sort(
      (a, b) => (a.year as number) - (b.year as number),
    )
  }, [populationData, checkedCode, prefectures])

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
              tickFormatter={(value) => `${(value as number) / 10000}万人`}
              label={{ value: '人口数', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {/* 選択された都道府県の数だけLineを動的に描画 */}
            {checkedCode.map((code, index) => {
              const prefName = prefectures.find(
                (p) => p.prefCode === code,
              )?.prefName
              if (!prefName) return null
              return (
                <Line
                  key={prefName}
                  type="monotone"
                  dataKey={prefName}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default PopulationGraph
