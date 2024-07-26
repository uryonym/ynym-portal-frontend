import { FormEventHandler } from 'react'
import { Button, Table, TextInput } from 'flowbite-react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createTask, getTasks } from '../api/taskApi'
import { type Task } from '../models/Task'

export const Route = createFileRoute('/task')({
  component: Task,
})

function Task() {
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery({ queryKey: ['tasks'], queryFn: getTasks })
  const addMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleCreate: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const title = form.get('title') as string
    const description = (form.get('description') as string) || undefined
    const deadLine = new Date(form.get('deadLine') as string) || undefined

    const newTask: Task = { title, description, deadLine, isComplete: false }
    addMutation.mutate(newTask)
  }

  return (
    <div className='p-2'>
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
                  <a className='font-medium text-cyan-600 hover:underline' href='#'>
                    編集
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a className='font-medium text-red-400 hover:underline' href='#'>
                    削除
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <form className='flex flex-col gap-3 max-w-md' onSubmit={handleCreate}>
        <div>
          <div className='mb-2 block'>
            <label>タスク名</label>
          </div>
          <TextInput type='text' name='title' />
        </div>
        <div>
          <div className='mb-2 block'>
            <label>詳細</label>
          </div>
          <TextInput type='text' name='description' />
        </div>
        <div>
          <div className='mb-2 block'>
            <label>期日</label>
          </div>
          <TextInput type='date' name='deadLine' />
        </div>
        <Button type='submit'>登録</Button>
      </form>
    </div>
  )
}
