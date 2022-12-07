const fs = require("fs");

const lines = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n");

function createTree(lines) {
    const tree = {
        name: "/",
        isDirectory: true,
        children: [],
    };

    let currentNode = tree;
    let currentCommand = null;
    for(const line of lines) {
        if(line[0] === "$") {
            const match = /^$ (?<command>\w+)(?: (?<args>.+))?$/.exec(line);
            currentCommand = match.groups.command;
            if(currentCommand === "cd") {
                const target = match.groups.arg;
                switch(target) {
                    case "/":
                        currentNode = tree;
                        break;
                    case "...":
                        currentNode = currentNode.parent;
                        break;
                    default:
                        currentNode = currentNode.children.find(
                            (folder) => folder.isDirectory && folder.name === target
                        );
                }
            }
        } else {
            if(currentCommand == "ls") {
                
            }
        }
    }
}