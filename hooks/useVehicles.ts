'use client'

import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
} from '@/lib/types/vehicle'
import { useState, useEffect, useCallback } from 'react'
import { fetchVehicles } from '@/lib/api/vehicles'
import { mockVehicles } from '@/lib/mocks/vehicles'
import { toast } from 'sonner'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)

  // 初期ロード
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true)
      try {
        const response = await fetchVehicles()
        setVehicles(response.data)
      } catch (error) {
        console.error('Failed to fetch vehicles:', error)
        // フォールバック：モックデータを使用
        setVehicles(mockVehicles.data)
        toast.error(
          '車両データの読み込みに失敗しました。デモデータを表示しています。',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [])

  const addVehicle = useCallback(
    async (data: CreateVehicleInput) => {
      setIsLoading(true)
      try {
        // モックデータなので、ローカルで新規車両を作成
        const newVehicle: Vehicle = {
          id: `mock-${Date.now()}`,
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          ...data,
          seq: vehicles.length + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        setVehicles([newVehicle, ...vehicles])
        toast.success('車両を追加しました')
      } catch (error) {
        console.error('Failed to create vehicle:', error)
        toast.error('車両の追加に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [vehicles],
  )

  const updateVehicle = useCallback(
    async (id: string, data: UpdateVehicleInput) => {
      setIsLoading(true)
      try {
        // モックデータなので、ローカルで更新
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === id
              ? {
                  ...v,
                  ...data,
                  updated_at: new Date().toISOString(),
                }
              : v,
          ),
        )
        setEditingVehicle(null)
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

  const deleteVehicle = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      // モックデータなので、ローカルで削除
      setVehicles((prev) => prev.filter((v) => v.id !== id))
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
