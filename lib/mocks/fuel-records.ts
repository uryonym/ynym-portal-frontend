import { FuelRecordsResponse } from '@/lib/types/fuel-record'

export const mockFuelRecords: FuelRecordsResponse = {
  data: [
    {
      id: '650e8400-e29b-41d4-a716-446655440001',
      vehicle_id: '550e8400-e29b-41d4-a716-446655440001',
      user_id: '550e8400-e29b-41d4-a716-446655440000',
      refuel_datetime: '2025-11-19T01:00:00Z',
      total_mileage: 10000,
      fuel_type: 'ハイオク',
      unit_price: 165,
      total_cost: 6600,
      is_full_tank: true,
      gas_station_name: 'ENEOS 東京駅前',
      created_at: '2025-11-21T20:32:17.429896Z',
      updated_at: '2025-11-21T20:32:17.429896Z',
    },
    {
      id: '650e8400-e29b-41d4-a716-446655440002',
      vehicle_id: '550e8400-e29b-41d4-a716-446655440001',
      user_id: '550e8400-e29b-41d4-a716-446655440000',
      refuel_datetime: '2025-11-18T06:30:00Z',
      total_mileage: 10100,
      fuel_type: 'ハイオク',
      unit_price: 164,
      total_cost: 6400,
      is_full_tank: false,
      gas_station_name: 'JOMO 神宮前',
      created_at: '2025-11-21T20:32:17.429896Z',
      updated_at: '2025-11-21T20:32:17.429896Z',
    },
  ],
  message: '燃費記録一覧を取得しました',
}
