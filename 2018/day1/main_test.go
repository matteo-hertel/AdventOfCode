package main

import (
	"testing"
)

func TestSumOfslice(t *testing.T) {
	input := []int{1, -1, 3, 50, -11}
	sum := SumFrequencies(&input)
	if sum != 42 {
		t.Error("Expect sum  to be 42 but got", sum)
	}
}
