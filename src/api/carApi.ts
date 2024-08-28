import { BASE_API_URL } from '../libs/constants'
import { supabase } from '../libs/supabase'
import { Car } from '../models/Car'

export const getCars = async (): Promise<Car[]> => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars`, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  const rawData = await response.json()
  const data: Car[] = rawData.map((car: any) => ({
    ...car,
    createdAt: new Date(car.createdAt),
    updatedAt: new Date(car.updatedAt),
  }))

  return data
}

export const createCar = async (car: Car) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars`, {
    method: 'POST',
    headers,
    body: JSON.stringify(car),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const updateCar = async (car: Car) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars/${car.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(car),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const deleteCar = async (id: string) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

const tokenHeaders = async (): Promise<HeadersInit> => {
  const { data } = await supabase.auth.getSession()

  const headers: HeadersInit = {
    Authorization: `Bearer ${data.session?.access_token}`,
    'Content-Type': 'application/json',
  }

  return headers
}

export const formatDate = (date: Date | undefined) => {
  if (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
