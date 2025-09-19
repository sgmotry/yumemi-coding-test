import { Population } from "@/types/types"
import { getPopulation } from "@/utils/population-api"
import useSWR from "swr"

const populationDataFetcher = async (
  codes: number[],
): Promise<Population[]> => {
  if (codes.length === 0) {
    return []
  }
  const promises = codes.map((code) => getPopulation(code))
  const results = await Promise.all(promises)
  return results.filter((res): res is Population => res !== undefined)
}

export const usePopulationData = (checkedCode: number[]) => {
  const { data: populationData } = useSWR(
    checkedCode.sort(),
    populationDataFetcher,
    {
      keepPreviousData: true
    },
  )
  return populationData
}
