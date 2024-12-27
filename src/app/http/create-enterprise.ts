type CreateEnterpriseRequest = {
  name: string;
  city: string;
  uf: string;
  contact: string;
  zipCode: string;
  sectors: {
    name: string;
    id: string;
  }[];
};

export async function createEnterprise({
  city,
  contact,
  name,
  sectors,
  zipCode,
  uf,
}: CreateEnterpriseRequest) {
  const sectorsName = sectors.map((sector) => sector.name);

  const response = await fetch(`/api/create-enterprise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      city,
      contact: Number(contact),
      sectors: sectorsName,
      zipCode: Number(zipCode),
      uf,
    }),
  });

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
