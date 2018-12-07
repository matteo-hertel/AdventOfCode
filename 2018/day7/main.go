package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
)

type runes []rune

func (s runes) Len() int {
	return len(s)
}

func (s runes) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s runes) Less(i, j int) bool {
	return s[i] < s[j]
}

func main() {

	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Get Sequence ", getSequence(lines))
	fmt.Println("Time: ", getTime(lines))
}

func getSequence(lines []string) string {

	instructions := make(map[rune][]rune)
	parents := make(map[rune]int)

	for _, k := range lines {
		key := rune(k[5])
		value := rune(k[36])
		instructions[key] = append(instructions[key], value)
		parents[value] = parents[value] + 1
	}

	done := make([]rune, 0)
	for k, _ := range instructions {
		if parents[k] == 0 {
			done = append(done, k)
		}
	}

	answer := ""
	for len(done) > 0 {
		temp := make([]rune, len(done))
		copy(temp, done)
		sort.Sort(runes(temp))
		x := temp[0]
		for i := 0; i < len(done); i++ {
			if done[i] == x {
				done = append(done[:i], done[i+1:]...)
			}
		}
		answer = answer + string(x)
		for _, v := range instructions[x] {
			parents[v] = parents[v] - 1
			if parents[v] == 0 {
				done = append(done, v)
			}
		}
	}

	return answer

}

func getTime(lines []string) int {

	instructions := make(map[rune][]rune)
	parents := make(map[rune]int)

	for _, k := range lines {
		key := rune(k[5])
		value := rune(k[36])
		instructions[key] = append(instructions[key], value)
		parents[value] = parents[value] + 1
	}

	readyTasks := make([]rune, 0)
	for k, _ := range instructions {
		if parents[k] == 0 {
			readyTasks = append(readyTasks, k)
		}
	}

	finishedTasks := make([]rune, 0)
	workersTasks := []rune{'.', '.', '.', '.', '.'}
	workersTimeLeftOnTask := []int{0, 0, 0, 0, 0}
	//workersTasks := []rune{'.', '.'}
	//workersTimeLeftOnTask := []int{0, 0}
	t := 0
	working := 1
	for ; working > 0; t++ {
		working = 0

		for n, _ := range workersTimeLeftOnTask {
			//decrease time left
			if workersTimeLeftOnTask[n] != 0 {
				workersTimeLeftOnTask[n] = workersTimeLeftOnTask[n] - 1
				working = working + 1
			} else {
				//check if more work to do on task
				if workersTasks[n] != '.' {
					finishedTask := workersTasks[n]
					workersTasks[n] = '.'

					//check children
					for _, v := range instructions[finishedTask] {
						parents[v] = parents[v] - 1
						if parents[v] == 0 {
							readyTasks = append(readyTasks, v)
						}
					}
				}
			}
		}

		//try add new tasks to workersTimeLeftOnTask
		for len(readyTasks) > 0 && working < len(workersTimeLeftOnTask) {
			temp := make([]rune, len(readyTasks))
			copy(temp, readyTasks)
			sort.Sort(runes(temp))
			x := temp[0]
			for i := 0; i < len(readyTasks); i++ {
				if readyTasks[i] == x {
					readyTasks = append(readyTasks[:i], readyTasks[i+1:]...)
				}
			}
			finishedTasks = append(finishedTasks, x)
			for n, _ := range workersTimeLeftOnTask {
				if workersTasks[n] == '.' {
					workersTasks[n] = x
					workersTimeLeftOnTask[n] = int(x) - 5
					working = working + 1
					break
				}
			}
		}
	}

	return t - 1
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
