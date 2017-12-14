/**
 * 
 * @param {*--- Day 14: Disk Defragmentation ---
Suddenly, a scheduled job activates the system's disk defragmenter. Were the situation different, you might sit and watch it for a while, but today, you just don't have that kind of time. It's soaking up valuable system resources that are needed elsewhere, and so the only option is to help it finish its task as soon as possible.

The disk in question consists of a 128x128 grid; each square of the grid is either free or used. On this disk, the state of the grid is tracked by the bits in a sequence of knot hashes.

A total of 128 knot hashes are calculated, each corresponding to a single row in the grid; each hash contains 128 bits which correspond to individual grid squares. Each bit of a hash indicates whether that square is free (0) or used (1).

The hash inputs are a key string (your puzzle input), a dash, and a number from 0 to 127 corresponding to the row. For example, if your key string were flqrgnkx, then the first row would be given by the bits of the knot hash of flqrgnkx-0, the second row from the bits of the knot hash of flqrgnkx-1, and so on until the last row, flqrgnkx-127.

The output of a knot hash is traditionally represented by 32 hexadecimal digits; each of these digits correspond to 4 bits, for a total of 4 * 32 = 128 bits. To convert to bits, turn each hexadecimal digit to its equivalent binary value, high-bit first: 0 becomes 0000, 1 becomes 0001, e becomes 1110, f becomes 1111, and so on; a hash that begins with a0c2017... in hexadecimal would begin with 10100000110000100000000101110000... in binary.

Continuing this process, the first 8 rows and columns for key flqrgnkx appear as follows, using # to denote used squares, and . to denote free ones:

##.#.#..-->
.#.#.#.#
....#.#.
#.#.##.#
.##.#...
##..#..#
.#...#..
##.#.##.-->
|      |
V      V
In this example, 8108 squares are used across the entire 128x128 grid.

Given your actual key string, how many squares are used?

Your puzzle answer was 8216.

--- Part Two ---
Now, all the defragmenter needs to know is the number of regions. A region is a group of used squares that are all adjacent, not including diagonals. Every used square is in exactly one region: lone used squares form their own isolated regions, while several adjacent squares all count as a single region.

In the example above, the following nine regions are visible, each marked with a distinct digit:

11.2.3..-->
.1.2.3.4
....5.6.
7.8.55.9
.88.5...
88..5..8
.8...8..
88.8.88.-->
|      |
V      V
Of particular interest is the region marked 8; while it does not appear contiguous in this small view, all of the squares marked 8 are connected when considering the whole 128x128 grid. In total, in this example, 1242 regions are present.

How many regions are present given your key string?

Your puzzle answer was 1139.} list
 */
function getHash(list, ins, i, skip) {
    const l = list.length
    ins.forEach(v => {
        [...Array(v).keys()]
            .map((o, k) => list[(k + i) % l])
            .reverse()
            .forEach((val, k) => (list[(k + i) % l] = val))

        i += v + skip
        skip++
    })

    return [list, i, skip]
}

function getKnotHash(l, n) {
    n = n.split('').map(v => v.charCodeAt(0))
    n.push(17, 31, 73, 47, 23)
    let list = [...Array(l).keys()]
    let skip = 0,
        i = 0

    for (let k = 0; k < 64; ++k)[list, i, skip] = getHash(list, n, i, skip)
    let dense = []

    for (let i = 0; i < list.length; i += 16)
        dense.push(list.slice(i, i + 16).reduce((xor, cur) => xor ^ cur))
    return dense.map(n => ('00' + n.toString(16)).substr(-2)).join('')
}

function generateKey(input, index) {
    return `${input}-${index}`
}

function padLeft(s) {
    return '0000'.substring(0, 4 - s.length) + s
}
function hex2Bin(n) {
    return padLeft(parseInt(n, 16).toString(2))
}


function getBinaryArray(i) {
    return i.split('')
        .map(hex2Bin)
        .join('')
        .split('')
        .map(Number);
}

function generateGrid(input) {
    return [...new Array(128).keys()]
        .map(generateKey.bind(null, input))
        .map(getKnotHash.bind(null, 256))
        .map(getBinaryArray)
}

function getUsedSquares(grid) {
    function sum(a, b) {
        return a + b;
    }
    function multiSum(acc, row) {
        return sum(acc, row.reduce(sum, 0))
    };

    return grid.reduce(multiSum, 0)
}

function getRegions(grid) {
    const visited = {}
    let groups = 0

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            calculateGroup(x, y)
        }
    }

    function calculateGroup(x, y) {
        if (!isValidNode([x, y])) return;
        groups++
        const queue = [[x, y]]
        while (queue.length) {
            const [x, y] = queue.shift()
            visited[`${x},${y}`] = true
            const adjacentNodes = [
                [x - 1, y], [x + 1, y], [x, y + 1], [x, y - 1]
            ].filter(isValidNode)
            queue.push(adjacentNodes)
        }
    }

    function isValidNode([x, y]) {
        return (
            x >= 0 &&
            (x <= grid[0].length - 1) &&
            y >= 0 &&
            (y <= grid.length - 1) &&
            !visited[`${x},${y}`] &&
            grid[y][x]
        )
    }

    return groups
}

console.log(getUsedSquares(generateGrid(getInput(0))))
console.log(getRegions(generateGrid(getInput(0))))


function getInput(debug) {
    if (debug) {
        return `flqrgnkx`;
    }
    return `nbysizxe`
}