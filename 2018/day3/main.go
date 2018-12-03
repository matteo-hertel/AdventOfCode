package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
)

type coord struct{ x, y int }

type claim struct {
	n    int
	l, r int
	w, h int
}

func mapping(c []claim) (res map[coord][]int) {
	res = make(map[coord][]int)
	for _, v := range c {
		for x := v.l; x < v.l+v.w; x++ {
			for y := v.r; y < v.r+v.h; y++ {
				res[coord{x, y}] = append(res[coord{x, y}], v.n)
			}
		}
	}

	return
}

func getOverlappingNumber(c []claim) (res int) {
	m := mapping(c)
	for _, v := range m {
		if len(v) > 1 {
			res++
		}
	}

	return
}

func getNonOverlappingClaim(c []claim) (res int) {
	m := mapping(c)

outer:
	for _, v := range c {
		for x := v.l; x < v.l+v.w; x++ {
			for y := v.r; y < v.r+v.h; y++ {
				if len(m[coord{x, y}]) > 1 {
					continue outer
				}
			}
		}

		return v.n
	}

	return
}

func build(s string) (res claim) {
	num, err := fmt.Sscanf(s, "#%d @ %d,%d: %dx%d",
		&res.n, &res.l, &res.r, &res.w, &res.h)
	if err != nil {
		log.Fatal(err)
	}
	if num != 5 {
		log.Fatalf("invalid line actual %d expect 5", num)
	}

	return
}

func in(r io.Reader) (res []claim) {
	scanner := bufio.NewScanner(r)
	for scanner.Scan() {
		res = append(res, build(scanner.Text()))
	}

	return
}

func main() {
	c := in(os.Stdin)
	fmt.Printf("Overlapping: %d	\n", getOverlappingNumber(c))
	fmt.Printf("Not Overlapping Id: %d \n", getNonOverlappingClaim(c))
}
