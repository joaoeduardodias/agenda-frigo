interface ResponseEnterprises {
  enterprises: {
    id: string;
    name: string;
    city: string;
    uf: string;
    contact: string;
  }[];
}

export async function getEnterprises(): Promise<ResponseEnterprises> {
  const response = await fetch("/api/get-enterprises");
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
