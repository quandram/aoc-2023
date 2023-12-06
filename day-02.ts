import { readFileSync } from "fs";

const debug = false;
const fileName = `day-02${debug ? ".test" : ".input"}`;

const data: Array<string> = readFileSync(fileName, "utf8").trim().split(/\n/);

class ElfGameSet {
  red: number = 0;
  green: number = 0;
  blue: number = 0;

  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

class ElfGame {
  id: number = 0;
  sets: Array<ElfGameSet> = [];

  constructor(gameEntry: string) {
    let gameDetails: Array<string> = gameEntry.split(/:/);
    this.id = +gameDetails[0].split(/ /)[1];
    gameDetails = gameDetails[1].trim().split(/;/);
    this.sets = gameDetails.map((x) => {
      const colours = x.split(/, /);
      let red: number = 0;
      let green: number = 0;
      let blue: number = 0;
      colours.map((y) => {
        const colour = y.trim().split(/ /);
        switch (colour[1]) {
          case "red":
            red = +colour[0];
            break;
          case "green":
            green = +colour[0];
            break;
          case "blue":
            blue = +colour[0];
            break;
          default:
            console.log("We hit default");
            break;
        }
      });
      return new ElfGameSet(red, green, blue);
    });
  }
}

function filterGames(games: Array<ElfGame>, filter: Array<number>) {
  return games.filter((x) => {
    const invalidSets: Array<ElfGameSet> = x.sets.filter((y) => {
      return y.red > filter[0] || y.green > filter[1] || y.blue > filter[2];
    });
    return invalidSets.length === 0;
  });
}

const games: Array<ElfGame> = data.map((x) => {
  return new ElfGame(x);
});

const part1MatchingGames = filterGames(games, [12, 13, 14]);
console.log(`part 1: ${part1MatchingGames.reduce((p, c) => p + c.id, 0)}`);
