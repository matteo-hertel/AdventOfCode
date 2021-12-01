import { fuelRequirement, recursiveFuelRequirement } from "../";

describe("Fuel requirement", () => {
  it("correctly calculate the fuel requirement", () => {
    expect(fuelRequirement(12)).toBe(2);
    expect(fuelRequirement(14)).toBe(2);
    expect(fuelRequirement(1969)).toBe(654);
    expect(fuelRequirement(100756)).toBe(33583);
  });
  it("correctly calculate the recursive fuel requirement", () => {
    expect(recursiveFuelRequirement(14)).toBe(2);
    expect(recursiveFuelRequirement(1969)).toBe(966);
    expect(recursiveFuelRequirement(100756)).toBe(50346);
  });
});

