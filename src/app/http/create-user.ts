type UserRequest = {
  name: string;
  email: string;
  password: string;
  contact: string;
  contact_secondary?: string;
  enterprise: string;
  sector: string;
};

export async function createUser({
  contact,
  contact_secondary,
  email,
  enterprise,
  name,
  password,
  sector,
}: UserRequest) {
  const response = await fetch(`/api/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      enterprise,
      sector,
      contact: Number(contact),
      contact_secondary: Number(contact_secondary),
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
