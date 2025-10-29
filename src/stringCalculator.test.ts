import { describe, it, expect } from "vitest";
import { stringCalculator } from "./stringCalculator";

describe("String Calculator", () => {
  it("should return 0 for an empty string", () => {
    expect(stringCalculator("")).toBe(0);
  });
});
