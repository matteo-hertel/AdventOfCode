package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}

	sumPot(20, lines)
	getHumongousSumPot(1000, lines)
}

func sumPot(generations int, lines []string) {
	pots := RegSplit(lines[0], ": ")[1]
	rules := make(map[string]string)

	for i := 2; i < len(lines); i++ {
		split := RegSplit(lines[i], "[ =>]+")
		rules[split[0]] = split[1]
	}
	arrayExpansion := 0
	for i := 0; i < generations; i++ {
		nextPots := ""
		for j := -1; j < len(pots)+1; j++ {
			neighbours := getNeighbours(pots, j)
			if val, ok := rules[neighbours]; ok {
				nextPots = nextPots + val
				if j == -1 {
					arrayExpansion = arrayExpansion + 1
				}
			} else {
				if j != -1 && j != len(pots)+1 {
					nextPots = nextPots + "."
				}
			}
		}
		pots = nextPots
	}
	sum := 0
	for i := 0; i < len(pots); i++ {
		if pots[i] == '#' {
			sum = sum + i - arrayExpansion
		}
	}
	fmt.Println(sum)
}

func getHumongousSumPot(generations int, lines []string) {
	pots := RegSplit(lines[0], ": ")[1]
	rules := make(map[string]string)

	for i := 2; i < len(lines); i++ {
		split := RegSplit(lines[i], "[ =>]+")
		rules[split[0]] = split[1]
	}

	arrayExpansion := 0
	prevSum := 0
	diff := 0
	for i := 0; i < generations; i++ {
		nextPots := ""
		for j := -1; j < len(pots)+1; j++ {
			neighbours := getNeighbours(pots, j)
			if val, ok := rules[neighbours]; ok {
				nextPots = nextPots + val
				if j == -1 {
					arrayExpansion = arrayExpansion + 1
				}
			} else {
				if j != -1 && j != len(pots)+1 {
					nextPots = nextPots + "."
				}
			}
		}
		pots = nextPots

		sum := 0
		for i := 0; i < len(pots); i++ {
			if pots[i] == '#' {
				sum = sum + i - arrayExpansion
			}
		}
		diff = sum - prevSum
		prevSum = sum

	}

	sum := prevSum + ((50000000000 - generations) * diff)

	fmt.Println(sum)
}

func getNeighbours(pots string, index int) string {
	if index == -1 {
		return "..." + string(pots[0]) + string(pots[1])
	} else if index == 0 {
		return ".." + string(pots[0]) + string(pots[1]) + string(pots[2])
	} else if index == 1 {
		return "." + string(pots[0]) + string(pots[1]) + string(pots[2]) + string(pots[3])
	} else if index == len(pots)-2 {
		return string(pots[index-2]) + string(pots[index-1]) + string(pots[index]) + string(pots[index+1]) + "."
	} else if index == len(pots)-1 {
		return string(pots[index-2]) + string(pots[index-1]) + string(pots[index]) + ".."
	} else if index == len(pots) {
		return string(pots[index-2]) + string(pots[index-1]) + "..."
	} else {
		return string(pots[index-2]) + string(pots[index-1]) + string(pots[index]) + string(pots[index+1]) + string(pots[index+2])
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
