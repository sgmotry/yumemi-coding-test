import { getPrefectures } from './utils/prefecture-api'
import PrefectureCheckBox from './components/PrefectureCheckBox'

export default async function Home() {
  const prefectureData = await getPrefectures()

  if (!prefectureData) return '都道府県データが取得できませんでした。'

  return (
    <>
      <PrefectureCheckBox data={prefectureData} />
    </>
  )
}
