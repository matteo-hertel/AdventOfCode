package main

import (
	"bufio"
	"container/list"
	"fmt"
	"log"
	"os"
)

func main() {

	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	players, plays := getData(lines[0])
	fmt.Println("Highest Score: ", getHighScore(players, plays))
	fmt.Println("Highest Score 100x: ", getHighScore(players, plays*100))
}

func getHighScore(players int, totalPlays int) int {
	marbles := list.New()
	currentMarble := marbles.PushBack(0)

	score := make(map[int]int)

	for nextMarble := 1; nextMarble < totalPlays; nextMarble++ {
		if nextMarble%23 == 0 {
			rm := currentMarble
			for i := 0; i < 7; i++ {
				rm = rm.Prev()
				if rm == nil {
					rm = marbles.Back()
				}
			}

			currentPlayer := nextMarble % players
			score[currentPlayer] += nextMarble + rm.Value.(int)
			currentMarble = rm.Next()
			marbles.Remove(rm)
		} else {
			n := currentMarble.Next()
			if n == nil {
				n = marbles.Front()
			}
			currentMarble = marbles.InsertAfter(nextMarble, n)
		}
	}

	max := 0
	for _, s := range score {
		if s > max {
			max = s
		}
	}
	return max
}

func getData(line string) (int, int) {
	var players, plays int
	if _, err := fmt.Sscanf(line, "%d players; last marble is worth %d points", &players, &plays); err != nil {
		log.Fatal(err)
	}
	return players, plays

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
