function processTuringMachine(input) {

    let machine = new Array(input.checksum).fill(0);
    let position = Math.floor(machine.length / 2);
    let nextState = "A";
    for (let i = 0; i < input.checksum; i++) {
        let instruction = input.states[nextState](machine[position])
        nextState = instruction.next;
        machine[position] = instruction.value;
        position += instruction.move;
    }
    console.log({
        checksum: computeChecksum(machine)
    });
}

function computeChecksum(machine) {
    return machine.filter(i => !!i).length;
}

processTuringMachine(getInput(0));

function getInput(debug) {
    if (debug) {
        return {
            checksum: 6,
            states: {
                A: (value) => {
                    if (parseInt(value) === 0) {
                        return {
                            value: 1,
                            move: 1,
                            next: "B"
                        }
                    }
                    return {
                        value: 0,
                        move: -1,
                        next: "B"
                    }
                },
                B: (value) => {
                    if (parseInt(value) === 0) {
                        return {
                            value: 1,
                            move: -1,
                            next: "A"
                        }
                    }
                    return {
                        value: 1,
                        move: 1,
                        next: "A"
                    }
                }

            }
        }
    }
    return {
        checksum: 12629077,
        states: {
            A: (value) => {
                if (parseInt(value) === 0) {
                    return {
                        value: 1,
                        move: 1,
                        next: "B"
                    }
                }
                return {
                    value: 0,
                    move: -1,
                    next: "B"
                }
            },
            B: (value) => {
                if (parseInt(value) === 0) {
                    return {
                        value: 0,
                        move: 1,
                        next: "C"
                    }
                }
                return {
                    value: 1,
                    move: -1,
                    next: "B"
                }
            },
            C: (value) => {
                if (parseInt(value) === 0) {
                    return {
                        value: 1,
                        move: 1,
                        next: "D"
                    }
                }
                return {
                    value: 0,
                    move: -1,
                    next: "A"
                }
            },
            D: (value) => {
                if (parseInt(value) === 0) {
                    return {
                        value: 1,
                        move: -1,
                        next: "E"
                    }
                }
                return {
                    value: 1,
                    move: -1,
                    next: "F"
                }
            },
            E: (value) => {
                if (parseInt(value) === 0) {
                    return {
                        value: 1,
                        move: -1,
                        next: "A"
                    }
                }
                return {
                    value: 0,
                    move: -1,
                    next: "D"
                }
            },
            F: (value) => {
                if (parseInt(value) === 0) {
                    return {
                        value: 1,
                        move: 1,
                        next: "A"
                    }
                }
                return {
                    value: 1,
                    move: -1,
                    next: "E"
                }
            }


        }
    }
}
