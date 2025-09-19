import { GraphOption, Population } from '@/types/types'
import { useMemo } from 'react'

const useGraphData = (
  populationData: Population[] | undefined,
  prefMap: Map<number, string>,
  graphOption: GraphOption,
  isDispRate: boolean,
) => {
  const graphData = useMemo(() => {
    if (!populationData || populationData.length === 0) {
      return []
    }

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
  }, [populationData, graphOption, isDispRate, prefMap])
  return graphData
}

export default useGraphData
