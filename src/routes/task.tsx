import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/task')({
  component: Task,
})

function Task() {
  return (
    <div>
      <h3>Welcome Task!</h3>
    </div>
  )
}
