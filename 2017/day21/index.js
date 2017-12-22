/**
 *--- Day 21: Fractal Art ---
You find a program trying to generate some art. It uses a strange process that involves repeatedly enhancing the detail of an image through a set of rules.

The image consists of a two-dimensional square grid of pixels that are either on (#) or off (.). The program always begins with this pattern:

.#.
..#
###
Because the pattern is both 3 pixels wide and 3 pixels tall, it is said to have a size of 3.

Then, the program repeats the following process:

If the size is evenly divisible by 2, break the pixels up into 2x2 squares, and convert each 2x2 square into a 3x3 square by following the corresponding enhancement rule.
Otherwise, the size is evenly divisible by 3; break the pixels up into 3x3 squares, and convert each 3x3 square into a 4x4 square by following the corresponding enhancement rule.
Because each square of pixels is replaced by a larger one, the image gains pixels and so its size increases.

The artist's book of enhancement rules is nearby (your puzzle input); however, it seems to be missing rules. The artist explains that sometimes, one must rotate or flip the input pattern to find a match. (Never rotate or flip the output pattern, though.) Each pattern is written concisely: rows are listed as single units, ordered top-down, and separated by slashes. For example, the following rules correspond to the adjacent patterns:

../.#  =  ..
          .#

                .#.
.#./..#/###  =  ..#
                ###

                        #..#
#..#/..../#..#/.##.  =  ....
                        #..#
                        .##.
When searching for a rule to use, rotate and flip the pattern as necessary. For example, all of the following patterns match the same rule:

.#.   .#.   #..   ###
..#   #..   #.#   ..#
###   ###   ##.   .#.
Suppose the book contained the following two rules:

../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
As before, the program begins with this pattern:

.#.
..#
###
The size of the grid (3) is not divisible by 2, but it is divisible by 3. It divides evenly into a single square; the square matches the second rule, which produces:

#..#
....
....
#..#
The size of this enhanced grid (4) is evenly divisible by 2, so that rule is used. It divides evenly into four squares:

#.|.#
..|..
--+--
..|..
#.|.#
Each of these squares matches the same rule (../.# => ##./#../...), three of which require some flipping and rotation to line up with the rule. The output for the rule is the same in all four cases:

##.|##.
#..|#..
...|...
---+---
##.|##.
#..|#..
...|...
Finally, the squares are joined into a new grid:

##.##.
#..#..
......
##.##.
#..#..
......
Thus, after 2 iterations, the grid contains 12 pixels that are on.

How many pixels stay on after 5 iterations?

Your puzzle answer was 158.

--- Part Two ---
How many pixels stay on after 18 iterations?

Your puzzle answer was 2301762.
 */

debug = 0;

var rules = {};
getInput(debug).trim().split('\n').forEach(d => {
    var tokens = d.split(' => ');
    rules[tokens[0]] = tokens[1];
})
var grid;

function doProblem(totalReps) {
    grid = ['.#.','..#','###'];
    for(var loop=0; loop<totalReps; loop++) {
        var sub = getSubgrids();
        for(var l=0; l<sub.length; l++) {
            sub[l] = rule(sub[l]);
        }
        grid = reform(sub);
    }
}

function rule(str) {
    for(var i=0; i<2; i++)
        for(var j=0; j<4; j++) {
            var s = morph(str, j, i)
            if(rules.hasOwnProperty(s))
                return rules[s];
        }
}

function morph(str,rotate,flip) {
    var s = str.split('/');
    if(flip) s.reverse();

    for(var r=0; r<rotate; r++) {
        var n = [];
        for(i=0; i<s.length; i++) {
            var news = "";
            for(var j=s.length-1; j>=0; j--)
                news += s[j][i];
            n.push(news)
        }
        s = n;
    }
    return s.join('/')
}

function getSubgrids() {
    var num = grid.length % 2 == 0 ? 2 : 3;
    var strs = [];
    for(var i=0; i<grid.length; i += num)
        for(var j=0; j<grid.length; j += num) {
            var str = "";
            for(var k=0; k<num; k++)
                str += grid[i+k].substring(j,j+num) + "/"
            strs.push(str.substr(0,str.length-1));
        }
    return strs;
}

