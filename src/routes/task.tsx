import { useState } from 'react'
import { Button, Checkbox, Table } from 'flowbite-react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { deleteTask, getTasks } from '../api/taskApi'
import { type Task } from '../models/Task'
import TaskModal from '../components/TaskModal'

export const Route = createFileRoute('/task')({
  component: Task,
})

function Task() {
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery({ queryKey: ['tasks'], queryFn: getTasks })
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const [openModal, setOpenModal] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task>()

  // 新規作成ボタンクリック時
  const handleClickCreate = () => {
    setCurrentTask(undefined)
    setOpenModal(true)
  }

  // 編集ボタンクリック時
  const handleClickEdit = (task: Task) => {
    setCurrentTask(task)
    setOpenModal(true)
  }

  // 削除ボタンクリック時
  const handleClickDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleCloseModal = () => {
    setCurrentTask(undefined)
    setOpenModal(false)
  }

  return (
    <div className='flex-1 flex flex-col gap-3'>
      <div>
        <button className='underline' type='button' onClick={handleClickCreate}>
          新規作成
        </button>
      </div>
      <table>
        <thead>
          <th>完了</th>
          <th>タスク</th>
          <th>詳細</th>
          <th>期日</th>
          <th>
            <span className='sr-only'>編集</span>
          </th>
          <th>
            <span className='sr-only'>削除</span>
          </th>
        </thead>
        <tbody className='divide-y'>
          {data &&
            data.map((task) => (
              <tr key={task.id}>
                <td>
                  <Checkbox checked={task.isComplete} disabled />
                </td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.deadLine?.toLocaleDateString('ja-JP')}</td>
                <td>
                  <button className='font-medium text-cyan-600 hover:underline' onClick={() => handleClickEdit(task)}>
                    編集
                  </button>
                </td>
                <td>
                  <button
                    className='font-medium text-red-400 hover:underline'
                    onClick={() => handleClickDelete(task.id!)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <TaskModal show={openModal} onClose={handleCloseModal} task={currentTask} />
    </div>
  )
}
