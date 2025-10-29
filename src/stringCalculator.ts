function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[]\]/g, "$&");
}

export const stringCalculator = (input: string): number => {
  if (!input) return 0;

  let delimiters = [",", "\n"];
  let numbersPart = input;

  if (input.startsWith("//")) {
    const match = input.match(/^\/\/(\[.*\]|.)\n/);
    if (match) {
      delimiters = [match[1]];
      numbersPart = input.slice(match[0].length);
    }
  }

  const splitRegex = new RegExp(
    delimiters.map((d) => escapeRegex(d)).join("|")
  );
  const numbers = numbersPart.split(splitRegex).filter(Boolean).map(Number);

  const negatives = numbers.filter((n) => n < 0);
  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
  }

  return numbers.reduce((a, b) => a + b, 0);
};
