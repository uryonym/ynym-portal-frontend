import { ChangeEvent, useState } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { type Refueling } from '../models/Refueling'
import RefuelingModal from '../components/RefuelingModal'
import { getRefuelings } from '../api/refuelingApi'
import { getCars } from '../api/carApi'

export const Route = createFileRoute('/refueling')({
  component: Refueling,
})

function Refueling() {
  const [openModal, setOpenModal] = useState(false)
  const [currentCarId, setCurrentCarId] = useState<string>()
  const [currentRefueling, setCurrentRefueling] = useState<Refueling>()

  const { data: cars } = useSuspenseQuery({ queryKey: ['cars'], queryFn: getCars })
  const { data: refuelings } = useQuery({ queryKey: ["refuelings", currentCarId], queryFn: () => getRefuelings(currentCarId) })

  // 新規作成ボタンクリック時
  const handleClickCreate = () => {
    setCurrentRefueling(undefined)
    setOpenModal(true)
  }

  // 編集ボタンクリック時
  const handleClickEdit = (refueling: Refueling) => {
    setCurrentRefueling(refueling)
    setOpenModal(true)
  }

  const handleSelectCar = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCarId(event.target.value)
  }

  const handleCloseModal = () => {
    setCurrentRefueling(undefined)
    setOpenModal(false)
  }

  return (
    <div className='flex-1 flex flex-col gap-3 p-2'>
      <div>
        <Link className='underline' to='/car'>車両管理画面へ</Link>
      </div>
      {currentCarId &&
        <div>
          <button className='underline' type='button' onClick={handleClickCreate}>
            新規作成
          </button>
        </div>
      }
      <div>
        <select name="carId" onChange={handleSelectCar}>
          <option value="">車を選択してください</option>
          {cars && cars.map((car) => (
            <option key={car.id} value={car.id}>{car.name}</option>
          ))}
        </select>
      </div>
      <ul>
        {refuelings &&
          refuelings.map((refueling) => (
            <li className='flex gap-3 items-center p-2 border-b-2' onClick={() => handleClickEdit(refueling)}>
              <div>
                <p>{refueling.refuelDatetime.toLocaleDateString("ja-JP")}</p>
                <p>{refueling.odometer} km</p>
                <p>@¥{refueling.price}　¥{refueling.totalCost}　{Math.round(refueling.totalCost / refueling.price * 100) / 100} l</p>
              </div>
            </li>
          ))}
      </ul>
      {currentCarId &&
        <RefuelingModal show={openModal} onClose={handleCloseModal} carId={currentCarId} refueling={currentRefueling} />
      }
    </div>
  )
}
