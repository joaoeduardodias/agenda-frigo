export interface ResponseSectors {
  sectors: {
    id: string;
    name: string;
  }[];
}

export async function getSectors(): Promise<ResponseSectors> {
  const response = await fetch(`/api/get-sectors`);

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject({
      status: response.status,
      message: error.error || "Error api",
    });
  }
  const data = await response.json();
  return data;
}
