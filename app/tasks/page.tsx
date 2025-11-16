'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { TodoList } from '@/components/TodoList'
import { TodoDialog } from '@/components/TodoDialog'
import { Toaster } from '@/components/ui/sonner'
import { useTodos } from '@/hooks/useTodos'
import { CreateTodoInput, UpdateTodoInput } from '@/lib/types/todo'

export default function TasksPage() {
  const {
    todos,
    isLoading,
    editingTodo,
    setEditingTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setEditingTodo(null)
    setIsDialogOpen(true)
  }

  const handleEditTodo = (todoToEdit: any) => {
    setEditingTodo(todoToEdit)
    setIsDialogOpen(true)
  }

  const handleSubmitForm = (data: CreateTodoInput | UpdateTodoInput) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, data as UpdateTodoInput)
    } else {
      addTodo(data as CreateTodoInput)
    }
    setIsDialogOpen(false)
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          <TodoList
            todos={todos}
            onToggleComplete={toggleComplete}
            onEdit={handleEditTodo}
            onAddNew={handleOpenDialog}
          />
        </main>
      </SidebarInset>

      <TodoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={editingTodo}
        onSubmit={handleSubmitForm}
        onDelete={deleteTodo}
        isLoading={isLoading}
      />

      <Toaster />
    </>
  )
}
