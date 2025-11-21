'use client'

import { useState, useEffect } from 'react'
import { useVehicles } from '@/hooks/useVehicles'
import { useFuelRecords } from '@/hooks/useFuelRecords'
import { FuelRecordList } from '@/components/FuelRecordList'
import { FuelRecordDialog } from '@/components/FuelRecordDialog'
import {
  CreateFuelRecordInput,
  UpdateFuelRecordInput,
} from '@/lib/types/fuel-record'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

export default function FuelRecordsPage() {
  const { vehicles, isLoading: vehiclesLoading } = useVehicles()
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  )

  const {
    records,
    isLoading,
    editingRecord,
    setEditingRecord,
    addRecord,
    updateRecord,
    deleteRecord,
  } = useFuelRecords(selectedVehicleId)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicleId) {
      setSelectedVehicleId(vehicles[0].id)
    }
  }, [vehicles, selectedVehicleId])

  const handleOpenDialog = () => {
    setEditingRecord(null)
    setIsDialogOpen(true)
  }

  const handleEditRecord = (recordToEdit: any) => {
    setEditingRecord(recordToEdit)
    setIsDialogOpen(true)
  }

  const handleSubmitForm = (
    data: CreateFuelRecordInput | UpdateFuelRecordInput,
  ) => {
    if (editingRecord) {
      updateRecord(editingRecord.id, data as UpdateFuelRecordInput)
    } else {
      addRecord(data as CreateFuelRecordInput)
    }
    setIsDialogOpen(false)
  }

  if (vehiclesLoading) {
    return (
      <>
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">燃費管理</h1>
            <p className="text-center text-gray-500">読み込み中...</p>
          </div>
        </main>
        <Toaster />
      </>
    )
  }

  if (vehicles.length === 0) {
    return (
      <>
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">燃費管理</h1>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                燃費記録を開始するには、先に車両を登録してください。
              </p>
              <Button onClick={() => (window.location.href = '/vehicles')}>
                車両管理へ
              </Button>
            </div>
          </div>
        </main>
        <Toaster />
      </>
    )
  }

  return (
    <>
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">燃費管理</h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              対象車両を選択
            </label>
            <select
              value={selectedVehicleId || ''}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.maker} {vehicle.model})
                </option>
              ))}
            </select>
          </div>

          {selectedVehicleId && (
            <FuelRecordList
              records={records}
              onEdit={handleEditRecord}
              onAddNew={handleOpenDialog}
            />
          )}
        </div>
      </main>

      {selectedVehicleId && (
        <FuelRecordDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          vehicleId={selectedVehicleId}
          initialData={editingRecord}
          onSubmit={handleSubmitForm}
          onDelete={deleteRecord}
          isLoading={isLoading}
        />
      )}

      <Toaster />
    </>
  )
}
