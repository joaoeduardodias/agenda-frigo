import { X } from "lucide-react";
import { forwardRef, KeyboardEvent, useEffect, useState } from "react";

type Sector = {
  id: string;
  name: string;
};

interface SectorInputProps {
  sectors: Sector[];
  placeholder?: string;
  value?: Sector[]; // O valor controlado
  onChange?: (selected: Sector[]) => void; // Função para atualizar o valor
}

export const MultiSelect = forwardRef<HTMLDivElement, SectorInputProps>(
  (
    {
      sectors,
      placeholder = "Adicione os setores da empresa...",
      value = [],
      onChange,
    }: SectorInputProps,
    ref
  ) => {
    const [selectedSectors, setSelectedSectors] = useState<Sector[]>(value);
    const [query, setQuery] = useState("");
    const [filteredSectors, setFilteredSectors] = useState<Sector[]>(sectors);
    const [isFocused, setIsFocused] = useState(false);

    // Sincroniza o estado interno do componente com o valor externo (React Hook Form)
    useEffect(() => {
      setSelectedSectors(value || []);
    }, [value]);

    const addSector = (sector: Sector) => {
      if (!selectedSectors.some((item) => item.id === sector.id)) {
        const updatedSectors = [...selectedSectors, sector];
        setSelectedSectors(updatedSectors);
        if (onChange) onChange(updatedSectors); // Atualiza o valor externo
      }
      setQuery("");
      setFilteredSectors(sectors);
      setIsFocused(true);
    };

    const removeSector = (sector: Sector) => {
      const updatedSectors = selectedSectors.filter(
        (item) => item.id !== sector.id
      );
      setSelectedSectors(updatedSectors);
      if (onChange) onChange(updatedSectors); // Atualiza o valor externo
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query.trim() !== "") {
        const newSector = {
          id: query.trim().toLowerCase(),
          name: query.trim(),
        };
        addSector(newSector);
        e.preventDefault();
      }
    };

    const handleInputChange = (value: string) => {
      setQuery(value);
      setFilteredSectors(
        sectors.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    };

    const availableSectors = filteredSectors.filter(
      (sector) => !selectedSectors.some((selected) => selected.id === sector.id)
    );

    return (
      <div className="relative w-full">
        <div
          className="flex gap-2 flex-wrap w-full rounded-md border border-input bg-transparent p-2 text-base shadow-sm"
          onClick={() => setIsFocused(true)}
        >
          {selectedSectors.map((sector) => (
            <div
              key={sector.id}
              className="flex items-center bg-zinc-300 text-orange-950 px-2 py-1.5 rounded text-sm"
            >
              <span className="mt-[-3px]">{sector.name}</span>
              <X
                className="ml-1 size-3 cursor-pointer"
                onClick={() => removeSector(sector)}
              />
            </div>
          ))}
          <input
            type="text"
            value={query}
            placeholder={selectedSectors.length === 0 ? placeholder : ""}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-2 outline-none bg-transparent text-sm"
          />
        </div>

        {/* Div de setores disponíveis */}
        {isFocused && availableSectors.length > 0 && (
          <div className="absolute flex gap-2 flex-wrap w-full rounded-md border border-input bg-background p-2 shadow-lg max-h-60 overflow-auto z-10">
            {availableSectors.map((item) => (
              <div
                key={item.id}
                onClick={() => addSector(item)}
                className="flex items-center justify-center min-w-10 bg-zinc-300 text-orange-950 px-2 py-1.5 rounded text-sm cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
