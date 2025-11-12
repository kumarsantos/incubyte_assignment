export const stringCalculator = (input: string): number => {
  if (!input) return 0;

  const modifiedInput = input
    .split(",")
    .map((value) => (value.includes("*") ? multiplyTwoNumber(value) : value))
    .join(",");

  let delimiters: string[] = [",", "\n"];
  let numbersPart = modifiedInput;

  if (input.startsWith("//")) {
    const match = input.match(/^\/\/(\[.*\]|.)\n/);

    if (match) {
      const delimiterDef = match[1];

      if (delimiterDef.startsWith("[")) {
        const regex = /\[(.*?)\]/g;
        delimiters = [];
        let m: RegExpExecArray | null;
        while ((m = regex.exec(delimiterDef))) {
          delimiters.push(m[1]);
        }
      } else {
        delimiters = [delimiterDef];
      }

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

  return numbers.filter((n) => n <= 1000).reduce((a, b) => a + b, 0);
};

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[]\]/g, "$&");
}

export function multiplyTwoNumber(numString: string): number {
  return numString.split("*").reduce((acc, num) => (acc *= Number(num)), 1);
}
