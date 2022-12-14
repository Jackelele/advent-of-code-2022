const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

let part1 = 0;
let part2 = 0;

const data = input.split("");

for (let i = 4; i < data.length; i++) {
  const piece = input.slice(0, i);
  const considered = piece.slice(-4);
  if (new Set(considered).size === 4) {
    part1 = piece.length;
    break;
  }
}
for (let i = 4; i < data.length; i++) {
  const piece = input.slice(0, i);
  const considered = piece.slice(-14);
  if (new Set(considered).size === 14) {
    part2 = piece.length;
    break;
  }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);
