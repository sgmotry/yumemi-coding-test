import { Prefecture } from '@/types/types'

const PrefectureCheckBox = ({ data }: { data: Prefecture[] }) => {
  return (
    <>
      <div className='grid grid-cols-3'>
        {data.map((pref) => (
          <div key={pref.prefCode}>
            <label>
              <input type="checkbox" />
              {pref.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}

export default PrefectureCheckBox
