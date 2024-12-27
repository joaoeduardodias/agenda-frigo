interface RequestSectorsByEnterprise {
  enterpriseId: string;
}

interface ResponseSectorsByEnterprise {
  sectors: {
    id: string;
    name: string;
  }[];
}
[];

export async function getSectorsByEnterprise({
  enterpriseId,
}: RequestSectorsByEnterprise): Promise<ResponseSectorsByEnterprise> {
  const response = await fetch(
    `/api/get-sectors-by-enterprise?id=${enterpriseId}`
  );

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject({
      status: response.status,
      message: error.message || "Error api",
    });
  }
  const data = await response.json();
  return data;
}
