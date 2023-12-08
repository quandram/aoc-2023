import { readFileSync } from "fs";

const debug = false;
const fileName = `day-04${debug ? ".test" : ".input"}`;

const data: Array<string> = readFileSync(fileName, "utf8").trim().split(/\n/);
console.log(data.at(-1));
class Scratch {
  id: number;
  scratchNumbers: Array<number>;
  winningNumbers: Array<number>;
  instances: number;

  matchingNumbers = () =>
    this.scratchNumbers.filter((x) => this.winningNumbers.includes(x));

  matchingNumbersCount = () => this.matchingNumbers().length;

  constructor(id: number, s: Array<number>, w: Array<number>) {
    this.id = id;
    this.scratchNumbers = s;
    this.winningNumbers = w;
    this.instances = 1;
  }
}

const cards = data.map((x) => {
  const idSplit = x.split(/:/);
  const numberSplit = idSplit[1].trim().split(/\|/);
  return new Scratch(
    +idSplit[0].split(/[ ]+/)[1],
    numberSplit[1]
      .trim()
      .split(/[ ]+/)
      .map((x) => +x),
    numberSplit[0]
      .trim()
      .split(/[ ]+/)
      .map((x) => +x),
  );
});

cards.map((x, i) => {
  for (let j = 0; j < x.instances; j++) {
    for (let k = 0; k < x.matchingNumbersCount(); k++) {
      const cardIndexToUpdate = i + k + 1;
      if (cardIndexToUpdate < cards.length) {
        cards[cardIndexToUpdate].instances++;
      }
    }
  }
});

console.log(
  `part 1: ${cards
    .map((x) =>
      x.matchingNumbers().reduce((p, c) => (p = p === 0 ? 1 : p * 2), 0),
    )
    .reduce((p, c) => p + c, 0)}`,
);

console.log(`part 2: ${cards.reduce((p, c) => p + c.instances, 0)}`);
/*
console.log(cards);
console.log(cards.at(-1)?.id);
console.log(cards.at(-1)?.scratchNumbers);
console.log(cards.at(-1)?.winningNumbers);
console.log(cards.at(-1)?.matchingNumbers());
*/
