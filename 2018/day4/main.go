package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

func main() {
	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}

	var re = regexp.MustCompile(`.(.*)(]\s)(.[a-zA-Z]*)(..)(.*)`)
	sort.Strings(lines)
	currentGuard := 0
	guardSleepTimes := make([][]int, 4000)
	for i := 0; i < 4000; i++ {
		guardSleepTimes[i] = make([]int, 61)
	}

	sleepTimer := 0
	for _, line := range lines {
		eventLog := re.FindAllStringSubmatch(line, -1)
		minuteSplit := strings.Split(eventLog[0][1], ":")
		minutes, _ := strconv.Atoi(minuteSplit[1])
		logType := eventLog[0][3]
		if logType == "Guard" {
			s := strings.Split(eventLog[0][5], " ")
			currentGuard, err = strconv.Atoi(s[0])
			if err != nil {
				fmt.Println(err)
			}
		}
		if logType == "falls" {
			sleepTimer = minutes
		}

		if logType == "wakes" {
			for i := sleepTimer; i < minutes; i++ {
				guardSleepTimes[currentGuard][i]++
				guardSleepTimes[currentGuard][60]++
			}
			sleepTimer = 0

		}

	}

	sleepiestGuard := 0
	sleepiestMinute := 0
	sleepBuf := 0
	sleepiestGuardMin := 0
	for guard, sleepTime := range guardSleepTimes {

		if sleepTime[60] == 0 {
			continue
		}
		if sleepTime[60] >= guardSleepTimes[sleepiestGuard][60] {
			sleepiestGuard = guard

		}
		for minute, sleepMin := range sleepTime {
			if sleepMin > sleepBuf && minute != 60 {
				sleepiestMinute = minute
				sleepBuf = sleepMin
				sleepiestGuardMin = guard
			}
		}
	}

	sleepiestHour := 0
	sleepBuf = 0
	for hour, sleepTime := range guardSleepTimes[sleepiestGuard] {
		if sleepTime > sleepBuf && hour != 60 {
			sleepiestHour = hour
			sleepBuf = sleepTime
		}
	}
	fmt.Println("Sleepiest Guard:", sleepiestGuard)
	fmt.Println("Sleepiest hour:", sleepiestHour)
	fmt.Println("Sleepiesst Guard Id", sleepiestGuard*sleepiestHour)
	fmt.Println("Sleepiest Guard Id (min):", sleepiestGuardMin*sleepiestMinute)
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
