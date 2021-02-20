/*
    bftranspile
*/

// stds should define o(charcode) and i(). o(charcode) should output the character specified by charcode and i should return the charcode of a user inputted character.
function transpiler(program, stds = "") {
    let transpiled = `${stds}let m=new Int8Array(1048576);let p=0;`
    for (let i = 0; i < program.length; i++) {
        switch(program[i]) {
            case ".": transpiled += `o(m[p]);`; break;
            case ",": transpiled += `m[p]=i();`; break;
            case "+": transpiled += `m[p]++;`; break;
            case "-": transpiled += `m[p]--;`; break;
            case ">": transpiled += `p++;`; break;
            case "<": transpiled += `p--;`; break;
            case "[": transpiled += `while(m[p]){`; break;
            case "]": transpiled += `}`; break;
        }
    }
    return transpiled;
}

function transpilerDebug(program, stds = "") {
    let transpiled = `${stds}\nlet m=new Int8Array(1048576);\nlet p=0;`
    for (let i = 0; i < program.length; i++) {
        switch(program[i]) {
            case ".": transpiled += `o(m[p]);\n`; break;
            case ",": transpiled += `m[p]=i();\n`; break;
            case "+": transpiled += `m[p]++;\n`; break;
            case "-": transpiled += `m[p]--;\n`; break;
            case ">": transpiled += `p++;\n`; break;
            case "<": transpiled += `p--;\n`; break;
            case "[": transpiled += `while(m[p]){\n`; break;
            case "]": transpiled += `}\n`; break;
        }
    }
    return transpiled;
}

const mExports = { transpiler, transpilerDebug };

if (typeof module === "object" && typeof module.exports === "object" && !global.document) {
    module.exports = mExports;
}
else {
    window.bftranspile = mExports;
}