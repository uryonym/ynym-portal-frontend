import { useState } from 'react'
import { Button, Table } from 'flowbite-react'
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
    <div className='p-2'>
      <Button onClick={handleClickCreate}>新規作成</Button>
      <Table>
        <Table.Head>
          <Table.HeadCell>タスク</Table.HeadCell>
          <Table.HeadCell>詳細</Table.HeadCell>
          <Table.HeadCell>期日</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>編集</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>削除</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {data &&
            data.map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.deadLine?.toDateString()}</Table.Cell>
                <Table.Cell>
                  <button className='font-medium text-cyan-600 hover:underline' onClick={() => handleClickEdit(task)}>
                    編集
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className='font-medium text-red-400 hover:underline'
                    onClick={() => handleClickDelete(task.id!)}
                  >
                    削除
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <TaskModal show={openModal} onClose={handleCloseModal} task={currentTask} />
    </div>
  )
}
