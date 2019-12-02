import * as rawInput from "./input.json";
const { input } = rawInput;

const firstInput = [...input];
firstInput[1] = 12;
firstInput[2] = 2;

const solution1 = processIntcode(firstInput);
const [noun, verb] = getInputPair(input);
const solution2 = 100 * noun + verb;

console.log({ solution1: solution1[0], solution2 });

function getInputPair(input: number[], solution = 19690720): number[] {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const inputCopy = [...input];
      inputCopy[1] = noun;
      inputCopy[2] = verb;
      const processed = processIntcode(inputCopy);
      if (processed[0] === solution) {
        return [noun, verb];
      }
    }
  }
  return [];
}

export function processIntcode(intcode: number[]): number[] {
  for (let i = 0; i < intcode.length; i += 4) {
    const opcode = intcode[0 + i];
    const p1 = intcode[1 + i];
    const p2 = intcode[2 + i];
    const p3 = intcode[3 + i];

    switch (opcode) {
      case 1:
        intcode[p3] = intcode[p1] + intcode[p2];
        break;
      case 2:
        intcode[p3] = intcode[p1] * intcode[p2];
        break;
      case 99:
        return intcode;
      default:
        throw new Error("Invalid opcode");
    }
  }
}
