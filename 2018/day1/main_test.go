package main

import "testing"

func TestGreetings(t *testing.T) {
	greeting := Greetings()
	if greeting != "vim-go" {
		t.Error("Expect Greetings to be 'vim-go' but got", greeting)
	}
}
