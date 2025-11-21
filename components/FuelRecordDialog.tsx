'use client'

import { FuelRecord, CreateFuelRecordInput, UpdateFuelRecordInput } from '@/lib/types/fuel-record'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FuelRecordForm } from './FuelRecordForm'

interface FuelRecordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleId: string
  initialData?: FuelRecord | null
  onSubmit: (data: CreateFuelRecordInput | UpdateFuelRecordInput) => void
  onDelete?: (id: string) => void
  isLoading?: boolean
}

export function FuelRecordDialog({
  open,
  onOpenChange,
  vehicleId,
  initialData,
  onSubmit,
  onDelete,
  isLoading = false,
}: FuelRecordDialogProps) {
  const isEditMode = !!initialData
  const title = isEditMode ? '記録を編集' : '新しい記録を作成'

  const handleSubmit = (data: CreateFuelRecordInput | UpdateFuelRecordInput) => {
    onSubmit(data)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <FuelRecordForm
          initialData={initialData}
          vehicleId={vehicleId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
