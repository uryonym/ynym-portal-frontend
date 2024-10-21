import { FormEventHandler, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FaTimes } from 'react-icons/fa'
import { Refueling } from '../models/Refueling'
import { createRefueling, deleteRefueling, formatDatetime, updateRefueling } from '../api/refuelingApi'
import ConfirmationModal from './ConfirmationModal'

interface RefuelingModalProps {
  show: boolean
  onClose: () => void
  carId: string
  refueling?: Refueling
}

export default function RefuelingModal({ show, onClose, carId, refueling }: RefuelingModalProps) {
  // ステート管理
  const [confirmShow, setConfirmShow] = useState(false)

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createRefueling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['refuelings', carId] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateRefueling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['refuelings', carId] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRefueling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['refuelings', carId] })
    },
  })

  const handleClickRegister: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const refuelDatetime = new Date(form.get('refuelDatetime') as string) || undefined
    const odometer = parseInt(form.get('odometer') as string)
    const fuelType = form.get('fuelType') as string
    const price = parseInt(form.get('price') as string)
    const totalCost = parseInt(form.get('totalCost') as string)
    const isFull = (form.get('isFull') as string) === 'on'
    const gasStand = form.get('gasStand') as string

    if (refueling?.id) {
      const updateRefueling: Refueling = {
        ...refueling,
        refuelDatetime,
        odometer,
        fuelType,
        price,
        totalCost,
        isFull,
        gasStand,
      }
      updateMutation.mutate({ carId, refueling: updateRefueling })
    } else {
      const newRefueling: Refueling = { refuelDatetime, odometer, fuelType, price, totalCost, isFull, gasStand }
      createMutation.mutate({ carId, refueling: newRefueling })
    }

    onClose()
  }

  // 削除ボタンクリック時
  const handleClickDelete = (id: string) => {
    deleteMutation.mutate({ carId, id })
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
          <h2 className='text-2xl font-bold mb-2'>燃費記録の{refueling ? '編集' : '新規作成'}</h2>
          <form onSubmit={handleClickRegister}>
            <div className='mb-2'>
              <div>
                <label>給油日時</label>
              </div>
              <input
                className='w-full'
                type='datetime-local'
                name='refuelDatetime'
                defaultValue={formatDatetime(refueling?.refuelDatetime)}
              />
            </div>
            <div className='mb-2'>
              <div>
                <label>総走行距離</label>
              </div>
              <input className='w-full' type='text' name='odometer' defaultValue={refueling?.odometer} />
            </div>
            <div className='mb-2'>
              <div>
                <label>油種</label>
              </div>
              <input
                className='w-full'
                type='text'
                name='fuelType'
                defaultValue={refueling ? refueling.fuelType : 'ガソリン'}
              />
            </div>
            <div className='mb-2'>
              <div>
                <label>単価</label>
              </div>
              <input className='w-full' type='text' name='price' defaultValue={refueling?.price} />
            </div>
            <div className='mb-2'>
              <div>
                <label>費用</label>
              </div>
              <input className='w-full' type='text' name='totalCost' defaultValue={refueling?.totalCost} />
            </div>
            <div className='mb-2 pt-2 flex items-center gap-2'>
              <input type='checkbox' id='isFull' name='isFull' defaultChecked={refueling?.isFull} />
              <label htmlFor='isFull'>満タン</label>
            </div>
            <div className='mb-2'>
              <div>
                <label>ガススタンド</label>
              </div>
              <input
                className='w-full'
                type='text'
                name='gasStand'
                defaultValue={refueling ? refueling.gasStand : 'apollostation セルフ大池橋SS'}
              />
            </div>
            <div className='flex justify-between pt-3'>
              <button className='px-4 py-2 bg-blue-500 text-white rounded underline' type='submit'>
                登録
              </button>
              {refueling && (
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
                    onExec={() => handleClickDelete(refueling.id!)}
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
