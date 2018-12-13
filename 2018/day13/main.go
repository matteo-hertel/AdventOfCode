package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

type Cart struct {
	x    int
	y    int
	dir  rune
	turn int
}

func main() {

	lines, err := getInput()

	if err != nil {
		log.Fatal(err)
	}

	track := make([][]rune, 0)

	carts := make([]Cart, 0)

	for i, line := range lines {
		track = append(track, make([]rune, 0))
		for j, s := range line {
			switch s {
			case '>':
				track[i] = append(track[i], '-')
				cart := Cart{x: j, y: i, dir: '>'}
				carts = append(carts, cart)
				break
			case '<':
				track[i] = append(track[i], '-')
				cart := Cart{x: j, y: i, dir: '<'}
				carts = append(carts, cart)
				break
			case '^':
				track[i] = append(track[i], '|')
				cart := Cart{x: j, y: i, dir: '^'}
				carts = append(carts, cart)
				break
			case 'v':
				track[i] = append(track[i], '|')
				cart := Cart{x: j, y: i, dir: 'v'}
				carts = append(carts, cart)
				break
			default:
				track[i] = append(track[i], s)
				break
			}
		}
	}

	//loop to crash
	collision := false
	for !collision {
		//update carts
		//fmt.Println(i,carts)
		//printTrack(track,carts)
		for i := 0; i < len(carts); i++ {
			switch carts[i].dir {
			case '>':
				carts[i] = MovingRight(track, carts[i])
				break
			case '<':
				carts[i] = MovingLeft(track, carts[i])
				break
			case '^':
				carts[i] = MovingUp(track, carts[i])
				break
			case 'v':
				carts[i] = MovingDown(track, carts[i])
				break
			default:
				fmt.Println("error not valid cart")
				break
			}
		}

		//check collisions
		for i, cart := range carts {
			for j := i + 1; j < len(carts); j++ {
				if cart.x == carts[j].x && cart.y == carts[j].y {
					collision = true
					fmt.Println("Collision at :", cart.x, cart.y)
				}
			}
		}
	}
}

func printTrack(track [][]rune, carts []Cart) {
	h := make([][]rune, 0)

	for i, _ := range track {
		h = append(h, make([]rune, len(track[i])))
		copy(h[i], track[i])
	}

	for _, cart := range carts {
		h[cart.y][cart.x] = cart.dir
	}

	for _, row := range h {
		for _, s := range row {
			fmt.Print(string(s))
		}
		fmt.Println()
	}
}

func MovingDown(track [][]rune, cart Cart) Cart {
	switch track[cart.y+1][cart.x] {
	case '/':
		cart.dir = '<'
		break
	case '\\':
		cart.dir = '>'
		break
	case '+':
		if cart.turn == 0 {
			//left
			cart.dir = '>'
			cart.turn = 1
		} else if cart.turn == 1 {
			//straight
			cart.turn = 2
		} else if cart.turn == 2 {
			//right
			cart.dir = '<'
			cart.turn = 0
		}
		break
	case '|':
		break
	default:
		fmt.Println("Error on track cart can't move :", cart.x, cart.y-1, track[cart.y-1][cart.x])
	}
	cart.y = cart.y + 1
	return cart
}

func MovingUp(track [][]rune, cart Cart) Cart {
	switch track[cart.y-1][cart.x] {
	case '/':
		cart.dir = '>'
		break
	case '\\':
		cart.dir = '<'
		break
	case '+':
		if cart.turn == 0 {
			//left
			cart.dir = '<'
			cart.turn = 1
		} else if cart.turn == 1 {
			//straight
			cart.turn = 2
		} else if cart.turn == 2 {
			//right
			cart.dir = '>'
			cart.turn = 0
		}
		break
	case '|':
		break
	default:
		fmt.Println("Error on track cart can't move :", cart.x, cart.y-1, track[cart.y-1][cart.x])
	}
	cart.y = cart.y - 1
	return cart
}

func MovingLeft(track [][]rune, cart Cart) Cart {
	switch track[cart.y][cart.x-1] {
	case '/':
		cart.dir = 'v'
		break
	case '\\':
		cart.dir = '^'
		break
	case '+':
		if cart.turn == 0 {
			//left
			cart.dir = 'v'
			cart.turn = 1
		} else if cart.turn == 1 {
			//straight
			cart.turn = 2
		} else if cart.turn == 2 {
			//right
			cart.dir = '^'
			cart.turn = 0
		}
		break
	case '-':
		break
	default:
		fmt.Println("Error on track cart can't move :", cart.x-1, cart.y, track[cart.y][cart.x-1])
	}
	cart.x = cart.x - 1
	return cart
}

func MovingRight(track [][]rune, cart Cart) Cart {
	switch track[cart.y][cart.x+1] {
	case '\\':
		cart.dir = 'v'
		break
	case '/':
		cart.dir = '^'
		break
	case '+':
		if cart.turn == 0 {
			//left
			cart.dir = '^'
			cart.turn = 1
		} else if cart.turn == 1 {
			//straight
			cart.turn = 2
		} else if cart.turn == 2 {
			//right
			cart.dir = 'v'
			cart.turn = 0
		}
		break
	case '-':
		break
	default:
		fmt.Println("Error on track cart can't move :", cart.x+1, cart.y, track[cart.y][cart.x+1])
	}
	cart.x = cart.x + 1
	return cart
}

func Str2Int(str string) int {
	i, err := strconv.Atoi(str)
	if err != nil {
		log.Fatal(err)
	}
	return i
}
func RegSplit(text string, delimeter string) []string {
	reg := regexp.MustCompile(delimeter)
	indexes := reg.FindAllStringIndex(text, -1)
	laststart := 0
	result := make([]string, len(indexes)+1)
	for i, element := range indexes {
		result[i] = text[laststart:element[0]]
		laststart = element[1]
	}
	result[len(indexes)] = text[laststart:len(text)]
	return result
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
