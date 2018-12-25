package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
)

type Coordinate [4]int

func (c Coordinate) Distance(b Coordinate) int {
	sum := 0
	for i := 0; i < 4; i++ {
		sum += Abs(c[i] - b[i])
	}
	return sum
}

type Constellation map[Coordinate]struct{}

func (c Constellation) Distance(b Coordinate) int {
	shortestDistance := math.MaxInt64

	for p := range c {
		if p.Distance(b) < shortestDistance {
			shortestDistance = p.Distance(b)
		}
	}

	return shortestDistance
}

func (c Constellation) CelestialDistance(b Constellation) int {
	shortestDistance := math.MaxInt64

	for p := range c {
		if b.Distance(p) < shortestDistance {
			shortestDistance = b.Distance(p)
		}
	}

	return shortestDistance
}

func (c Constellation) Add(b Coordinate) {
	c[b] = struct{}{}
}

func (c Constellation) Merge(b Constellation) {
	for p := range b {
		c[p] = struct{}{}
		delete(b, p)
	}
}

func HotChocolatePortal(input []string) int {
	var constellations []Constellation

	for _, line := range input {
		var c Coordinate

		if _, err := fmt.Sscanf(line, "%d,%d,%d,%d", &c[0], &c[1], &c[2], &c[3]); err != nil {
			panic(err)
		}

		var found bool
		for _, constellation := range constellations {
			if constellation.Distance(c) <= 3 {
				constellation.Add(c)
				found = true
				break
			}
		}
		if !found {
			constellations = append(constellations, NewConstellation(c))
		}
	}

	var nc []Constellation
	for i, a := range constellations {
		merged := false

		for j, b := range constellations {
			if i == j {
				continue
			}

			if b.CelestialDistance(a) <= 3 {
				b.Merge(a)
				merged = true
				break
			}
		}

		if !merged {
			nc = append(nc, a)
		}
	}

	return len(nc)
}
func NewConstellation(b Coordinate) Constellation {
	c := Constellation{b: struct{}{}}
	return c
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
	fmt.Println(HotChocolatePortal(lines))
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
