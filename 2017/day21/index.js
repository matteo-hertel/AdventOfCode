debug = 1;
console.log(getGridSize(getInitialGrid(debug)));
let grid = replaceInGrid(getInitialGrid(debug));
console.log(grid)
console.log(recomposeGrid(breakGrid(grid)));

function recomposeGrid(grid) {

    let len = grid.length / 2;

    console.log("here", grid);
function recursiveRecompose(grid, newGrid, index){
if(!grid.length) return newGrid;

}
}

function breakGrid(grid) {
    let gr = grid.split("\n").map(splitBy(""));
    let g = recursiveBreak(gr, []);
    return g;

    function recursiveBreak(grid, newGrid) {
        if (!grid.length) return newGrid;

        let tmp = [grid[0].splice(0, 2), grid[1].splice(0, 2)];
        newGrid.push(replaceInGrid( joinGrid(tmp)).split("\n"));
        if (!grid[0].length) {
            grid.splice(0, 2);
        }
        return recursiveBreak(grid, newGrid);
    }
}

function splitBy(separator) {
    return function split(item) {
        return item.split(separator);
    }
}

function replaceInGrid(grid) {
    let key = sortStr(grid.trim().split("\n").join("/"));
    if (getRules(debug)[key]) {
        return getRules(debug)[key].split("/").join("\n");
    }
    return grid;
}

function joinGrid(grid, joiner = "\n") {
    return grid.map(i => i.join("")).join(joiner);
}

function sortStr(str) {
    return Array.from(str).sort().join("");
}

function getRules(debug) {
    let rules;
    if (rules) {
        return rules;
    }
    rules = getInput(debug).trim().split("\n")
        .reduce((acc, i) => {
            let [key, rule] = i.trim().split(" => ");
            acc[sortStr(key)] = rule;
            return acc;
        }, {});

    return rules;
}

function getGridSize(grid) {
    return grid.trim().split("\n").length
}

function getInitialGrid() {
    return `
.#.
..#
###
`
}

function getInput(debug) {
    if (debug) return `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`;
}
