import { describe, it, expect } from "vitest";
import { stringCalculator } from "./stringCalculator";

describe("String Calculator", () => {
  it("should return 0 for an empty string", () => {
    expect(stringCalculator("")).toBe(0);
  });
});

it("should return the number itself for a single input", () => {
  expect(stringCalculator("5")).toBe(5);
});

it("should return the sum of two comma-separated numbers", () => {
  expect(stringCalculator("1,2")).toBe(3);
});
