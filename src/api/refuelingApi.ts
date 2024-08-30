import { BASE_API_URL } from '../libs/constants'
import { supabase } from '../libs/supabase'
import { Refueling } from '../models/Refueling'

export const getRefuelings = async (carId: string | undefined): Promise<Refueling[]> => {
  if (carId) {

    const headers = await tokenHeaders()
    const response = await fetch(`${BASE_API_URL}/cars/${carId}/refuelings`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const rawData = await response.json()
    const data: Refueling[] = rawData.map((refueling: any) => ({
      ...refueling,
      refuelDatetime: new Date(refueling.refuelDatetime),
      createdAt: new Date(refueling.createdAt),
      updatedAt: new Date(refueling.updatedAt),
    }))

    return data
  } else {
    return []
  }
}

export const createRefueling = async (params: {carId: string, refueling: Refueling}) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars/${params.carId}/refuelings`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params.refueling),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const updateRefueling = async (params: {carId: string, refueling: Refueling}) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars/${params.carId}/refuelings/${params.refueling.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(params.refueling),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const deleteRefueling = async (params: {carId: string, id: string}) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/cars/${params.carId}/refuelings/${params.id}`, {
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

export const formatDatetime = (date: Date | undefined) => {
  if (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}
