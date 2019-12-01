import * as rawInput from "./input.json";
const { input } = rawInput;

const solution1 = input.reduce(calculateFuelRequirement, 0);
const solution2 = input.reduce(calculateRecursiveFuelRequirement, 0);

console.log({ solution1, solution2 });

function calculateFuelRequirement(acc: number, input: number): number {
  return acc + fuelRequirement(input);
}
function calculateRecursiveFuelRequirement(acc: number, input: number): number {
  return acc + recursiveFuelRequirement(input);
}

export function recursiveFuelRequirement(module: number): number {
  const fuelRequired = fuelRequirement(module);
  if (fuelRequired < 0) return 0;
  return fuelRequired + recursiveFuelRequirement(fuelRequired);
}
export function fuelRequirement(mass: number): number {
  return Math.floor(mass / 3) - 2;
}
