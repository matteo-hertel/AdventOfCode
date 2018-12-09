package main

import (
	"testing"
)

func TestLazy(t *testing.T) {
	lazy := true
	if lazy == false {
		t.Error("If you're not lazy, add your tests in")
	}
}
