package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
)

type Coord struct {
	x float64
	y float64
}
type Input struct {
	id int
	x  float64
	y  float64
}

func main() {

	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	inputMap := mapInput(lines)
	largestArea, regions := getLargestEmptyAreaAndRegions(inputMap)
	fmt.Println("Largest Area: ", largestArea)
	fmt.Println("Regions: ", regions)
}

func getLargestEmptyAreaAndRegions(inputList []Input) (int, int) {
	height := float64(0)
	width := float64(0)
	maxSum := float64(10000)

	inf := make(map[Coord]bool)
	m := make(map[Coord]int)
	var coords []Coord

	regions := 0

	for _, input := range inputList {
		if input.y > height {
			height = input.y
		}

		if input.x > width {
			width = input.x
		}

		coords = append(coords, Coord{x: input.x, y: input.y})
	}

	for y := float64(0); y < height; y++ {
		for x := float64(0); x < width; x++ {
			mc := Coord{0, 0}
			min := float64(-1)
			tot := float64(0)
			for _, c := range coords {
				dist := math.Abs(x-c.x) + math.Abs(y-c.y)
				if dist < min || min == -1 {
					min = dist
					mc = c
				} else if dist == min {
					mc = Coord{-1, -1}
				}

				// Part 2
				tot += math.Abs(x-c.x) + math.Abs(y-c.y)
			}

			if x == 0 || y == 0 || x == width || y == height {
				inf[mc] = true
			}

			m[mc]++

			// Part 2
			if tot < maxSum {
				regions++
			}
		}
	}

	max := 0
	for k, v := range m {
		if _, found := inf[k]; v > max && !found {
			max = v
		}
	}

	return max, regions
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
func mapInput(input []string) []Input {
	inputMap := []Input{}
	n := 0
	for _, line := range input {
		i := Input{}

		if _, err := fmt.Sscanf(line, "%b, %b", &i.x, &i.y); err != nil {
			log.Fatal(err)
		}
		i.id = n
		n++

		inputMap = append(inputMap, i)
	}

	return inputMap
}
