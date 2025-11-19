'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
} from '@/lib/types/vehicle'
import { mockVehicles } from '@/lib/mocks/vehicles'
import {
  fetchVehicles,
  createVehicle,
  updateVehicle as updateVehicleAPI,
  deleteVehicle as deleteVehicleAPI,
} from '@/lib/api/vehicles'
import { toast } from 'sonner'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)

  // 初期化時に車両一覧を取得
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true)
      try {
        const response = await fetchVehicles()
        setVehicles(response.data)
      } catch {
        console.error('Failed to load vehicles, using mock data')
        // エラー時はモックデータにフォールバック
        setVehicles(mockVehicles.data)
        toast.error('車両一覧の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [])

  // 新規追加
  const addVehicle = useCallback(async (data: CreateVehicleInput) => {
    setIsLoading(true)
    try {
      const response = await createVehicle(data)
      setVehicles((prev) => [response.data, ...prev])
      toast.success('車両を追加しました')
    } catch (error) {
      console.error('Failed to create vehicle:', error)
      toast.error('車両の追加に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 更新
  const updateVehicle = useCallback(
    async (id: string, data: UpdateVehicleInput) => {
      setIsLoading(true)
      try {
        const response = await updateVehicleAPI(id, data)
        setVehicles((prev) =>
          prev.map((vehicle) => (vehicle.id === id ? response.data : vehicle)),
        )
        toast.success('車両を更新しました')
      } catch (error) {
        console.error('Failed to update vehicle:', error)
        toast.error('車両の更新に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  // 削除
  const deleteVehicle = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      await deleteVehicleAPI(id)
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id))
      toast.success('車両を削除しました')
    } catch (error) {
      console.error('Failed to delete vehicle:', error)
      toast.error('車両の削除に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    vehicles,
    isLoading,
    editingVehicle,
    setEditingVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  }
}
