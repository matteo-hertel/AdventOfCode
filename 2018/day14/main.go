package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	getRecipes(Str2Int(lines[0]))
	part2()
}
func getRecipes(iterations int) {
	recipies := []int{3, 7}

	elf1 := 0
	elf2 := 1

	for i := 0; i < iterations+10; i++ {
		newRecipies := recipies[elf1] + recipies[elf2]
		temp := strconv.Itoa(newRecipies)
		for _, v := range temp {
			recipies = append(recipies, int(v-48))
		}

		elf1 = (elf1 + 1 + recipies[elf1]) % len(recipies)
		elf2 = (elf2 + 1 + recipies[elf2]) % len(recipies)

		//fmt.Println(recipies)
		//fmt.Println("elf1", elf1, recipies[elf1])
		//fmt.Println("elf2", elf2, recipies[elf2])
	}

	fmt.Println(recipies[iterations : iterations+10])

}
func part2() {
	recipies := []int{3, 7}
	SEQUENCE := []int{5, 0, 9, 6, 7, 1}

	elf1 := 0
	elf2 := 1
	foundSequence := false
	for !foundSequence {
		newRecipies := recipies[elf1] + recipies[elf2]
		temp := strconv.Itoa(newRecipies)
		for _, v := range temp {
			recipies = append(recipies, int(v-48))
		}

		elf1 = (elf1 + 1 + recipies[elf1]) % len(recipies)
		elf2 = (elf2 + 1 + recipies[elf2]) % len(recipies)

		if len(recipies)-len(SEQUENCE) > 0 {
			if testEq(recipies[len(recipies)-len(SEQUENCE):], SEQUENCE) {
				fmt.Println(len(recipies) - len(SEQUENCE))
				foundSequence = true
			} else if testEq(recipies[len(recipies)-len(SEQUENCE)-1:len(recipies)-1], SEQUENCE) {
				fmt.Println(len(recipies) - len(SEQUENCE) - 1)
				foundSequence = true
			}
		}
	}
}

func testEq(a, b []int) bool {

	if (a == nil) != (b == nil) {
		return false
	}

	if len(a) != len(b) {
		return false
	}

	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}

	return true
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
