import { z } from 'zod'

export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'タイトルを入力してください')
    .max(100, 'タイトルは100文字以内で入力してください'),
  description: z.string().default(''),
  due_date: z.string().default(''),
})

export type TodoFormValues = z.infer<typeof todoFormSchema>

export const vehicleFormSchema = z.object({
  name: z.string().trim().min(1, '車の名前を入力してください'),
  maker: z.string().trim().min(1, 'メーカーを入力してください'),
  model: z.string().trim().min(1, 'モデルを入力してください'),
  year: z
    .string()
    .min(1, '年式を入力してください')
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && Number.isInteger(num) && num >= 1900 && num <= 2100
    }, '1900〜2100の整数で入力してください'),
  number: z.string().trim().min(1, 'ナンバープレートを入力してください'),
  tank_capacity: z
    .string()
    .default('')
    .refine((val) => {
      if (!val) return true
      const num = Number(val)
      return !isNaN(num) && num > 0
    }, '正の数値を入力してください'),
})

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>

export const fuelRecordFormSchema = z.object({
  refuel_datetime: z.string().min(1, '給油日時を入力してください'),
  total_mileage: z
    .string()
    .min(1, '走行距離を入力してください')
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && Number.isInteger(num) && num >= 0
    }, '0以上の整数を入力してください'),
  fuel_type: z.string().min(1, '燃料種別を選択してください'),
  unit_price: z
    .string()
    .min(1, '単価を入力してください')
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && Number.isInteger(num) && num >= 0
    }, '0以上の整数を入力してください'),
  total_cost: z
    .string()
    .min(1, '合計金額を入力してください')
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && Number.isInteger(num) && num >= 0
    }, '0以上の整数を入力してください'),
  is_full_tank: z.boolean().default(false),
  gas_station_name: z.string().default(''),
})

export type FuelRecordFormValues = z.infer<typeof fuelRecordFormSchema>
