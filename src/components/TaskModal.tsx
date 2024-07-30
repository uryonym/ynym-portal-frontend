import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { Task } from '../models/Task'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, formatDate, updateTask } from '../api/taskApi'
import { FormEventHandler } from 'react'

interface TaskModalProps {
  show: boolean
  onClose: () => void
  task?: Task
}

export default function TaskModal({ show, onClose, task }: TaskModalProps) {
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

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>タスクの編集</Modal.Header>
      <Modal.Body>
        <form className='flex flex-col gap-3' onSubmit={handleClickRegister}>
          <div className='mb-2'>
            <label>タスク名</label>
            <TextInput type='text' name='title' defaultValue={task?.title} />
          </div>
          <div className='mb-2'>
            <label>詳細</label>
            <TextInput type='text' name='description' defaultValue={task?.description} />
          </div>
          <div className='mb-2'>
            <label>期日</label>
            <TextInput type='date' name='deadLine' defaultValue={formatDate(task?.deadLine)} />
          </div>
          <div className='mb-2 flex items-center gap-2'>
            <Checkbox id='isComplete' name='isComplete' defaultChecked={task?.isComplete} />
            <Label htmlFor='isComplete'>完了</Label>
          </div>
          <Button type='submit'>登録</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
