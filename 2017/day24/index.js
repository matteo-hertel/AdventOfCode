/**
 * --- Day 24: Electromagnetic Moat ---
The CPU itself is a large, black building surrounded by a bottomless pit. Enormous metal tubes extend outward from the side of the building at regular intervals and descend down into the void. There's no way to cross, but you need to get inside.

No way, of course, other than building a bridge out of the magnetic components strewn about nearby.

Each component has two ports, one on each end. The ports come in all different types, and only matching types can be connected. You take an inventory of the components by their port types (your puzzle input). Each port is identified by the number of pins it uses; more pins mean a stronger connection for your bridge. A 3/7 component, for example, has a type-3 port on one side, and a type-7 port on the other.

Your side of the pit is metallic; a perfect surface to connect a magnetic, zero-pin port. Because of this, the first port you use must be of type 0. It doesn't matter what type of port you end with; your goal is just to make the bridge as strong as possible.

The strength of a bridge is the sum of the port types in each component. For example, if your bridge is made of components 0/3, 3/7, and 7/4, your bridge has a strength of 0+3 + 3+7 + 7+4 = 24.

For example, suppose you had the following components:

0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
With them, you could make the following valid bridges:

0/1
0/1--10/1
0/1--10/1--9/10
0/2
0/2--2/3
0/2--2/3--3/4
0/2--2/3--3/5
0/2--2/2
0/2--2/2--2/3
0/2--2/2--2/3--3/4
0/2--2/2--2/3--3/5
(Note how, as shown by 10/1, order of ports within a component doesn't matter. However, you may only use each port on a component once.)

Of these bridges, the strongest one is 0/1--10/1--9/10; it has a strength of 0+1 + 1+10 + 10+9 = 31.

What is the strength of the strongest bridge you can make with the components you have available?

Your puzzle answer was 1868.

--- Part Two ---
The bridge you've built isn't long enough; you can't jump the rest of the way.

In the example above, there are two longest bridges:

0/2--2/2--2/3--3/4
0/2--2/2--2/3--3/5
Of them, the one which uses the 3/5 component is stronger; its strength is 0+2 + 2+2 + 2+3 + 3+5 = 19.

What is the strength of the longest bridge you can make? If you can make multiple bridges of the longest length, pick the strongest one.

Your puzzle answer was 1841.
 */
function buildBridge(n) {
    n = n.trim().split('\n').map(l => l.split('/').map(Number))

    let bridgeValue = 0

    let bridgeValue2 = 0
    let bridgeValue2Length = 0

    for (let i = 0; i < 1000000000; ++i) {
        if (i % 10000 === 0) {
            console.log('bridgeValue:', bridgeValue)
            console.log('bridgeValue2:', bridgeValue2, 'length:', bridgeValue2Length)
        }

        const [val, len] = getLink(n.slice())
        if (val > bridgeValue) {
            bridgeValue = val
        }
        if (len > bridgeValue2Length) {
            bridgeValue2 = val
            bridgeValue2Length = len
        } else if (len === bridgeValue2Length && val > bridgeValue2) {
            bridgeValue2 = val
        }
    }

    return bridgeValue
}

function getLink(n) {
    let currentLink = 0
    let links = []
    while (true) {
        let possibles = n.filter(v => v[0] === currentLink || v[1] === currentLink)
        if (possibles.length === 0) break
        let link
        if (Math.random() > 0.45) {
            link = possibles[Math.floor(Math.random() * possibles.length)]
        } else {
            link = possibles.reduce((p, c) => (c[0] + c[1] > p[0] + p[1] ? c : p), [
                -1,
                -1
            ])
        }
        links.push(link)
        let i = link.indexOf(currentLink)
        currentLink = link.slice(1 - i, 2 - i)[0]
        n.splice(n.indexOf(link), 1)
    }
    return [links.reduce((p, c) => p + c[0] + c[1], 0), links.length]


}




buildBridge(`
25/13
4/43
42/42
39/40
17/18
30/7
12/12
32/28
9/28
1/1
16/7
47/43
34/16
39/36
6/4
3/2
10/49
46/50
18/25
2/23
3/21
5/24
46/26
50/19
26/41
1/50
47/41
39/50
12/14
11/19
28/2
38/47
5/5
38/34
39/39
17/34
42/16
32/23
13/21
28/6
6/20
1/30
44/21
11/28
14/17
33/33
17/43
31/13
11/21
31/39
0/9
13/50
10/14
16/10
3/24
7/0
50/50
 `)