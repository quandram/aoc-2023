import { readFileSync } from "fs";

const debug = false;
const fileName = `day-06${debug ? ".test" : ".input"}`;

const data: Array<string> = readFileSync(fileName, "utf8").trim().split(/\n/);
const t = data[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => x);
const d = data[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => x);

const winningVariants = (time: number, distance: number) => {
  let isWin = 0;
  for (let i = Math.floor(time / 2); i > 0; i--) {
    const revUp = i;
    const winningRound = distance / revUp < time - revUp;
    if (winningRound) {
      isWin++;
    } else {
      break;
    }
  }
  return time % 2 === 0 ? isWin * 2 - 1 : isWin * 2;
};

console.log(
  `Part 1: ${t
    .map((x, i) => winningVariants(+x, +d[i]))
    .reduce((p, c) => (p = p === 0 ? c : p * c), 0)}`,
);

const t2 = t.join("");
const d2 = d.join("");

console.log(`Part 2: ${winningVariants(+t2, +d2)}`);
