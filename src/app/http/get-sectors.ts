
export interface ResponseSectors {
  sectors: {
    id: string
    name: string
  }[]
}

export async function getSectors(): Promise<ResponseSectors> {
  const response = await fetch(`/api/get-sectors`)

  const data = await response.json()

  return data
}