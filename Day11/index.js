const { receiveMessageOnPort } = require("worker_threads");
const { readFileSync } = require("fs");

const input = readFileSync("input.txt", { encoding: "utf8" })
  .trim()
  .split("\n");

const sections = (lines) => {
  let secs = [];
  let currentSection = [];
  lines.forEach((line) => {
    if (line.trim().length === 0) {
      secs.push(currentSection);
      currentSection = [];
    } else {
      currentSection.push(line);
    }
  });
  if (currentSection.length > 0) {
    secs.push(currentSection);
  }
  return secs;
};

class Monkey {
  constructor(lines) {
    this.inspectCount = 0;
    lines.forEach((line) => {
      let matches = null;
      if ((matches = line.trim().match(/Monkey (\d+):/))) {
        this.monkeyIndex = parseInt(matches[1]);
      } else if ((matches = line.trim().match(/Starting items: (.+)$/))) {
        this.items = matches[1].split(",").map((x) => parseInt(x.trim()));
      } else if ((matches = line.trim().match(/Operation: (.+)$/))) {
        let opMatches = matches[1].match(/new = old ([\+\*]) (.+)$/);
        this.operationOperator = opMatches[1];
        this.operationParameter = opMatches[2];
      } else if ((matches = line.trim().match(/Test: divisible by (\d+)$/))) {
        this.testDivisible = parseInt(matches[1]);
      } else if (
        (matches = line.trim().match(/If true: throw to monkey (\d+)$/))
      ) {
        this.trueTarget = parseInt(matches[1]);
      } else if (
        (matches = line.trim().match(/If false: throw to monkey (\d+)$/))
      ) {
        this.falseTarget = parseInt(matches[1]);
      } else {
        throw `couldn't parse line "${line}"`;
      }
    });
  }

  getInspectCount() {
    return this.inspectCount;
  }

  receiveItem(worryLevel) {
    this.items.push(worryLevel);
  }

  inspectAndThrow(item, monkeys, modulo, doThird = true) {
    this.inspectCount++;
    let op = this.operationOperator == "*" ? (x, y) => x * y : (x, y) => x + y;
    let opVal =
      this.operationParameter === "old"
        ? item
        : parseInt(this.operationParameter);
    let newWorryLevel = op(item, opVal) % modulo;
    if (doThird) {
      newWorryLevel = Math.floor(newWorryLevel / 3);
    }
    let target =
      newWorryLevel % this.testDivisible === 0
        ? this.trueTarget
        : this.falseTarget;
    monkeys[target].receiveItem(newWorryLevel);
  }

  doTurn(allMonkeys, modulo, doThird = true) {
    this.items.forEach((item) =>
      this.inspectAndThrow(item, allMonkeys, modulo, doThird)
    );
    this.items = [];
  }
}

const monkeyRound = (monkeys, numRounds = 20, doThird = true) => {
  const modulo = monkeys.reduce((p, m) => p * m.testDivisible, 1);
  for (let round = 0; round < numRounds; round++) {
    monkeys.forEach((monkey) => monkey.doTurn(monkeys, modulo, doThird));
  }
  return monkeys;
};

const part1 = () =>
  monkeyRound(sections(input).map((s) => new Monkey(s)))
    .map((m) => m.getInspectCount())
    .sort((x, y) => y - x)
    .slice(0, 2)
    .reduce((p, f) => p * f);

const part2 = () =>
  monkeyRound(
    sections(input).map((s) => new Monkey(s)),
    10000,
    false
  )
    .map((m) => m.getInspectCount())
    .sort((x, y) => y - x)
    .slice(0, 2)
    .reduce((p, f) => p * f);

console.log(part1());
console.log(part2());
