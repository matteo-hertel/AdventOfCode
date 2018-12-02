package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	ids, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	checksum := CalculateChecksum(ids)
	fmt.Println("Checksum: ", checksum)
}

func CalculateChecksum(ids []string) int {

	twos := 0
	threes := 0

	for _, id := range ids {
		twoLettersToken, threeLettersToken := Tokenise(id)
		twos += twoLettersToken
		threes += threeLettersToken
	}
	return twos * threes
}
func Tokenise(id string) (int, int) {

	twoLettersToken := 0
	threeLettersToken := 0

	memo := map[rune]int{}
	for _, letter := range id {
		if _, ok := memo[letter]; ok {
			memo[letter] += 1
		} else {
			memo[letter] = 1
		}
	}
	for _, checksum := range memo {
		if checksum == 2 {
			twoLettersToken = 1
		}
		if checksum == 3 {
			threeLettersToken = 1
		}
	}

	return twoLettersToken, threeLettersToken
}

func SumFrequencies(frequencies *[]int) int {
	sum := 0

	for _, frequency := range *frequencies {
		sum += frequency
	}
	return sum
}

func getInput() ([]string, error) {
	scanner := bufio.NewScanner(os.Stdin)
	var ids []string

	for scanner.Scan() {
		ids = append(ids, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return ids, nil

}
