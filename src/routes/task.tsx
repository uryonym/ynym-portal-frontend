import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getTasks } from '../api/taskApi'
import { type Task } from '../models/Task'
import TaskModal from '../components/TaskModal'

export const Route = createFileRoute('/task')({
  component: Task,
})

function Task() {
  const { data } = useSuspenseQuery({ queryKey: ['tasks'], queryFn: getTasks })
  const [openModal, setOpenModal] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task>()

  // 未完了のタスク
  const incompleteTasks = data.filter((task) => !task.isComplete)

  // 完了済のタスク
  const completeTasks = data.filter((task) => task.isComplete)

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

  const handleCloseModal = () => {
    setCurrentTask(undefined)
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
        {incompleteTasks &&
          incompleteTasks.map((task) => (
            <li className='flex gap-3 items-center p-2 border-b-2' key={task.id} onClick={() => handleClickEdit(task)}>
              <div>
                <input type='checkbox' defaultChecked={task.isComplete} />
              </div>
              <div>
                <p>{task.title}</p>
                <p className='text-sm'>{task.deadLine?.toLocaleDateString('ja-JP')}</p>
              </div>
            </li>
          ))}
      </ul>
      <p>完了済タスク</p>
      <ul>
        {completeTasks &&
          completeTasks.map((task) => (
            <li className='flex gap-3 items-center p-2 border-b-2' key={task.id} onClick={() => handleClickEdit(task)}>
              <div>
                <input type='checkbox' defaultChecked={task.isComplete} />
              </div>
              <div>
                <p>{task.title}</p>
                <p className='text-sm'>{task.deadLine?.toLocaleDateString('ja-JP')}</p>
              </div>
            </li>
          ))}
      </ul>
      <TaskModal show={openModal} onClose={handleCloseModal} task={currentTask} />
    </div>
  )
}
