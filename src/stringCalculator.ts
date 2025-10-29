export const stringCalculator = (input: string): number => {
  if (!input) return 0;

  const numbers = input.split(/,|\n/).map(Number);
  return numbers.reduce((a, b) => a + b, 0);
};
