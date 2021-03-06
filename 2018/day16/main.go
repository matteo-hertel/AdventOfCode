package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(lines)
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
