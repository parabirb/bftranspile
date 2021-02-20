const { performance } = require("perf_hooks");
const { transpiler } = require("./libtrans");
const turingext = require("./bflib");
const prog = `[sierpinski.b -- display Sierpinski triangle
(c) 2016 Daniel B. Cristofani
http://brainfuck.org/]

++++++++[>+>++++<<-]>++>>+<[-[>>+<<-]+>>]>+[
    -<<<[
        ->[+[-]+>++>>>-<<]<[<]>>++++++[<<+++++>>-]+<<++.[-]<<
    ]>.>+[>>]>+
]

[Shows an ASCII representation of the Sierpinski triangle
(iteration 5).]`;
const stds = `let o=(c)=>process.stdout.write(String.fromCharCode(c));`;
const stdout = (c)=>process.stdout.write(c);

console.log("Beginning transpiled test...");
let transpiledStart = performance.now();
const transpiled = transpiler(prog, stds);
eval(transpiled);
let transpiledEnd = performance.now();
console.log("Beginning native test...");
let bfStart = performance.now();
const bf = new turingext(prog, stdout, () => {});
bf.run();
let bfEnd = performance.now();

const transpiledDur = transpiledEnd - transpiledStart;
const bfDur = bfEnd - bfStart;
const nativeFaster = transpiledDur > bfDur;
console.log(`The ${nativeFaster ? "native" : "transpiled"} version was faster by ${nativeFaster ? Math.floor((transpiledDur - bfDur) * 100) / 100 : Math.floor((bfDur - transpiledDur) * 100) / 100}ms.`);