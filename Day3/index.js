const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const data = input
  .trim()
  .split(/\r?\n/)
  .filter((x) => !!x);
let part1 = 0;
let part2 = 0;

function score(duplicate) {
  const asciiCode = duplicate.charCodeAt(0);
  const offset = asciiCode > 90 ? "a".charCodeAt(0) : "A".charCodeAt(0) - 26;
  return asciiCode - offset + 1;
}

data
  .map((x) => [
    x.slice(0, x.length / 2).split(""),
    x.slice(x.length / 2).split(""),
  ])
  .forEach((line) => {
    const duplicate = line[0].filter((x) => line[1].includes(x))[0];
    part1 += score(duplicate);
  });

let elves = data.map((e) => e.split(""));

while (elves.length > 0) {
  const elf1 = elves.pop();
  const elf2 = elves.pop();
  const elf3 = elves.pop();

  const commonCharacter = elf1.find(
    (c) => elf2.includes(c) && elf3.includes(c)
  );
  part2 += score(commonCharacter);
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);
