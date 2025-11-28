'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  FuelRecord,
  CreateFuelRecordInput,
  UpdateFuelRecordInput,
} from '@/lib/types/fuel-record'
import { mockFuelRecords } from '@/lib/mocks/fuel-records'
import {
  fetchFuelRecords,
  createFuelRecord,
  updateFuelRecord as updateFuelRecordAPI,
  deleteFuelRecord as deleteFuelRecordAPI,
} from '@/lib/api/fuel-records'
import { toast } from 'sonner'

// 燃費記録のソート関数（給油日時の降順）
function sortFuelRecords(records: FuelRecord[]): FuelRecord[] {
  return [...records].sort((a, b) => {
    return (
      new Date(b.refuel_datetime).getTime() -
      new Date(a.refuel_datetime).getTime()
    )
  })
}

export function useFuelRecords(vehicleId: string | null) {
  const [records, setRecords] = useState<FuelRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingRecord, setEditingRecord] = useState<FuelRecord | null>(null)

  // ソート済みのrecordsを返す
  const sortedRecords = useMemo(() => sortFuelRecords(records), [records])

  // 車両IDが変更されたときに燃費記録を取得
  useEffect(() => {
    if (!vehicleId) {
      setRecords([])
      return
    }

    const loadRecords = async () => {
      setIsLoading(true)
      try {
        const response = await fetchFuelRecords(vehicleId)
        // レスポンスの構造に対応（配列 or data プロパティ）
        const data = Array.isArray(response) ? response : response.data || []
        setRecords(data)
      } catch (error) {
        console.error('Failed to load fuel records:', error)
        // エラー時はモックデータにフォールバック
        setRecords(
          mockFuelRecords.data.filter((r) => r.vehicle_id === vehicleId),
        )
        toast.error('燃費記録の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    loadRecords()
  }, [vehicleId])

  // 新規追加
  const addRecord = useCallback(async (data: CreateFuelRecordInput) => {
    setIsLoading(true)
    try {
      const newRecord = await createFuelRecord(data)
      setRecords((prev) => [newRecord, ...prev])
      toast.success('燃費記録を追加しました')
    } catch (error) {
      console.error('Failed to create fuel record:', error)
      toast.error('燃費記録の追加に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 更新
  const updateRecord = useCallback(
    async (id: string, data: UpdateFuelRecordInput) => {
      setIsLoading(true)
      try {
        const updatedRecord = await updateFuelRecordAPI(id, data)
        setRecords((prev) =>
          prev.map((record) => (record.id === id ? updatedRecord : record)),
        )
        toast.success('燃費記録を更新しました')
      } catch (error) {
        console.error('Failed to update fuel record:', error)
        toast.error('燃費記録の更新に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  // 削除
  const deleteRecord = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      await deleteFuelRecordAPI(id)
      setRecords((prev) => prev.filter((record) => record.id !== id))
      toast.success('燃費記録を削除しました')
    } catch (error) {
      console.error('Failed to delete fuel record:', error)
      toast.error('燃費記録の削除に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    records: sortedRecords,
    isLoading,
    editingRecord,
    setEditingRecord,
    addRecord,
    updateRecord,
    deleteRecord,
  }
}
