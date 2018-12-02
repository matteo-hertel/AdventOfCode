package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	ids, err := getInput()

	if err != nil {
		log.Fatal(err)
	}

	checksum := CalculateChecksum(ids)
	commonLetters := ProcessIds(ids)

	fmt.Println("Checksum: ", checksum)
	fmt.Println("Common Letters: ", commonLetters)
}

func ProcessIds(ids []string) []string {
	for _, id := range ids {
		str1, str2, _ := GetStringWithDistance(1, ids, id)

		if str1 != "" && str2 != "" {
			return GetCommonLetters(str1, str2)
		}
	}
	return []string{}
}

func GetCommonLetters(str1 string, str2 string) []string {
	commonString := []string{}

	for _, i := range str1 {
		if strings.Contains(str2, string(i)) {
			commonString = append(commonString, string(i))
		}
	}
	return commonString
}
func GetStringWithDistance(distance int, stringPool []string, baseString string) (string, string, error) {
	for _, currentString := range stringPool {
		computedDistance, _ := StringDistance(currentString, baseString, distance)
		if computedDistance == 1 {
			return baseString, currentString, nil
		}
	}
	return "", "", errors.New("No with valid distance found")
}

func StringDistance(str1 string, str2 string, maxDistance int) (int, error) {
	diff := 0
	for i := 0; i < len(str1); i++ {
		if str1[i] != str2[i] {
			diff++
			if diff > maxDistance {
				return 0, errors.New("Max distance exceeded")
			}
		}
	}
	return diff, nil
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
