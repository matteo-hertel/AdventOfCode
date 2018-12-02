package main

import (
	"testing"
)

var input = []string{
	"abcdef",
	"bababc",
	"abbcde",
	"abcccd",
	"aabcdd",
	"abcdee",
	"ababab",
}

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
	checksum := CalculateChecksum(input)
	if checksum != 12 {
		t.Error("Expect checksum to be 12, but got", checksum)
	}
}

func TestGetCommonLetters(t *testing.T) {
	str1 := "abcde"
	str2 := "abcdl"
	commonLetters := GetCommonLetters(str1, str2)

	if len(commonLetters) != 4 {
		t.Error("Expect 4 common letters, but got", len(commonLetters))
	}
}

func TestStringDistance(t *testing.T) {
	distance, err := StringDistance("abcde", "abcdl", 1)
	if distance != 1 {
		t.Error("Expect distance to be 1, but got", distance)
	}
	if err != nil {
		t.Error("expect err to be nil but got", err)
	}
}

func TestProcessIds(t *testing.T) {
	commonLetters := ProcessIds(input)
	if len(commonLetters) != 5 {
		t.Error("Expect 5 common letters, but got", len(commonLetters))
	}
}

func TestGetStringWithDistance(t *testing.T) {
	string1, string2, err := GetStringWithDistance(1, input, "abcdel")

	if string1 != "abcdel" {
		t.Error("Expect string1 to be the passed string but got", string1)
	}
	if string2 != input[0] {
		t.Error("Expect string2 to be input[0] string but got", string2)
	}
	if err != nil {
		t.Error("Expect err to be nil but got", err)
	}
}
