import { readFileSync } from "fs";

const debug = false;
const fileName = `day-01${debug ? ".test" : ".input"}`;

const data: Array<string> = readFileSync(fileName, "utf8").trim().split(/\n/);

function getFirstAndLastDigitFromString(input: string): number {
  const r = /\d/g;
  const matches = input.match(r) ?? [];
  return +`${matches[0]}${matches.at(-1)}`;
}

const part1: Array<number> = data.map((x) => getFirstAndLastDigitFromString(x));

console.log(`Part 1: ${part1.reduce((prev, cur) => prev + cur, 0)}`);

const digits: Array<string> = Array.from({ length: 9 }, (_, i) => i + 1).map(
  (x) => x.toString(),
);
const writtenNumbers: Array<string> = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getActualMatches(matches: Array<number>): Array<number> {
  return matches.filter((x) => x > -1);
}

function replaceFirstAndLastWrittenNumbersWithDigits(input: string): string {
  const dIdxsFirst = digits.map((x) => input.indexOf(x));
  const dIdxsLast = digits.map((x) => input.lastIndexOf(x));

  const wIdxsFirst = writtenNumbers.map((x) => input.indexOf(x));
  const wIdxsLast = writtenNumbers.map((x) => input.lastIndexOf(x));

  const locationOfFirstDigit = Math.min(...getActualMatches(dIdxsFirst));
  const locationOfLastDigit = Math.max(...getActualMatches(dIdxsLast));

  const locationOfFirstWrittenNumber = Math.min(
    ...getActualMatches(wIdxsFirst),
  );
  const locationOfLastWrittenNumber = Math.max(...getActualMatches(wIdxsLast));

  if (locationOfFirstDigit > locationOfFirstWrittenNumber) {
    const firstNumberToReplace =
      wIdxsFirst.findIndex((x) => x === locationOfFirstWrittenNumber) + 1;
    input = input.replace(
      writtenNumbers[firstNumberToReplace - 1],
      firstNumberToReplace.toString(10),
    );
  }
  if (locationOfLastDigit < locationOfLastWrittenNumber) {
    const lastNumberToReplace =
      wIdxsLast.findIndex((x) => x === locationOfLastWrittenNumber) + 1;
    input =
      input.substring(0, locationOfLastWrittenNumber) +
      lastNumberToReplace.toString(10) +
      input.substring(
        locationOfLastWrittenNumber +
          writtenNumbers[lastNumberToReplace - 1].length,
      );
  }
  return input;
}

const allDigitArray: Array<string> = data.map((x) =>
  replaceFirstAndLastWrittenNumbersWithDigits(x),
);
const part2: Array<number> = allDigitArray.map((x) =>
  getFirstAndLastDigitFromString(x),
);
console.log(`Part 2: ${part2.reduce((prev, cur) => prev + cur, 0)}`);
