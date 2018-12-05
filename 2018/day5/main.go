package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
	"unicode"
)

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Units remaining:", unitsRemaining(lines[0]))
	fmt.Println("Shortest polymer lentght:", shortestPolymerLenght(lines[0]))
}

func unitsRemaining(input string) int {
	return len(produce(input))
}

func produce(line string) string {
	for {
		changes := false
		for k, g := range line {
			if k > 0 {
				if unicode.IsLower(g) && unicode.IsUpper(rune(line[k-1])) || unicode.IsLower(rune(line[k-1])) && unicode.IsUpper(g) {
					if strings.ToLower(string(g)) == strings.ToLower(string(line[k-1])) {
						line = line[:k-1] + line[k+1:]
						changes = true
					}
				}
			}
			if changes {
				break
			}
		}
		if !changes {
			break
		}
	}

	return line
}

var alphabet = "abcdefghijklmnopqrstuvwxyz"

func shortestPolymerLenght(input string) (outcome int) {
	outcome = len(input)
	for _, c := range alphabet {
		check := strings.Replace(strings.Replace(input, string(strings.ToUpper(string(c))), "", -1), string(c), "", -1)
		l := len(produce(check))
		if l < outcome {
			outcome = l
		}
	}

	return outcome
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
