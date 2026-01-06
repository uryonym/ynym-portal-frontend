'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
} from '@/lib/types/vehicle'
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

  // データを再取得する共通関数
  const reloadVehicles = useCallback(async () => {
    try {
      const response = await fetchVehicles()
      setVehicles(response.data)
    } catch (error) {
      console.error('Failed to reload vehicles:', error)
      toast.error('車両の再取得に失敗しました')
    }
  }, [])

  // 初期化時に車両一覧を取得
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true)
      try {
        const response = await fetchVehicles()
        setVehicles(response.data)
      } catch (error) {
        console.error('Failed to load vehicles:', error)
        setVehicles([])
        toast.error('車両一覧の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [])

  // 新規追加
  const addVehicle = useCallback(
    async (data: CreateVehicleInput) => {
      setIsLoading(true)
      try {
        await createVehicle(data)
        // データを再取得して最新データを取得
        await reloadVehicles()
        toast.success('車両を追加しました')
      } catch (error) {
        console.error('Failed to create vehicle:', error)
        toast.error('車両の追加に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [reloadVehicles],
  )

  // 更新
  const updateVehicle = useCallback(
    async (id: string, data: UpdateVehicleInput) => {
      setIsLoading(true)
      try {
        await updateVehicleAPI(id, data)
        // データを再取得して最新データを取得
        await reloadVehicles()
        toast.success('車両を更新しました')
      } catch (error) {
        console.error('Failed to update vehicle:', error)
        toast.error('車両の更新に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [reloadVehicles],
  )

  // 削除
  const deleteVehicle = useCallback(
    async (id: string) => {
      setIsLoading(true)
      try {
        await deleteVehicleAPI(id)
        // データを再取得して最新データを取得
        await reloadVehicles()
        toast.success('車両を削除しました')
      } catch (error) {
        console.error('Failed to delete vehicle:', error)
        toast.error('車両の削除に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [reloadVehicles],
  )

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