function reform(arr) {
    var g = [];
    var num = Math.sqrt(arr.length);
    var strlen = arr[0].match(/\//g).length+1;
    for(var i=0; i<arr.length; i+=num)
        for(var j=0; j<strlen; j++) {
            var str = "";
            for(var k=0; k<num; k++)
                str += arr[i+k].split('/')[j];
            g.push(str);
        }
    return g;
}

//doProblem(5);

//var count = grid.join("").split("").filter(i => i === "#").length;
//console.log('number of # is:',count);
//return;
doProblem(18);
var count=grid.reduce((a,b) => a + b.match(/#/g).length,0)
console.log('number of # is:',count);


function getInput(debug) {
    if (debug) return `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`;
return `
../.. => .../.##/##.
#./.. => .##/.##/#..
##/.. => ..#/.../###
.#/#. => #.#/..#/##.
##/#. => .#./.#./..#
##/## => #.#/#../###
.../.../... => ..../#.../.##./..#.
#../.../... => ####/#.##/##.#/..#.
.#./.../... => ..##/..##/..##/..##
##./.../... => ..../..#./##../##.#
#.#/.../... => ##.#/..../####/...#
###/.../... => .#.#/.###/.#../.#.#
.#./#../... => .###/#.#./...#/##..
##./#../... => #.##/#.../####/###.
..#/#../... => ####/...#/...#/#.##
#.#/#../... => .#../##../..##/..#.
.##/#../... => .#../..##/..../.##.
###/#../... => #.../..#./.#.#/#..#
.../.#./... => #.#./.#.#/.###/...#
#../.#./... => ###./.#../...#/.#..
.#./.#./... => ##.#/.#../#..#/##..
##./.#./... => #..#/...#/.#.#/###.
#.#/.#./... => .##./#.../#..#/.###
###/.#./... => .#.#/##.#/..../##.#
.#./##./... => ##.#/#.##/.#.#/#.##
##./##./... => #.##/..#./..#./.##.
..#/##./... => ..../#.../..#./..##
#.#/##./... => .##./####/####/####
.##/##./... => #.##/####/#.##/#..#
###/##./... => .#../.###/##../...#
.../#.#/... => ...#/...#/#.##/####
#../#.#/... => ..#./..#./###./.##.
.#./#.#/... => .##./##../.###/.#.#
##./#.#/... => #.#./.#../.##./...#
#.#/#.#/... => ##.#/..##/#.../##.#
###/#.#/... => ..##/##../.#.#/..##
.../###/... => .#../#.../.##./....
#../###/... => ..##/..##/...#/.##.
.#./###/... => #..#/..#./#.#./..##
##./###/... => #.##/.#../##.#/##.#
#.#/###/... => ####/###./.##./...#
###/###/... => #..#/#.##/..../.##.
..#/.../#.. => #.#./.#../##../..#.
#.#/.../#.. => ##.#/####/##../.#.#
.##/.../#.. => ####/##../#..#/..#.
###/.../#.. => ##../..#./####/##.#
.##/#../#.. => ##../#.#./###./..##
###/#../#.. => ..../.#../#..#/...#
..#/.#./#.. => ..#./...#/.###/.#.#
#.#/.#./#.. => ###./..../#.#./###.
.##/.#./#.. => ####/#.##/.#.#/.#..
###/.#./#.. => ###./#.##/##../####
.##/##./#.. => ##.#/..##/..#./.#..
###/##./#.. => ##.#/.##./.###/.##.
#../..#/#.. => #.../###./##.#/#..#
.#./..#/#.. => ..##/.###/...#/..#.
##./..#/#.. => ##../#.#./...#/.#..
#.#/..#/#.. => ..#./###./##../.###
.##/..#/#.. => #.../.##./..../#.#.
###/..#/#.. => .#.#/#.##/#.##/..#.
#../#.#/#.. => ..##/..##/#.../####
.#./#.#/#.. => #.../...#/..../..##
##./#.#/#.. => ###./..##/.#../.##.
..#/#.#/#.. => ...#/..##/..#./.#..
#.#/#.#/#.. => #.#./.#../..../##..
.##/#.#/#.. => ..#./.###/##.#/....
###/#.#/#.. => #.##/..##/...#/##..
#../.##/#.. => #.#./##../###./.#.#
.#./.##/#.. => .###/#..#/.##./....
##./.##/#.. => .#.#/.#../.###/.##.
#.#/.##/#.. => .#../..##/###./#.##
.##/.##/#.. => ##../.##./..#./.#..
###/.##/#.. => .#.#/..#./#..#/.###
#../###/#.. => #.##/#..#/.#.#/#.#.
.#./###/#.. => #.../#..#/#.../.#.#
##./###/#.. => ##../####/##../.###
..#/###/#.. => #.../..../####/##.#
#.#/###/#.. => ...#/..../...#/..##
.##/###/#.. => .#../####/#.##/.#..
###/###/#.. => ###./.#.#/#.../##..
.#./#.#/.#. => ...#/##../####/...#
##./#.#/.#. => ####/#..#/###./#.##
#.#/#.#/.#. => .###/#..#/..#./...#
###/#.#/.#. => ###./.###/##.#/###.
.#./###/.#. => #..#/#.../..#./####
##./###/.#. => #.../..../#..#/..##
#.#/###/.#. => #..#/.#.#/#.../##..
###/###/.#. => .#.#/..../.#.#/#.##
#.#/..#/##. => .#../..##/...#/###.
###/..#/##. => .###/..#./##.#/##.#
.##/#.#/##. => ####/#.##/.##./##..
###/#.#/##. => #..#/#..#/####/#.##
#.#/.##/##. => .###/#.#./#..#/.#.#
###/.##/##. => #.#./#.#./#.##/..##
.##/###/##. => ####/###./##.#/##.#
###/###/##. => ##../..##/#.#./#...
#.#/.../#.# => .#../###./.###/##.#
###/.../#.# => ..../.#.#/#..#/##..
###/#../#.# => ..#./#.../.##./...#
#.#/.#./#.# => ...#/#.../##.#/.##.
###/.#./#.# => ..../..../#.#./##.#
###/##./#.# => .#../...#/...#/###.
#.#/#.#/#.# => ...#/#.../##../.###
###/#.#/#.# => #.../...#/.#../#.##
#.#/###/#.# => ..../.##./..../##..
###/###/#.# => .##./.#.#/#.##/.##.
###/#.#/### => #.#./####/.##./.##.
###/###/### => .#.#/..##/#.##/.##.
`;
}
