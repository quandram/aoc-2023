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
const isSymbol = (y: number, x: number) =>
  !notSymbol.includes(dataArrays[y][x]);
const isPartNumber = dataArrays.map((x) => x.map((y) => false));

const lines = data.length;
const cols = dataArrays[0].length;

for (let y = 0; y < lines; y++) {
  for (let x = 0; x < cols; x++) {
    if (isSymbol(y, x)) {
      if (y > 0) {
        if (x > 0) {
          isPartNumber[y - 1][x - 1] = true;
        }
        isPartNumber[y - 1][x] = true;
        if (x < cols) {
          isPartNumber[y - 1][x + 1] = true;
        }
      }
      if (x > 0) {
        isPartNumber[y][x - 1] = true;
      }
      if (x < cols) {
        isPartNumber[y][x + 1] = true;
      }
      if (y < lines) {
        if (x > 0) {
          isPartNumber[y + 1][x - 1] = true;
        }
        isPartNumber[y + 1][x] = true;
        if (x < cols) {
          isPartNumber[y + 1][x + 1] = true;
        }
      }
    }
  }
}

const partNumbers: Array<number> = [];
for (let y = 0; y < lines; y++) {
  let currentNumber: string = "";
  let isPN: boolean = false;
  for (let x = 0; x < cols; x++) {
    const v = dataArrays[y][x];
    if (Number.isNaN(+v)) {
      if (currentNumber === "") {
        continue;
      }
      if (isPN) {
        partNumbers.push(+currentNumber);
        isPN = false;
      }
      currentNumber = "";
      continue;
    }
    currentNumber += v;
    if (!isPN) {
      isPN = isPartNumber[y][x];
    }

    if (x < cols - 1) {
      continue;
    }
    // handle the last col
    if (isPN) {
      partNumbers.push(+currentNumber);
      isPN = false;
    }
    currentNumber = "";
  }
}

console.log(`part 1: ${partNumbers.reduce((p, c) => p + c, 0)}`);

const isStarSymbol = (y: number, x: number) => dataArrays[y][x] === "*";
const isGear: Array<string[]> = dataArrays.map((y) => y.map((x) => ""));

for (let y = 0; y < lines; y++) {
  for (let x = 0; x < cols; x++) {
    if (isStarSymbol(y, x)) {
      const partNumberCount: Array<number[]> = [];
      if (y > 0) {
        if (!Number.isNaN(+dataArrays[y - 1][x])) {
          partNumberCount.push([y - 1, x]);
        } else {
          if (x > 0) {
            if (!Number.isNaN(+dataArrays[y - 1][x - 1])) {
              partNumberCount.push([y - 1, x - 1]);
            }
          }
          if (x < cols) {
            if (!Number.isNaN(+dataArrays[y - 1][x + 1])) {
              partNumberCount.push([y - 1, x + 1]);
            }
          }
        }
      }
      if (x > 0 && !Number.isNaN(+dataArrays[y][x - 1])) {
        partNumberCount.push([y, x - 1]);
      }
      if (x < cols && !Number.isNaN(+dataArrays[y][x + 1])) {
        partNumberCount.push([y, x + 1]);
      }
      if (y < lines) {
        if (!Number.isNaN(+dataArrays[y + 1][x])) {
          partNumberCount.push([y + 1, x]);
        } else {
          if (x > 0) {
            if (!Number.isNaN(+dataArrays[y + 1][x - 1])) {
              partNumberCount.push([y + 1, x - 1]);
            }
          }
          if (x < cols) {
            if (!Number.isNaN(+dataArrays[y + 1][x + 1])) {
              partNumberCount.push([y + 1, x + 1]);
            }
          }
        }
      }
      if (partNumberCount.length === 2) {
        partNumberCount.map((p) => {
          isGear[p[0]][p[1]] = `${y}-${x}`;
        });
      }
    }
  }
}

const gearNumbers: Map<string, number[]> = new Map();

for (let i = 0; i < lines; i++) {
  let currentNumber: string = "";
  let gearLocation: string = "";
  for (let j = 0; j < cols; j++) {
    const v = dataArrays[i][j];
    if (Number.isNaN(+v)) {
      if (currentNumber === "") {
        continue;
      }
      if (gearLocation !== "") {
        gearNumbers.set(gearLocation, [
          ...(gearNumbers.get(gearLocation) ?? []),
          +currentNumber,
        ]);
        gearLocation = "";
      }
      currentNumber = "";
      continue;
    }
    currentNumber += v;
    if (gearLocation === "") {
      gearLocation = isGear[i][j];
    }

    if (j < cols - 1) {
      continue;
    }
    // handle the last col
    if (gearLocation !== "") {
      gearNumbers.set(gearLocation, [
        ...(gearNumbers.get(gearLocation) ?? []),
        +currentNumber,
      ]);
      gearLocation = "";
    }
    currentNumber = "";
  }
}
console.log(
  `Part 2: ${Array.from(gearNumbers.values()).reduce(
    (p, c) => p + c[0] * c[1],
    0,
  )}`,
);
