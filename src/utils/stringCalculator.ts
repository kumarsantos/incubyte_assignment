function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[]\]/g, "$&");
}

export const stringCalculator = (input: string): number => {
  if (!input) return 0;

  let delimiters: string[] = [",", "\n"];
  let numbersPart = input;

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
