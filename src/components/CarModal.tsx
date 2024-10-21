import { FormEventHandler, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FaTimes } from 'react-icons/fa'
import { Car } from '../models/Car'
import { createCar, deleteCar, updateCar } from '../api/carApi'
import ConfirmationModal from './ConfirmationModal'

interface CarModalProps {
  show: boolean
  onClose: () => void
  car?: Car
}

export default function CarModal({ show, onClose, car }: CarModalProps) {
  // ステート管理
  const [confirmShow, setConfirmShow] = useState(false)

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })

  const handleClickRegister: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const name = form.get('name') as string
    const seq = parseInt(form.get('seq') as string)
    const maker = form.get('maker') as string
    const model = form.get('model') as string
    const modelYear = parseInt(form.get('modelYear') as string)
    const licensePlate = form.get('licensePlate') as string
    const tankCapacity = parseInt(form.get('tankCapacity') as string)

    if (car?.id) {
      const updateCar: Car = { ...car, name, seq, maker, model, modelYear, licensePlate, tankCapacity }
      updateMutation.mutate(updateCar)
    } else {
      const newCar: Car = { name, seq, maker, model, modelYear, licensePlate, tankCapacity }
      createMutation.mutate(newCar)
    }

    onClose()
  }

  // 削除ボタンクリック時
  const handleClickDelete = (id: string) => {
    deleteMutation.mutate(id)
    setConfirmShow(false)
    onClose()
  }

  if (show) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded max-w-sm w-full'>
          <div className='text-right'>
            <button className='underline' type='button' onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <h2 className='text-2xl font-bold mb-2'>車両の{car ? '編集' : '新規作成'}</h2>
          <form onSubmit={handleClickRegister}>
            <div className='mb-2'>
              <div>
                <label>車名</label>
              </div>
              <input className='w-full' type='text' name='name' defaultValue={car?.name} />
            </div>
            <div className='mb-2'>
              <div>
                <label>Seq</label>
              </div>
              <input className='w-full' type='text' name='seq' defaultValue={car?.seq} />
            </div>
            <div className='mb-2'>
              <div>
                <label>メーカー</label>
              </div>
              <input className='w-full' type='text' name='maker' defaultValue={car?.maker} />
            </div>
            <div className='mb-2'>
              <div>
                <label>型式</label>
              </div>
              <input className='w-full' type='text' name='model' defaultValue={car?.model} />
            </div>
            <div className='mb-2'>
              <div>
                <label>年式</label>
              </div>
              <input className='w-full' type='text' name='modelYear' defaultValue={car?.modelYear} />
            </div>
            <div className='mb-2'>
              <div>
                <label>ナンバープレート</label>
              </div>
              <input className='w-full' type='text' name='licensePlate' defaultValue={car?.licensePlate} />
            </div>
            <div className='mb-2'>
              <div>
                <label>燃料タンク</label>
              </div>
              <input className='w-full' type='text' name='tankCapacity' defaultValue={car?.tankCapacity} />
            </div>
            <div className='flex justify-between pt-3'>
              <button className='px-4 py-2 bg-blue-500 text-white rounded underline' type='submit'>
                登録
              </button>
              {car && (
                <>
                  <button
                    className='px-4 py-2 bg-red-500 text-white rounded underline'
                    type='button'
                    onClick={() => setConfirmShow(true)}
                  >
                    削除
                  </button>
                  <ConfirmationModal
                    show={confirmShow}
                    onExec={() => handleClickDelete(car?.id!)}
                    onClose={() => setConfirmShow(false)}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return
  }
}
