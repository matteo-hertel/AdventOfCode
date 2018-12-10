package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

type Star struct {
	x    int
	y    int
	vX   int
	vY   int
	next *Star
}

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	head := &Star{}
	tail := head

	for _, line := range lines {
		split := RegSplit(line, "[=< ,>]+")
		star := &Star{
			x:  Str2Int(split[1]),
			y:  Str2Int(split[2]),
			vX: Str2Int(split[4]),
			vY: Str2Int(split[5]),
		}
		tail.next = star
		tail = star
	}

	smallestT := 0
	smallestArea := int(^uint(0) >> 1)
	for t := 1; t < 100000; t++ {
		maxX := 0
		maxY := 0
		minX := 0
		minY := 0

		for temp := head.next; temp.next != nil; temp = temp.next {
			x := temp.x + temp.vX*t
			if maxX < x {
				maxX = x
			} else if minX > x {
				minX = x
			}
			y := temp.y + temp.vY*t
			if maxY < y {
				maxY = y
			} else if minY > y {
				minY = y
			}
		}

		lenX := maxX - minY + 1
		lenY := maxY - minY + 1
		area := lenX + lenY

		if smallestArea > area {
			smallestArea = area
			smallestT = t
		}
	}
	fmt.Println(smallestT)

	t := smallestT

	maxX := 0
	maxY := 0
	minX := 0
	minY := 0

	for temp := head.next; temp.next != nil; temp = temp.next {
		temp.x = temp.x + temp.vX*t
		if maxX < temp.x {
			maxX = temp.x
		} else if minX > temp.x {
			minX = temp.x
		}
		temp.y = temp.y + temp.vY*t
		if maxY < temp.y {
			maxY = temp.y
		} else if minY > temp.y {
			minY = temp.y
		}
	}

	mapper := make([][]bool, maxY-minY+1)

	for i := 0; i < len(mapper); i++ {
		mapper[i] = make([]bool, maxX-minX+1)
	}

	for temp := head.next; temp.next != nil; temp = temp.next {
		mapper[temp.y][temp.x] = true
	}

	for i := 0; i < len(mapper); i++ {
		for j := 40; j < len(mapper[0]); j++ {
			if mapper[i][j] {
				fmt.Print("#")
			} else {
				fmt.Print(" ")
			}
		}
		fmt.Println()
	}

}

func Str2Int(str string) int {
	i, err := strconv.Atoi(str)
	if err != nil {
		log.Fatal(err)
	}
	return i
}
func RegSplit(text string, delimeter string) []string {
	reg := regexp.MustCompile(delimeter)
	indexes := reg.FindAllStringIndex(text, -1)
	laststart := 0
	result := make([]string, len(indexes)+1)
	for i, element := range indexes {
		result[i] = text[laststart:element[0]]
		laststart = element[1]
	}
	result[len(indexes)] = text[laststart:len(text)]
	return result
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
