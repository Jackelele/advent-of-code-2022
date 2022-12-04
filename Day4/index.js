const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const data = input
  .trim()
  .split(/\r?\n/)
  .filter((x) => !!x)
  .map((x) => x.split(",").map((a) => a.split("-").map((i) => parseInt(i))));

let part1 = 0;
const fullyContains = (first, second) =>
  first[0] <= second[0] && first[1] >= second[1];

data.forEach((row) => {
  if (fullyContains(row[0], row[1])) part1++;
  else if (fullyContains(row[1], row[0])) part1++;
});

console.log(`Part 1: ${part1}`);

//part 2
let part2 = 0;

const overlaps = (first, second) =>
  (first[0] >= second[0] && first[0] <= second[1]) ||
  (first[1] >= second[0] && first[1] <= second[1]);

data.forEach(row => {
    if(overlaps(row[0], row[1])) part2++
    else if(overlaps(row[1], row[0])) part2++
})

console.log(`Part 2: ${part2}`);