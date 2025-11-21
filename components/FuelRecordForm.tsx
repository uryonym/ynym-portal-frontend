'use client'

import { FuelRecord, CreateFuelRecordInput, UpdateFuelRecordInput } from '@/lib/types/fuel-record'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'

interface FuelRecordFormProps {
  initialData?: FuelRecord | null
  vehicleId: string
  onSubmit: (data: CreateFuelRecordInput | UpdateFuelRecordInput) => void
  onCancel: () => void
  onDelete?: (id: string) => void
  isLoading?: boolean
}

export function FuelRecordForm({
  initialData,
  vehicleId,
  onSubmit,
  onCancel,
  onDelete,
  isLoading = false,
}: FuelRecordFormProps) {
  const [refuelDatetime, setRefuelDatetime] = useState(initialData?.refuel_datetime ?? '')
  const [totalMileage, setTotalMileage] = useState(initialData?.total_mileage?.toString() ?? '')
  const [fuelType, setFuelType] = useState(initialData?.fuel_type ?? '')
  const [unitPrice, setUnitPrice] = useState(initialData?.unit_price?.toString() ?? '')
  const [totalCost, setTotalCost] = useState(initialData?.total_cost?.toString() ?? '')
  const [isFullTank, setIsFullTank] = useState(initialData?.is_full_tank ?? false)
  const [gasStationName, setGasStationName] = useState(initialData?.gas_station_name ?? '')
  const refuelRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData && refuelRef.current) {
      setTimeout(() => {
        refuelRef.current?.blur()
      }, 0)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!refuelDatetime || !totalMileage || !fuelType || !unitPrice || !totalCost) {
      return
    }

    const data = {
      vehicle_id: vehicleId,
      refuel_datetime: refuelDatetime,
      total_mileage: parseInt(totalMileage, 10),
      fuel_type: fuelType.trim(),
      unit_price: parseInt(unitPrice, 10),
      total_cost: parseInt(totalCost, 10),
      ...(isFullTank && { is_full_tank: isFullTank }),
      ...(gasStationName && { gas_station_name: gasStationName.trim() }),
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="refuelDatetime" className="block text-sm font-medium text-gray-700 mb-1">
          給油日時 <span className="text-red-500">*</span>
        </label>
        <Input
          ref={refuelRef}
          id="refuelDatetime"
          type="datetime-local"
          value={refuelDatetime.slice(0, 16)}
          onChange={(e) => setRefuelDatetime(e.target.value)}
          disabled={isLoading}
          required
          className="h-10"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="totalMileage" className="block text-sm font-medium text-gray-700 mb-1">
            走行距離 (km) <span className="text-red-500">*</span>
          </label>
          <Input
            id="totalMileage"
            type="number"
            value={totalMileage}
            onChange={(e) => setTotalMileage(e.target.value)}
            placeholder="例：10000"
            disabled={isLoading}
            required
            className="h-10"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
            燃料種別 <span className="text-red-500">*</span>
          </label>
          <select
            id="fuelType"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            disabled={isLoading}
            className="h-10 w-full px-3 border border-gray-300 rounded-md text-sm"
            required
          >
            <option value="">選択してください</option>
            <option value="レギュラー">レギュラー</option>
            <option value="ハイオク">ハイオク</option>
            <option value="軽油">軽油</option>
            <option value="電気">電気</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
            単価 (¥) <span className="text-red-500">*</span>
          </label>
          <Input
            id="unitPrice"
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="例：165"
            disabled={isLoading}
            required
            className="h-10"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700 mb-1">
            合計金額 (¥) <span className="text-red-500">*</span>
          </label>
          <Input
            id="totalCost"
            type="number"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            placeholder="例：6600"
            disabled={isLoading}
            required
            className="h-10"
            min="0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="gasStationName" className="block text-sm font-medium text-gray-700 mb-1">
          ガソリンスタンド名
        </label>
        <Input
          id="gasStationName"
          value={gasStationName}
          onChange={(e) => setGasStationName(e.target.value)}
          placeholder="例：ENEOS 東京駅前"
          disabled={isLoading}
          className="h-10"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFullTank}
            onChange={(e) => setIsFullTank(e.target.checked)}
            disabled={isLoading}
            className="rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">満タン</span>
        </label>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="h-10"
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !refuelDatetime || !totalMileage || !fuelType || !unitPrice || !totalCost}
            className="h-10"
          >
            {isLoading ? '保存中...' : '保存'}
          </Button>
        </div>

        {initialData && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onDelete(initialData.id)
              onCancel()
            }}
            disabled={isLoading}
            className="w-full h-10 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            この記録を削除
          </Button>
        )}
      </div>
    </form>
  )
}
