import Fuse from "fuse.js";

type Contact = {
  id: string;
  name: string;
  contact: string;
  contact_secondary?: string;
  enterprise: string;
  sector: string;
};

export function filterContacts(
  contacts: Contact[],
  filterEnterprise: string,
  filterSector: string,
  search: string
): Contact[] {
  const filteredByEmpresaSetor = contacts.filter(
    (c) =>
      (filterEnterprise === "Todas" || c.enterprise === filterEnterprise) &&
      (filterSector === "Todos" || c.sector === filterSector)
  );

  const fuse = new Fuse(filteredByEmpresaSetor, {
    keys: ["name", "contact", "contact_secondary"],
    threshold: 0.4, // Quanto menor o número, mais precisa será a search
    distance: 100, // Distância para avaliar palavras semelhantes
  });

  const results = search
    ? fuse.search(search).map((result) => result.item)
    : filteredByEmpresaSetor;

  return results;
}
