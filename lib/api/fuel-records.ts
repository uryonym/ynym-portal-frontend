import {
  FuelRecord,
  FuelRecordsResponse,
  CreateFuelRecordInput,
  UpdateFuelRecordInput,
} from '@/lib/types/fuel-record'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

export async function fetchFuelRecords(
  vehicleId: string,
): Promise<FuelRecordsResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/fuel-records?vehicle_id=${vehicleId}`,
      { credentials: 'include' },
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch fuel records: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching fuel records:', error)
    throw error
  }
}

export async function createFuelRecord(
  input: CreateFuelRecordInput,
): Promise<FuelRecord> {
  try {
    const response = await fetch(`${BASE_URL}/fuel-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error(`Failed to create fuel record: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating fuel record:', error)
    throw error
  }
}

export async function updateFuelRecord(
  id: string,
  input: UpdateFuelRecordInput,
): Promise<FuelRecord> {
  try {
    const response = await fetch(`${BASE_URL}/fuel-records/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error(`Failed to update fuel record: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating fuel record:', error)
    throw error
  }
}

export async function deleteFuelRecord(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/fuel-records/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`Failed to delete fuel record: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error deleting fuel record:', error)
    throw error
  }
}
