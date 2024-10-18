interface RequestSectorsByEnterprise {
  enterpriseId: string
}

interface ResponseSectorsByEnterprise {
  sectors: {
    id: string
    name: string
  }[]
}[]

export async function getSectorsByEnterprise({ enterpriseId }: RequestSectorsByEnterprise): Promise<ResponseSectorsByEnterprise> {
  const response = await fetch(`/api/get-sectors-by-enterprise?id=${enterpriseId}`)

  const data = await response.json()

  return data
}