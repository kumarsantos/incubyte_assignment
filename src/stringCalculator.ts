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
  const numbers = numbersPart.split(splitRegex).map(Number);
  return numbers.reduce((a, b) => a + b, 0);
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[]\]/g, "$&");
}
