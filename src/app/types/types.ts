// 都道府県データ
export type Prefecture = {
  prefCode: number
  prefName: string
}

// 都道府県APIレスポンス（resultにデータ）
export type PrefectureResponse = {
  message: string
  result: Prefecture[]
}

// 人口構成データ
export type Population = {
  prefCode: number
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

// 人口構成APIレスポンス（resultにデータ）
export type PopulationResponse = {
  message: string
  result: Population
}

// 人口構成データ（都道府県コード追加前）
export type PopulationNoPrefCode = Omit<Population, 'prefCode'>
// 人口構成APIレスポンス（resultに都道府県コード追加前のデータ）
export type PopulationResponseNoPrefCode = {
  message: string
  result: PopulationNoPrefCode
}

export type GraphOption = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'
