'use client'
import { useEffect, useMemo, useState } from 'react'
import { GraphOption, Population, Prefecture } from '../types/types'
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
  '#FF6347',
  '#FFD700',
  '#ADFF2F',
  '#40E0D0',
  '#1E90FF',
  '#BA55D3',
  '#FF1493',
  '#9400D3',
  '#FF4500',
  '#DAA520',
  '#32CD32',
  '#00CED1',
  '#6495ED',
  '#FF69B4',
  '#8A2BE2',
  '#FFA07A',
  '#CD5C5C',
  '#BDB76B',
  '#8FBC8F',
  '#20B2AA',
  '#87CEFA',
  '#DDA0DD',
  '#9370DB',
  '#FF8C00',
  '#B22222',
  '#DEB887',
  '#7CFC00',
  '#4682B4',
  '#800080',
  '#FF00FF',
  '#6A5ACD',
  '#F4A460',
  '#A52A2A',
  '#9ACD32',
  '#008B8B',
  '#48D1CC',
  '#ADD8E6',
  '#FFC0CB',
  '#D8BFD8',
  '#B0E0E6',
  '#FFE4B5',
  '#FFA500',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#FF0000',
  '#FFFF00',
]

const PopulationGraph = ({
  checkedCode,
  prefectures,
}: {
  checkedCode: number[]
  prefectures: Prefecture[]
}) => {
  const [populationData, setPopulationData] = useState<Population[]>([])
  const [graphOption, setGraphOption] = useState<GraphOption>('総人口')

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

      // ラベルからデータを抽出
      const totalPopulation = prefPop.data.find((d) => d.label === graphOption)
      if (!totalPopulation) return

      // 年ごとのデータを整形
      totalPopulation.data.forEach(({ year, value }) => {
        if (!formattedData[year]) {
          formattedData[year] = { year: year }
        }
        formattedData[year][prefName] = value
      })
    })
    // オブジェクトを配列に変換して年でソートする
    return Object.values(formattedData).sort(
      (a, b) => (a.year as number) - (b.year as number),
    )
  }, [populationData, checkedCode, prefectures, graphOption])

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
            <Legend verticalAlign="bottom" height={36} />
            {/* 選択された都道府県の数だけLineを動的に描画 */}
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
          name="options"
          type="radio"
          checked={graphOption === '総人口'}
          onChange={() => setGraphOption('総人口')}
        />
        総人口
      </label>
      <label>
        <input
          name="options"
          type="radio"
          checked={graphOption === '年少人口'}
          onChange={() => setGraphOption('年少人口')}
        />
        年少人口
      </label>
      <label>
        <input
          name="options"
          type="radio"
          checked={graphOption === '生産年齢人口'}
          onChange={() => setGraphOption('生産年齢人口')}
        />
        生産年齢人口
      </label>
      <label>
        <input
          name="options"
          type="radio"
          checked={graphOption === '老年人口'}
          onChange={() => setGraphOption('老年人口')}
        />
        老年人口
      </label>
    </>
  )
}

export default PopulationGraph
