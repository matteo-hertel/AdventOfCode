package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

type NanoBots map[Coordinate][]int

func NewNanoBots(input []string) NanoBots {
	m := make(NanoBots)

	for _, data := range input {
		var r int
		var c Coordinate

		_, err := fmt.Sscanf(data, "pos=<%d,%d,%d>, r=%d", &c.X, &c.Y, &c.Z, &r)
		if err != nil {
			panic(err)
		}
		m[c] = append(m[c], r)
	}

	return m
}

func (m NanoBots) HaveInRange(pos Coordinate) int {
	var sum int

	for c, rs := range m {
		for _, r := range rs {
			if pos.Distance(c) <= r {
				sum++
			}
		}
	}

	return sum
}

type Coordinate struct {
	X, Y, Z int
}

var Zero = Coordinate{X: 0, Y: 0, Z: 0}

func (c Coordinate) Distance(a Coordinate) int {
	return Abs(c.X-a.X) + Abs(c.Y-a.Y) + Abs(c.Z-a.Z)
}
func StrongestReachable(bots NanoBots) int {
	var largestRadius, count int
	var largestPos Coordinate

	for c, rs := range bots {
		for _, r := range rs {
			if r > largestRadius {
				largestPos = c
				largestRadius = r
			}
		}
	}

	for c, rs := range bots {
		if largestPos.Distance(c) <= largestRadius {
			count += len(rs)
		}
	}

	return count
}

func ClosestSuccess(bots NanoBots) int {
	var cur, topLeft, bottomRight Coordinate
	zoom := 1 << (strconv.IntSize - 2)

	for {
		zoomedBots := make(NanoBots)
		best := struct {
			pos   Coordinate
			count int
		}{}

		for c, rs := range bots {
			for _, r := range rs {
				zc := Coordinate{c.X / zoom, c.Y / zoom, c.Z / zoom}
				zoomedBots[zc] = append(zoomedBots[zc], r/zoom)
			}
		}

		for cur.X = topLeft.X; cur.X <= bottomRight.X; cur.X++ {
			for cur.Y = topLeft.Y; cur.Y <= bottomRight.Y; cur.Y++ {
				for cur.Z = topLeft.Z; cur.Z <= bottomRight.Z; cur.Z++ {
					c := zoomedBots.HaveInRange(cur)

					// skip less bots
					if c < best.count {
						continue
					}
					// skip same amount of bots but Distance from Zero is the same or more
					if c == best.count && Zero.Distance(cur) >= Zero.Distance(best.pos) {
						continue
					}
					// more bots or same and closer to Zero
					best.pos, best.count = cur, c
				}
			}
		}

		// zoom in
		topLeft.X, topLeft.Y, topLeft.Z = (best.pos.X-1)<<1, (best.pos.Y-1)<<1, (best.pos.Z-1)<<1
		bottomRight.X, bottomRight.Y, bottomRight.Z = (best.pos.X+1)<<1, (best.pos.Y+1)<<1, (best.pos.Z+1)<<1
		zoom >>= 1

		if zoom == 0 {
			return Zero.Distance(best.pos)
		}
	}
}
func Abs(x int) int {
	if x >= 0 {
		return x
	}
	return -x
}
func main() {

	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(StrongestReachable(NewNanoBots(lines)))
	fmt.Println(ClosestSuccess(NewNanoBots(lines)))
}

func getInput() ([]string, error) {
	scanner := bufio.NewScanner(os.Stdin)
	var data []string

	for scanner.Scan() {
		data = append(data, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return data, nil
}
