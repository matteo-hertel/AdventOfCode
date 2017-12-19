/**
 * --- Day 19: A Series of Tubes ---
Somehow, a network packet got lost and ended up here. It's trying to follow a routing diagram (your puzzle input), but it's confused about where to go.

Its starting point is just off the top of the diagram. Lines (drawn with |, -, and +) show the path it needs to take, starting by going down onto the only line connected to the top of the diagram. It needs to follow this path until it reaches the end (located somewhere within the diagram) and stop there.

Sometimes, the lines cross over each other; in these cases, it needs to continue going the same direction, and only turn left or right when there's no other option. In addition, someone has left letters on the line; these also don't change its direction, but it can use them to keep track of where it's been. For example:

     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 

Given this diagram, the packet needs to take the following path:

Starting at the only line touching the top of the diagram, it must go down, pass through A, and continue onward to the first +.
Travel right, up, and right, passing through B in the process.
Continue down (collecting C), right, and up (collecting D).
Finally, go all the way left through E and stopping at F.
Following the path to the end, the letters it sees on its path are ABCDEF.

The little packet looks up at you, hoping you can help it find the way. What letters will it see (in the order it would see them) if it follows the path? (The routing diagram is very wide; make sure you view it without line wrapping.)

Your puzzle answer was YOHREPXWN.

--- Part Two ---
The packet is curious how many steps it needs to go.

For example, using the same routing diagram from the example above...

     |          
     |  +--+    
     A  |  C    
 F---|--|-E---+ 
     |  |  |  D 
     +B-+  +--+ 

...the packet would go:

6 steps down (including the first line at the top of the diagram).
3 steps right.
4 steps up.
3 steps right.
4 steps down.
3 steps right.
2 steps up.
13 steps left (including the F it stops on).
This would result in a total of 38 steps.

How many steps does the packet need to go?

Your puzzle answer was 16734.


 */

const fs = require('fs');
const {
    promisify
} = require("util");

const readFileAsync = promisify(fs.readFile);

function getCleanDiagram(input) {
    return input.split("\n");
}


function moveUp(coords) {
    return [coords[0] - 1, coords[1]];
}

function moveDown(coords) {
    return [coords[0] + 1, coords[1]];
}

function moveRight(coords) {
    return [coords[0], coords[1] + 1];
}

function moveLeft(coords) {
    return [coords[0], coords[1] - 1];
}

function read(diagram, coords) {
    if (coords[0] < 0 || coords[1] < 0) return;
    return diagram[coords[0]][coords[1]];
}

function figureOutNextMove(opposite, coords, diagram) {
    return Object.keys(moves).filter(i => i !== opposite)
        .filter(i => {
            let out = read(diagram, moves[i](coords));
            if (!out) return false;
            return !!out.trim();
        })
}
const moves = {
    UP: moveUp,
    DOWN: moveDown,
    LEFT: moveLeft,
    RIGHT: moveRight
}
async function init(debug) {
    const diagram = getCleanDiagram(await getInput(debug));
    let coords = getStartPoint(diagram);
    let direction = "DOWN"
    const letters = [];
    const skipChars = ["|", "-"];

    const opposite = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT"
    }
    let i = 0;

    while (i < 1e8) {
        i++;
        coords = moves[direction](coords);
        let currentCell = read(diagram, coords);
        if (!currentCell.trim()) {
            console.log({
                letters: letters.join(),
		    steps: i++
            });
            break;
        }
        if (skipChars.indexOf(currentCell) !== -1) {
            continue;
        }
        if (currentCell.match(/[A-Z]/)) {
            letters.push(currentCell);
            continue;
        }
        direction = figureOutNextMove(opposite[direction], coords, diagram)[0];
    }
}
init(0);

function getStartPoint(diagram) {
    return [0, diagram[0].indexOf("|")];
}







async function getInput(debug) {
    if (debug) return Promise.resolve(`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`);
    let data = await readFileAsync("./input", {
        encoding: 'utf-8'
    });
    return data;
}
