import { Task } from '../models/Task'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, deleteTask, formatDate, updateTask } from '../api/taskApi'
import { FormEventHandler, useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

interface TaskModalProps {
  show: boolean
  onClose: () => void
  task?: Task
}

export default function TaskModal({ show, onClose, task }: TaskModalProps) {
  // ステート管理
  const [confirmShow, setConfirmShow] = useState(false)

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleClickRegister: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const title = form.get('title') as string
    const description = (form.get('description') as string) || undefined
    const deadLine = new Date(form.get('deadLine') as string) || undefined
    const isComplete = (form.get('isComplete') as string) === 'on'

    if (task?.id) {
      const updateTask: Task = { ...task, title, description, deadLine, isComplete }
      updateMutation.mutate(updateTask)
    } else {
      const newTask: Task = { title, description, deadLine, isComplete }
      createMutation.mutate(newTask)
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
      <>
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded max-w-sm w-full'>
            <div className='text-right'>
              <button className='underline' type='button' onClick={onClose}>
                閉じる
              </button>
            </div>
            <h2 className='text-2xl font-bold mb-2'>タスクの{task ? '編集' : '新規作成'}</h2>
            <form onSubmit={handleClickRegister}>
              <div className='mb-2'>
                <div>
                  <label>タスク名</label>
                </div>
                <input type='text' name='title' defaultValue={task?.title} />
              </div>
              <div className='mb-2'>
                <div>
                  <label>詳細</label>
                </div>
                <input type='text' name='description' defaultValue={task?.description} />
              </div>
              <div className='mb-2'>
                <div>
                  <label>期日</label>
                </div>
                <input type='date' name='deadLine' defaultValue={formatDate(task?.deadLine)} />
              </div>
              <div className='mb-2 flex items-center gap-2'>
                <input type='checkbox' id='isComplete' name='isComplete' defaultChecked={task?.isComplete} />
                <label htmlFor='isComplete'>完了</label>
              </div>
              <div className='flex justify-between'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded underline' type='submit'>
                  登録
                </button>
                {task && (
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
                      onExec={() => handleClickDelete(task?.id!)}
                      onClose={() => setConfirmShow(false)}
                    />
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </>
    )
  } else {
    return
  }
}
