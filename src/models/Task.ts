export interface Task {
  id?: string
  title: string
  description?: string
  deadLine?: Date
  isComplete: boolean
  createdAt?: Date
  updatedAt?: Date
}
