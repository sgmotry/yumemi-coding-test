export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefectureResponse = {
  message: string
  result: Prefecture[]
}

export type Population = {
  boundaryYear: number
  data: {
    label: string
    data: {
      year: number
      value: number
      rate: number
    }[]
  }[]
}

export type PopulationResponse = {
  message: string
  result: Population
}
