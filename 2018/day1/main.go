package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	frequencies, err := getInput()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Final sum: ", SumFrequencies(&frequencies))
	fmt.Println("First cycle:", DetectCyleFrequency(&frequencies, 136))
}

func DetectCyleFrequency(frequencies *[]int, repeatCycle int) int {

	sum := 0
	memo := map[string]bool{strconv.Itoa(sum): true}

	for i := 0; i < repeatCycle; i++ {

		for _, frequency := range *frequencies {
			newFrequency := sum + frequency
			sum = newFrequency
			key := strconv.Itoa(newFrequency)

			if _, ok := memo[key]; ok {
				return newFrequency
			} else {
				memo[key] = true
			}

		}
	}
	fmt.Println("No Cycle Detected")
	return 0
}

func SumFrequencies(frequencies *[]int) int {
	sum := 0

	for _, frequency := range *frequencies {
		sum += frequency
	}
	return sum
}

func debugFrequencies(frequencies *[]int) {
	for _, frequency := range *frequencies {
		fmt.Printf("Value: %v\n", frequency)
		fmt.Printf("Type: %T\n", &frequency)
		fmt.Printf("Addr: %p\n", &frequency)
		fmt.Println("")
	}
}

func getInput() ([]int, error) {

	scanner := bufio.NewScanner(os.Stdin)
	var frequencies []int

	for scanner.Scan() {
		i, _ := strconv.Atoi(scanner.Text())
		frequencies = append(frequencies, i)
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return frequencies, nil

}
