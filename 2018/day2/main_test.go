package main

import (
	"testing"
)

func TestTokenisations(t *testing.T) {
	resultMap := map[string][]int{
		"abcdef": []int{0, 0},
		"bababc": []int{1, 1},
		"abbcde": []int{1, 0},
		"abcccd": []int{0, 1},
		"aabcdd": []int{1, 0},
		"abcdee": []int{1, 0},
		"ababab": []int{0, 1},
	}
	for test, result := range resultMap {
		test1, test2 := Tokenise(test)
		if test1 != result[0] {
			t.Error("For test: ", test, "Expect result1 to be", result[0], " but got", test1)
		}
		if test2 != result[1] {
			t.Error("For test: ", test, "Expect result1 to be", result[1], " but got", test2)
		}
	}
}
func TestCalculateChecksum(t *testing.T) {
	input := []string{
		"abcdef",
		"bababc",
		"abbcde",
		"abcccd",
		"aabcdd",
		"abcdee",
		"ababab",
	}
	checksum := CalculateChecksum(input)
	if checksum != 12 {
		t.Error("Expec checksum to be 12, but got", checksum)
	}
}
