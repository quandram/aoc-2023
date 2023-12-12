import { readFileSync } from "fs";

const debug = false;
const fileName = `day-07${debug ? ".test" : ".input"}`;

const data: Array<string[]> = readFileSync(fileName, "utf8")
  .trim()
  .split(/\n/)
  .map((x) => x.split(" "));

const p1CardStrength = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
const p2CardStrength = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

function getHandStrength(hand: string, cardStrength: Array<string>): number {
  return +hand
    .split("")
    .map((x) => cardStrength.indexOf(x).toString().padStart(2, "0"))
    .join("");
}

function getHandRank(hand: string, isPart2: boolean): number {
  const cards: { [char: string]: number } = {};
  hand
    .split("")
    .forEach(
      (x) => (cards[x] = typeof cards[x] === "undefined" ? 1 : cards[x] + 1),
    );
  let is3 = 0;
  let is2 = 0;
  const isJoker =
    !isPart2 || typeof cards["J"] === "undefined" ? 0 : cards["J"];
  if (isJoker >= 4) {
    return 6;
  }

  for (const c in cards) {
    if (isPart2 && c === "J") {
      continue;
    }
    const theoreticalCardCount = cards[c] + isJoker;
    switch (theoreticalCardCount) {
      case 5:
        return 6;
      case 4:
        return 5;
      case 3:
        is3++;
        break;
      case 2:
        is2++;
        break;
    }
  }
  if (
    (is3 === 1 && is2 === 1 && isJoker !== 1) ||
    (is3 === 2 && isJoker === 1)
  ) {
    return 4;
  }
  if (is3 >= 1) {
    return 3;
  }
  if (is2 === 2 && isJoker === 0) {
    return 2;
  }
  if (is2 >= 1) {
    return 1;
  }
  return 0;
}

const p1RankedData = data.map((x) => {
  return [
    getHandRank(x[0], false),
    getHandStrength(x[0], p1CardStrength),
    +x[1],
  ];
});
p1RankedData.sort((a, b) => {
  return a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1];
});

console.log(
  `Part 1: ${p1RankedData.reduce((acc, x, i) => (acc += x[2] * (i + 1)), 0)}`,
);

const p2RankedData = data.map((x) => {
  return [
    getHandRank(x[0], true),
    getHandStrength(x[0], p2CardStrength),
    +x[1],
  ];
});
p2RankedData.sort((a, b) => {
  return a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1];
});
console.log(
  `Part 2: ${p2RankedData.reduce((acc, x, i) => (acc += x[2] * (i + 1)), 0)}`,
);
