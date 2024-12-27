export interface ResponseUsers {
  id: string;
  name: string;
  email: string;
  contact: string;
  contact_secondary: string;
  enterprise: string;
  sector: string;
}

export async function getUsers(): Promise<ResponseUsers[]> {
  const response = await fetch(`/api/get-users`);

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
