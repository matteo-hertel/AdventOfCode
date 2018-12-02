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
	getCommonLetters := getCommonLettersInPool(ids)
	fmt.Println(getCommonLetters)
	//checksum := CalculateChecksum(ids)
	//fmt.Println("Checksum: ", checksum)
}
func getCommonLettersInPool(pool []string) []string {
	for _, i := range pool {
		str1, str2, _ := getStringWith1Distance(pool, i)
		if str1 != "" && str2 != "" {
			fmt.Println(str1, str2)
			return getCommonLetters(str1, str2)
		}
	}
	return []string{}
}
func getCommonLetters(str1 string, str2 string) []string {
	commonString := []string{}

	for _, i := range str1 {
		if strings.Contains(str2, string(i)) {
			commonString = append(commonString, string(i))
		}
	}
	return commonString
}
func getStringWith1Distance(stringPool []string, str string) (string, string, error) {
	for _, i := range stringPool {
		res, _ := StringDistance(i, str, 1)
		if res == 1 {
			return str, i, nil
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
