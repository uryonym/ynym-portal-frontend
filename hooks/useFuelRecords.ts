'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  FuelRecord,
  CreateFuelRecordInput,
  UpdateFuelRecordInput,
} from '@/lib/types/fuel-record'
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

  // データを再取得する共通関数
  const reloadRecords = useCallback(async () => {
    if (!vehicleId) return
    try {
      const response = await fetchFuelRecords(vehicleId)
      const data = Array.isArray(response) ? response : response.data || []
      setRecords(data)
    } catch (error) {
      console.error('Failed to reload fuel records:', error)
      toast.error('燃費記録の再取得に失敗しました')
    }
  }, [vehicleId])

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
        setRecords([])
        toast.error('燃費記録の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    loadRecords()
  }, [vehicleId])

  // 新規追加
  const addRecord = useCallback(
    async (data: CreateFuelRecordInput) => {
      setIsLoading(true)
      try {
        await createFuelRecord(data)
        // データを再取得して計算済みフィールドを含む最新データを取得
        await reloadRecords()
        toast.success('燃費記録を追加しました')
      } catch (error) {
        console.error('Failed to create fuel record:', error)
        toast.error('燃費記録の追加に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [reloadRecords],
  )

  // 更新
  const updateRecord = useCallback(
    async (id: string, data: UpdateFuelRecordInput) => {
      setIsLoading(true)
      try {
        await updateFuelRecordAPI(id, data)
        // データを再取得して計算済みフィールドを含む最新データを取得
        await reloadRecords()
        toast.success('燃費記録を更新しました')
      } catch (error) {
        console.error('Failed to update fuel record:', error)
        toast.error('燃費記録の更新に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [reloadRecords],
  )

  // 削除
  const deleteRecord = useCallback(
    async (id: string) => {
      setIsLoading(true)
      try {
        await deleteFuelRecordAPI(id)
        // データを再取得して計算済みフィールドを含む最新データを取得
        await reloadRecords()
        toast.success('燃費記録を削除しました')
      } catch (error) {
        console.error('Failed to delete fuel record:', error)
        toast.error('燃費記録の削除に失敗しました')
      } finally {
        setIsLoading(false)
      }
    },
    [reloadRecords],
  )

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
