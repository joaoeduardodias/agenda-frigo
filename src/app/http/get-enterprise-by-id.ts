interface RequestGetEnterpriseById {
  enterpriseId: string;
}

export interface ResponseGetEnterpriseById {
  enterprise: {
    id: string;
    name: string;
    city: string;
    uf: string;
    contact: number;
    users: {
      id: string;
      name: string;
      email: string;
      contact: number;
      contact_secondary: number | null;
      sectors: string;
    }[];
  };
}
[];

export async function getEnterpriseById({
  enterpriseId,
}: RequestGetEnterpriseById): Promise<ResponseGetEnterpriseById> {
  const response = await fetch(`/api/get-enterprise-by-id?id=${enterpriseId}`);
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
