const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

function parseArrangements(text) {
    text = text.replaceAll("    ", " [ ]");
    text = text.replaceAll("]", "");
    text = text.replaceAll("[", ";");
    text = text.replaceAll(" ", "");

    const lines = text.split(/\r?\n/).filter(x => !!x).map(x => x.split(";"));
    const stacks = [];
    for(let y = 0; y < lines.length - 1; y++) {
        lines[y].forEach((val, indx) => {
            stacks[indx] = stacks[indx] || [];
            if(val) stacks[indx].unshift(val);
        });
    }
    return stacks;
}

const [text1, text2] = input.split(/\r?\n\r?\n/);

let arrangements = parseArrangements(text1);
const instructions = text2
  .replaceAll(/(move )|(from )|(to )/g, "")
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => x.split(" "))
  .map(x => ({ count: x[0], from: x[1], to: x[2] }));

instructions.forEach(instruction => {
  for (let i = 0; i < instruction.count; i++) {
    const temp = arrangements[instruction.from].pop();
    arrangements[instruction.to].push(temp);
  }
});

let part1 = "";
arrangements.forEach(a => part1 += a.pop() || "");

arrangements = parseArrangements(text1);
instructions.forEach(instruction => {
    const from = arrangements[instruction.from];
    const to = arrangements[instruction.to];
    const temp = from.splice(from.length - instruction.count, instruction.count);
    arrangements[instruction.to] = to.concat(temp);
});

//part 2
let part2 = "";
arrangements.forEach(a => part2 += a.pop() || "")

console.log("Part 1:", part1);
console.log("Part 2:", part2);