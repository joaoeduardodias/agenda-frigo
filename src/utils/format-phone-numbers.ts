export function formatPhoneNumber(numbers: string): string {
  const areaCode = numbers.slice(0, 2);
  const firstPart = numbers.slice(2, 7);
  const secondPart = numbers.slice(7);

  return `(${areaCode}) ${firstPart}-${secondPart}`;
}
