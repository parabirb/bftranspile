# bftranspile
a transpiler from BF to JS (both browser and Node are supported). bftranspile can show notable improvements over naive** interpreters written in JS (the longer your program runs, the more improvement you see). `speedtest.js` demonstrates this. the transpiler also complies with [the epistle to the implementors](http://brainfuck.org/epistle.html).*

\* when using the transpiler, it does not due to input handling. however, the transpiler library may comply with the epistle if you define stds properly. demo.html is compliant with the epistle.

** naive interpreters are very common, however not all interpreters are unoptimized.

## todo
further optimization. while the transpiler is quite optimized, further optimization is possible.

## installation
git clone this repo, then `npm i`. you can now run `index.js`. you can also optionally compile this with something like `pkg`.

## usage
just run `index.js`.

## tests
run `speedtest.js` for a speedtest compared to an interpreter i wrote.

## accessing the transpiler directly
do something like:
```javascript
const { transpilerOctane } = require("./libtrans"); // you can also use transpiler.
const { program, transpiled } = transpilerOctane("Your code",
    `const i=()=>{/*todo*/};const o=(a)=>process.stdout.write(String.fromCharCode(a);
    const r=(a)=>console.log(a)`, false); // note: the false at the end is for if
                                          // the code has an infinite loop.
// taranspiled will have the transpiled program. program is the program rewritten with
// optimizations.
/*
    first arg is the brainfuck program. second arg should have:
    1. a definition of i(). i() is the equivalent of C's getchar(). it should
    return the character code of a character the user inputs.
    2. a definition of o(code). o(code) is the equivalent of C's printf(). it should
    print the character specified by the character code.
    
    if you will be including i() and o(code) in the environment the transpiled
    code is running in, you can omit them.
    
    note: if using transpilerOctane, you should include r(a) which should be
    equivalent to process.stdout.write(a) or console.log(a).
*/
```
note that you can use the transpiler in the browser too! it sets `window.bftranspiler`. an example is located at `demo.html`, which contains a fully functional brainfuck transpiler in the browser.

# for brainfuck programmers
### this section is dedicated to people writing brainfuck for bftranspile.
## environment
bftranspile allocates each program 1 mebibyte of memory (or 1048576 bytes). data is stored as a signed integer (two's complement). the pointer begins at 0.
### demo specific
EOF is 0.
## overflows
attempts to move the pointer below 0 or above 1048575 will result in the following behavior:
* attempts to write to data at that pointer will fail
* `[]` loops will not work (code in that loop will be skipped)

attempts to move the data at the pointer above 127 or below -128 will result in an integer overflow.
## octane
octane is a transpiler feature designed to speed up transpiling. it pre-runs eligible programs, making the output `console.log(Your code's output)` or similar. it also appends a string `[+][OCTANE (Base64 output of your program) OCTANE]` to the program. if a string of the format `[+][OCTANE (Base64) OCTANE]` is detected at the end of the program being transpiled, it sets the transpiled output to `console.log(atob(Base64))` or similar. this has the pro of speeding up eligible programs (programs with octane strings OR programs without infinite loops which also do not take user input).

for programs eligible for optimization but not already optimized, octane adds some transpilation overhead (but the transpiler output is super fast).

octane may add extremely negligible overhead for programs not eligible for optimization.

you can test if you are on an octane transpiler by running `tests/octane.b`.