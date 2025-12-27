import {
  VehiclesResponse,
  VehicleResponse,
  CreateVehicleInput,
  UpdateVehicleInput,
} from '@/lib/types/vehicle'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export async function fetchVehicles(): Promise<VehiclesResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/vehicles`, {
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    throw error
  }
}

export async function createVehicle(
  input: CreateVehicleInput,
): Promise<VehicleResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error(`Failed to create vehicle: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating vehicle:', error)
    throw error
  }
}

export async function updateVehicle(
  id: string,
  input: UpdateVehicleInput,
): Promise<VehicleResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error(`Failed to update vehicle: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating vehicle:', error)
    throw error
  }
}

export async function deleteVehicle(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/vehicles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`Failed to delete vehicle: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    throw error
  }
}
