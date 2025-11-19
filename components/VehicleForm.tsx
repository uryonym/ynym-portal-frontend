'use client'

import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
} from '@/lib/types/vehicle'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'

interface VehicleFormProps {
  initialData?: Vehicle | null
  onSubmit: (data: CreateVehicleInput | UpdateVehicleInput) => void
  onCancel: () => void
  onDelete?: (id: string) => void
  isLoading?: boolean
}

export function VehicleForm({
  initialData,
  onSubmit,
  onCancel,
  onDelete,
  isLoading = false,
}: VehicleFormProps) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [maker, setMaker] = useState(initialData?.maker ?? '')
  const [model, setModel] = useState(initialData?.model ?? '')
  const [year, setYear] = useState(initialData?.year?.toString() ?? '')
  const [number, setNumber] = useState(initialData?.number ?? '')
  const [tankCapacity, setTankCapacity] = useState(
    initialData?.tank_capacity?.toString() ?? '',
  )
  const nameInputRef = useRef<HTMLInputElement>(null)

  // 新規追加時はオートフォーカス、編集時はカーソルを最後に配置
  useEffect(() => {
    if (initialData && nameInputRef.current) {
      // 編集時: フォーカスを外す
      setTimeout(() => {
        nameInputRef.current?.blur()
      }, 0)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !name.trim() ||
      !maker.trim() ||
      !model.trim() ||
      !year ||
      !number.trim()
    ) {
      return
    }

    const data = {
      name: name.trim(),
      maker: maker.trim(),
      model: model.trim(),
      year: parseInt(year, 10),
      number: number.trim(),
      ...(tankCapacity && { tank_capacity: parseFloat(tankCapacity) }),
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          車の名前 <span className="text-red-500">*</span>
        </label>
        <Input
          ref={nameInputRef}
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：マイカー1"
          disabled={isLoading}
          required
          className="h-10"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="maker"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メーカー <span className="text-red-500">*</span>
          </label>
          <Input
            id="maker"
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
            placeholder="例：Toyota"
            disabled={isLoading}
            required
            className="h-10"
          />
        </div>
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            モデル <span className="text-red-500">*</span>
          </label>
          <Input
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="例：Prius"
            disabled={isLoading}
            required
            className="h-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            年式 <span className="text-red-500">*</span>
          </label>
          <Input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="例：2023"
            disabled={isLoading}
            required
            className="h-10"
            min="1900"
            max="2100"
          />
        </div>
        <div>
          <label
            htmlFor="tankCapacity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            タンク容量 (L)
          </label>
          <Input
            id="tankCapacity"
            type="number"
            value={tankCapacity}
            onChange={(e) => setTankCapacity(e.target.value)}
            placeholder="例：50"
            disabled={isLoading}
            className="h-10"
            min="1"
            step="0.1"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ナンバープレート <span className="text-red-500">*</span>
        </label>
        <Input
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="例：東京 123あ 1234"
          disabled={isLoading}
          required
          className="h-10"
        />
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
            disabled={
              isLoading ||
              !name.trim() ||
              !maker.trim() ||
              !model.trim() ||
              !year ||
              !number.trim()
            }
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
            この車両を削除
          </Button>
        )}
      </div>
    </form>
  )
}
