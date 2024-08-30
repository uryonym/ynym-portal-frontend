export interface Refueling {
  id?: string
  refuelDatetime: Date
  odometer: number
  fuelType: string
  price: number
  totalCost: number
  isFull: boolean
  gasStand: string
  createdAt?: Date
  updatedAt?: Date
}
