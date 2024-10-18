interface ResponseEnterprises {
  enterprises: {
    id: string
    name: string
    city: string
    uf: string
    contact: string

  }[]
}


export async function getEnterprises(): Promise<ResponseEnterprises> {

  const response = await fetch('/api/get-enterprises')
  const data = await response.json()
  return data
}