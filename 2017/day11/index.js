/**
 * --- Day 11: Hex Ed ---

Crossing the bridge, you've barely reached the other side of the stream when a program comes up to you, clearly in distress. "It's my child process," she says, "he's gotten lost in an infinite grid!"

Fortunately for her, you have plenty of experience with infinite grids.

Unfortunately for you, it's a hex grid.

The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the north, northeast, southeast, south, southwest, and northwest:

  \ n  /
nw +--+ ne
  /    \
-+      +-
  \    /
sw +--+ se
  / s  \
You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to reach him. (A "step" means to move from the hex you are in to any adjacent hex.)

For example:

ne,ne,ne is 3 steps away.
ne,ne,sw,sw is 0 steps away (back where you started).
ne,ne,s,s is 2 steps away (se,se).
se,sw,se,sw,sw is 3 steps away (s,s,sw).
Your puzzle answer was 685.

--- Part Two ---

How many steps away is the furthest he ever got from his starting position?

Your puzzle answer was 1457.
 */

const fs = require('fs');
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);

function getHex() {
    return {
        'n': [-1, 1],
        'ne': [0, 1],
        'se': [1, 0],
        's': [1, -1],
        'sw': [0, -1],
        'nw': [-1, 0]
    };
}

function abs(n) {
    return Math.abs(n);
}

function getMax(a, b) {
    return Math.max(a, b);
}
function getAbsMax(a, b) {
    return getMax(abs(a), abs(b));
}

function move(hex, acc, step) {
    acc[0] += hex[step][0];
    acc[1] += hex[step][1];
    acc[2] = getAbsMax(acc[0], acc[1]) > acc[2] ? getAbsMax(acc[0], acc[1]) : acc[2];
    return acc;
}
function getResult(data) {
    return {
        distance: getMax(data[0], data[1]),
        furthest: data[2]
    }
}
async function init() {
    let data = await readFileAsync("./input", { encoding: 'utf-8' });
    data = data
        .trim()
        .split(",")
        .reduce(move.bind(this, getHex()), [0, 0, 0]);
    return getResult(data);
}

init().then(result => console.log(result));




