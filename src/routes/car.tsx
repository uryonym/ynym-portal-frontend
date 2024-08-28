import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { type Car } from '../models/Car'
import { getCars } from '../api/carApi'
import CarModal from '../components/CarModal'

export const Route = createFileRoute('/car')({
  component: Car,
})

function Car() {
  const { data } = useSuspenseQuery({ queryKey: ['cars'], queryFn: getCars })
  const [openModal, setOpenModal] = useState(false)
  const [currentCar, setCurrentCar] = useState<Car>()

  // 新規作成ボタンクリック時
  const handleClickCreate = () => {
    setCurrentCar(undefined)
    setOpenModal(true)
  }

  // 編集ボタンクリック時
  const handleClickEdit = (car: Car) => {
    setCurrentCar(car)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setCurrentCar(undefined)
    setOpenModal(false)
  }

  return (
    <div className='flex-1 flex flex-col gap-3 p-2'>
      <div>
        <button className='underline' type='button' onClick={handleClickCreate}>
          新規作成
        </button>
      </div>
      <ul>
        {data &&
          data.map((car) => (
            <li className='flex gap-3 items-center p-2 border-b-2' onClick={() => handleClickEdit(car)}>
              <div>
                <p>{car.name}</p>
              </div>
            </li>
          ))}
      </ul>
      <CarModal show={openModal} onClose={handleCloseModal} car={currentCar} />
    </div>
  )
}
