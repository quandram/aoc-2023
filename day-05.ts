import { readFileSync } from "fs";

const debug = false;
const fileName = `day-05${debug ? ".test" : ".input"}`;

const data: Array<string> = readFileSync(fileName, "utf8").trim().split(/\n/);

class AlmanacMap {
  source: number;
  destination: number;
  range: number;

  constructor(line: string) {
    [this.destination, this.source, this.range] = line
      .split(/ /)
      .map((x) => +x.trim());
  }
}

class Seed {
  seed: number;
  soil: number = -1;
  fertilizer: number = -1;
  water: number = -1;
  light: number = -1;
  temperature: number = -1;
  humidity: number = -1;
  location: number = -1;

  constructor(seed: number) {
    this.seed = seed;
  }
}

const getNumber = (input: number, maps: Array<AlmanacMap>) => {
  const validMap = maps.filter(
    (x) => input >= x.source && input <= x.source + x.range,
  );
  return validMap.length === 0
    ? input
    : input + (validMap[0].destination - validMap[0].source);
};

const getNumberReverse = (input: number, maps: Array<AlmanacMap>) => {
  const validMap = maps.filter(
    (x) => input >= x.destination && input <= x.destination + x.range,
  );
  return validMap.length === 0
    ? input
    : input + (validMap[0].source - validMap[0].destination);
};
const gardenMaps: Array<Array<AlmanacMap>> = [];

let seeds: Array<Seed> = [];
const seedRange: Array<Array<number>> = [];
function readInput() {
  let mapSection: number = -1;
  data.forEach((x, i) => {
    if (i === 0) {
      // part 1
      seeds = x
        .split(/:/)[1]
        .trim()
        .split(/ /)
        .map((y) => new Seed(+y.trim()));

      // part 2

      const seedInput = x.split(/:/)[1].trim().split(/ /);
      for (let i = 0; i < seedInput.length; i = i + 2) {
        seedRange.push([+seedInput[i], +seedInput[i] + +seedInput[i + 1]]);
      }
      return;
    }
    switch (x.trim()) {
      case "":
        return;
      case "seed-to-soil map:":
      case "soil-to-fertilizer map:":
      case "fertilizer-to-water map:":
      case "water-to-light map:":
      case "light-to-temperature map:":
      case "temperature-to-humidity map:":
      case "humidity-to-location map:":
        gardenMaps.push([]);
        mapSection++;
        break;
      default:
        gardenMaps[mapSection].push(new AlmanacMap(x));
        break;
    }
  });
}

readInput();

seeds.forEach((x) => {
  x.soil = getNumber(x.seed, gardenMaps[0]);
  x.fertilizer = getNumber(x.soil, gardenMaps[1]);
  x.water = getNumber(x.fertilizer, gardenMaps[2]);
  x.light = getNumber(x.water, gardenMaps[3]);
  x.temperature = getNumber(x.light, gardenMaps[4]);
  x.humidity = getNumber(x.temperature, gardenMaps[5]);
  x.location = getNumber(x.humidity, gardenMaps[6]);
});

function getSeedByLocation(location: number): number {
  return gardenMaps
    .slice()
    .reverse()
    .reduce((p, c) => {
      return getNumberReverse(p, c);
    }, location);
}

console.log(
  `Part 1: ${seeds.reduce(
    (p, c) => (p = p === 0 || p > c.location ? c.location : p),
    0,
  )}`,
);

for (let i = 0; ; i++) {
  const seed = seedRange.find((x) => {
    const seedId = getSeedByLocation(i);
    return seedId >= x[0] && seedId <= x[1];
  });
  if (typeof seed !== "undefined") {
    console.log(`Part 2: ${i}`);
    break;
  }
}
