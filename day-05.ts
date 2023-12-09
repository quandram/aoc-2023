import { readFileSync } from "fs";

const debug = true;
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

const seedToSoil: Array<AlmanacMap> = [];
const soilToFertilizer: Array<AlmanacMap> = [];
const fertilizerToWater: Array<AlmanacMap> = [];
const waterToLight: Array<AlmanacMap> = [];
const lightToTemperature: Array<AlmanacMap> = [];
const temperatureToHumidity: Array<AlmanacMap> = [];
const humidityToLocation: Array<AlmanacMap> = [];

let seeds: Array<Seed> = [];

function readInput() {
  let section: string = "";
  data.forEach((x, i) => {
    if (i === 0) {
      // part 1
      /*  seeds = x
        .split(/:/)[1]
        .trim()
        .split(/ /)
        .map((y) => new Seed(+y.trim()));
      */
      // part 2
      const seedInput = x.split(/:/)[1].trim().split(/ /);
      console.log(seedInput);
      for (let i = 0; i < seedInput.length; i = i + 2) {
          for(let j = 0; j < +seedInput[i+1]; j++) {
            console.log(i);
            console.log(j);
            seeds.push(new Seed(+seedInput[i] + j));
          }
      }
      return;
    }
    switch (x.trim()) {
      case "":
        break;
      case "seed-to-soil map:":
        section = "soil";
        break;
      case "soil-to-fertilizer map:":
        section = "fertilizer";
        break;
      case "fertilizer-to-water map:":
        section = "water";
        break;
      case "water-to-light map:":
        section = "light";
        break;
      case "light-to-temperature map:":
        section = "temperature";
        break;
      case "temperature-to-humidity map:":
        section = "humidity";
        break;
      case "humidity-to-location map:":
        section = "location";
        break;
      default:
        switch (section) {
          case "soil":
            seedToSoil.push(new AlmanacMap(x));
            break;
          case "fertilizer":
            soilToFertilizer.push(new AlmanacMap(x));
            break;
          case "water":
            fertilizerToWater.push(new AlmanacMap(x));
            break;
          case "light":
            waterToLight.push(new AlmanacMap(x));
            break;
          case "temperature":
            lightToTemperature.push(new AlmanacMap(x));
            break;
          case "humidity":
            temperatureToHumidity.push(new AlmanacMap(x));
            break;
          case "location":
            humidityToLocation.push(new AlmanacMap(x));
            break;
        }
        break;
    }
  });
}

readInput();
seeds.forEach((x) => {
  x.soil = getNumber(x.seed, seedToSoil);
  x.fertilizer = getNumber(x.soil, soilToFertilizer);
  x.water = getNumber(x.fertilizer, fertilizerToWater);
  x.light = getNumber(x.water, waterToLight);
  x.temperature = getNumber(x.light, lightToTemperature);
  x.humidity = getNumber(x.temperature, temperatureToHumidity);
  x.location = getNumber(x.humidity, humidityToLocation);
});
console.log(
  `Part 1: ${seeds.reduce(
    (p, c) => (p = p === 0 || p > c.location ? c.location : p),
    0,
  )}`,
);
