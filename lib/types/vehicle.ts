export interface Vehicle {
  id: string
  user_id: string
  name: string
  seq: number
  maker: string
  model: string
  year: number
  number: string
  tank_capacity: number
  created_at: string
  updated_at: string
}

export interface VehiclesResponse {
  data: Vehicle[]
  message: string
}

export interface VehicleResponse {
  data: Vehicle
  message: string
}

export interface CreateVehicleInput {
  name: string
  maker: string
  model: string
  year: number
  number: string
  tank_capacity: number
}

export interface UpdateVehicleInput {
  name?: string
  maker?: string
  model?: string
  year?: number
  number?: string
  tank_capacity?: number
}
