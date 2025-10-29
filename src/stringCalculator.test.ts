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

it("should handle newline as a valid delimiter", () => {
  expect(stringCalculator("1\n2,3")).toBe(6);
});

it("should support custom single-character delimiter", () => {
  expect(stringCalculator("//;\n1;2")).toBe(3);
});

it("should throw an error for negative numbers", () => {
  expect(() => stringCalculator("1,-2,3")).toThrow("Negatives not allowed: -2");
});

it("should support multiple or long custom delimiters", () => {
  expect(stringCalculator("//[][%]\n12%3")).toBe(6);
});
