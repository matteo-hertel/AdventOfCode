package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type node struct {
	header   nodeHeader
	children []node
	metadata []int
	value    int
}

type nodeHeader struct {
	childNodes      int
	metadataEntries int
}

var curPos = 2
var part1sum = 0
var input = []int{}

func main() {
	stringInput, err := getInput()

	if err != nil {
		log.Fatal(err)
	}

	in := strings.Split(stringInput, " ")
	for _, i := range in {
		n, _ := strconv.ParseInt(i, 10, 32)
		input = append(input, int(n))
	}

	metadataEntries, rootNode := solutions()
	fmt.Println("Sum of the metadata entries: ", metadataEntries)
	fmt.Println("Root node:", rootNode)
}

func solutions() (int, int) {
	n := getNodeValues(getNode(node{
		header: nodeHeader{
			childNodes:      input[0],
			metadataEntries: input[1],
		}}))

	return part1sum, n.value
}

func getNode(n node) node {

	for x := 0; x < n.header.childNodes; x++ {

		newNode := node{}
		newNode.header.childNodes = input[curPos]
		curPos++
		newNode.header.metadataEntries = input[curPos]
		curPos++

		n.children = append(n.children, getNode(newNode))
	}

	for x := 0; x < n.header.metadataEntries; x++ {
		md := input[curPos]
		n.metadata = append(n.metadata, md)
		part1sum += md
		if n.header.childNodes == 0 {
			n.value += md
		}
		curPos++
	}

	return n
}

func getNodeValues(n node) node {
	for k, v := range n.children {
		n.children[k] = getNodeValues(v)
	}

	for x := 0; x < len(n.metadata); x++ {
		id := n.metadata[x] - 1
		if len(n.children) > id {
			n.value += n.children[id].value
		}
	}

	return n
}

func getInput() (string, error) {
	scanner := bufio.NewScanner(os.Stdin)
	var data string

	for scanner.Scan() {
		data = scanner.Text()
	}

	if err := scanner.Err(); err != nil {
		return "", err
	}
	return data, nil
}
