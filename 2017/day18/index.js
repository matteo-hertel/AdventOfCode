function send(arr, x) {
    return arr[x];
}

function set(arr, x, y, raw) {
    y = wrapStupidDecision(arr, x, y, raw);
    arr[x] = y;
    return arr;
}

function wrapStupidDecision(arr, x, y, raw) {
    if (isNaN(y)) {
        let idx = raw.charCodeAt() - 97;
        if (arr[idx] === undefined) {
            arr[idx] = 0
        }
        y = arr[idx]
    }
    return y;

}

function add(arr, x, y, raw) {
    y = wrapStupidDecision(arr, x, y, raw);
    arr[x] += y;
    return arr;
}

function multiply(arr, x, y, raw) {
    y = wrapStupidDecision(arr, x, y, raw);
    arr[x] *= y;
    return arr;
}

function modulo(arr, x, y, raw) {
    y = wrapStupidDecision(arr, x, y, raw);
    arr[x] %= y;
    return arr;
}

function jump(arr, x, i, n) {
    if (!arr[x]) return i;
    return i + n - 1;
}
let commands = getInput(0)
    .trim()
    .split("\n")
    .map(i => i.trim());

const operationHandlers = {
    set,
    add,
    mul: multiply,
    mod: modulo,

};

const soundHandlers = {
    snd: send,
}

const moveHandlers = {
    jgz: jump
}
let last = 0;
let registry = [];
for (let i = 0; i < commands.length; i++) {
    let item = commands[i];

    let [instruction, x, y] = item.split(" ");
    let idx = x.charCodeAt() - 97;

    if (registry[idx] === undefined) {
        registry[idx] = 0;
    }
    if (operationHandlers[instruction]) {
        registry = operationHandlers[instruction](registry, idx, parseInt(y), y);
        continue;
    }
    if (soundHandlers[instruction]) {
        last = soundHandlers[instruction](registry, idx, last);
        continue;
    }
    if (moveHandlers[instruction]) {
        i = moveHandlers[instruction](registry, idx, i, parseInt(y));
        continue;
    }
    if (instruction === "rcv" && registry[idx]) {
        console.log(last);
        break;
    }
}

function getInput(debug) {
    if (debug) {
        return `set a 1
add a 2
mul a 3
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
    }
    return `
	set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 952
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19
	`;
}
