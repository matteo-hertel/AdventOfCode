package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

const GRIDSIZE int = 300

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	serialNumber := Str2Int(lines[0])
	getCoordinates(serialNumber)
}

func getCoordinates(serialNumber int) {
	grid := make([][]int, GRIDSIZE)
	for i := 0; i < len(grid); i++ {
		grid[i] = make([]int, GRIDSIZE)
	}

	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid); j++ {
			grid[i][j] = powerLevel(serialNumber, i, j)
		}
	}

	largestPower := 0
	largestPowerX := 0
	largestPowerY := 0
	largestSquareSize := 0
	for squareSize := 1; squareSize < GRIDSIZE; squareSize++ {
		fmt.Println(squareSize)
		for i := 0; i < len(grid)-squareSize+1; i++ {
			for j := 0; j < len(grid)-squareSize+1; j++ {
				power := 0
				for x := 0; x < squareSize; x++ {
					for y := 0; y < squareSize; y++ {
						power = power + grid[i+x][j+y]
					}
				}
				if power > largestPower {
					largestPower = power
					largestPowerX = i
					largestPowerY = j
					largestSquareSize = squareSize
				}

			}
		}
	}
	fmt.Println(largestPower, largestPowerX, largestPowerY, largestSquareSize)

}

func powerLevel(serialNumber, x, y int) int {
	rackId := x + 10
	powerLevel := rackId * y
	powerLevel = powerLevel + serialNumber
	powerLevel = powerLevel * rackId
	powerLevel = (powerLevel / 100) % 10
	powerLevel = powerLevel - 5
	return powerLevel
}

func Str2Int(str string) int {
	i, err := strconv.Atoi(str)
	if err != nil {
		log.Fatal(err)
	}
	return i
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
