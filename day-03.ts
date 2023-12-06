import { readFileSync } from "fs";

const debug = false;
const fileName = `day-03${debug ? ".test" : ".input"}`;

const data: Array<string> = readFileSync(fileName, "utf8").trim().split(/\n/);
const dataArrays: Array<string[]> = data.map((x) => x.split(""));

const notSymbol: Array<string> = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const isSymbol: Array<boolean[]> = dataArrays.map((x) =>
  x.map((y) => !notSymbol.includes(y)),
);
const couldBePartNumber: Array<boolean[]> = dataArrays.map((x) =>
  x.map((y) => false),
);

const lines = data.length;
const cols = dataArrays[0].length;

for (let i = 0; i < lines; i++) {
  for (let j = 0; j < cols; j++) {
    if (isSymbol[i][j]) {
      if (i > 0) {
        if (j > 0) {
          couldBePartNumber[i - 1][j - 1] = true;
        }
        couldBePartNumber[i - 1][j] = true;
        if (j < cols) {
          couldBePartNumber[i - 1][j + 1] = true;
        }
      }
      if (j > 0) {
        couldBePartNumber[i][j - 1] = true;
      }
      if (j < cols) {
        couldBePartNumber[i][j + 1] = true;
      }
      if (i < lines) {
        if (j > 0) {
          couldBePartNumber[i + 1][j - 1] = true;
        }
        couldBePartNumber[i + 1][j] = true;
        if (j < cols) {
          couldBePartNumber[i + 1][j + 1] = true;
        }
      }
    }
  }
}

const partNumbers: Array<number> = [];
for (let i = 0; i < lines; i++) {
  let currentNumber: string = "";
  let isPartNumber: boolean = false;
  for (let j = 0; j < cols; j++) {
    const v = dataArrays[i][j];
    if (Number.isNaN(+v)) {
      if (currentNumber === "") {
        continue;
      }
      if (isPartNumber) {
        partNumbers.push(+currentNumber);
        isPartNumber = false;
      }
      currentNumber = "";
      continue;
    }
    currentNumber += v;
    if (!isPartNumber) {
      isPartNumber = couldBePartNumber[i][j];
    }

    if (j < cols - 1) {
      continue;
    }
    // handle the last col
    if (isPartNumber) {
      partNumbers.push(+currentNumber);
      isPartNumber = false;
    }
    currentNumber = "";
  }
}

console.log(`part 1: ${partNumbers.reduce((p, c) => p + c, 0)}`);
