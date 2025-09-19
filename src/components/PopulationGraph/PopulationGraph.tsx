'use client'
import { useEffect, useMemo, useState } from 'react'
import { GraphOption, Prefecture } from '../../types/types'
import usePopulationData from '@/hooks/usePopulationData'
import GraphOptions from './Options/GraphOptions'
import YAxisOptions from './Options/YAxisOptions'
import useGraphData from '@/hooks/useGraphData'
import GraphManager from './GraphManager/GraphManager'

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
      <GraphManager
        graphData={graphData}
        isDispRate={isDispRate}
        checkedCode={checkedCode}
        prefMap={prefMap}
      />
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
