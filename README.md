# bftranspile
a transpiler from BF to JS (both browser and Node are supported).

## todo
optimization. things like `>>>>` convert to `ptr++;ptr++;ptr++;ptr++` instead of `ptr+=4`.

## installation
git clone this repo, then `npm i`. you can now run `index.js`. you can also optionally compile this with something like `pkg`.

## usage
just run `index.js`.

## tests
run `speedtest.js` for a speedtest compared to an interpreter i wrote.

## accessing the transpiler directly
do something like:
```javascript
const { transpiler } = require("./libtrans"); // or transpilerDebug
const program = transpiler("Your code",
    "const i=()=>{/*todo*/};const o=(a)=>process.stdout.write(String.fromCharCode(a);");
// program will have the transpiled program.
/*
    first arg is the brainfuck program. second arg should have:
    1. a definition of i(). i() is the equivalent of C's getchar(). it should
    return the character code of a character the user inputs.
    2. a definition of o(code). o(code) is the equivalent of C''s printf(). it should
    print the character specified by the character code.
    
    if you will be including i() and o(code) in the environment the transpiled
    code is running in, you can omit them.
*/
```
note that you can use the transpiler in the browser too! it sets `window.bftranspiler`.