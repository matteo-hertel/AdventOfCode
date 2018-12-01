package main

import (
	"testing"
)

func TestClycleOfSlice(t *testing.T) {
	input := []int{1, 1, 3, 4, -1, -10, 5, 1, 4, -2}
	cycle := DetectCyleFrequency(&input, 10)
	if cycle != 8 {
		t.Error("Expect cycled frequency to be 8 but got", cycle)
	}
}

func TestSumOfslice(t *testing.T) {
	input := []int{1, -1, 3, 50, -11}
	sum := SumFrequencies(&input)
	if sum != 42 {
		t.Error("Expect sum  to be 42 but got", sum)
	}
}
