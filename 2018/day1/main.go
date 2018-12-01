package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var frequencies []int

	for scanner.Scan() {
		i, _ := strconv.Atoi(scanner.Text())
		frequencies = append(frequencies, i)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Final sum", SumFrequencies(&frequencies))
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
