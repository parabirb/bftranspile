/*
    bftranspile
*/

// stds should define o(charcode) and i(). o(charcode) should output the character specified by charcode and i should return the charcode of a user inputted character.
function transpiler(program, stds = "") {
    let transpiled = `${stds}let m=new Int8Array(1048576);let p=0;`;
    let optimizing = false;
    let type = "";
    let stored = 0;
    for (let i = 0; i < program.length; i++) {
        switch(program[i]) {
            case ".": {
                if (optimizing && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `${type}${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `${type}${stored > 0 ? "++;" : "--;"}`;
                    optimizing = false;
                    stored = 0;
                    type = "";
                }
                transpiled += `o(m[p]);`;
                break;
            }
            case ",": {
                if (optimizing && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `${type}${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `${type}${stored > 0 ? "++;" : "--;"}`;
                    optimizing = false;
                    stored = 0;
                    type = "";
                }
                transpiled += `m[p]=i();`;
                break;
            }
            case "+": {
                if (optimizing && type === "p" && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `p${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `p${stored > 0 ? "++;" : "--;"}`;
                    stored = 0;
                    type = "m[p]";
                }
                else if (!optimizing) {
                    optimizing = true;
                    type = "m[p]";
                }
                stored++;
                break;
            }
            case "-": {
                if (optimizing && type === "p" && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `p${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `p${stored > 0 ? "++;" : "--;"}`;
                    stored = 0;
                    type = "m[p]";
                }
                else if (!optimizing) {
                    optimizing = true;
                    type = "m[p]";
                }
                stored--;
                break;
            }
            case ">": {
                if (optimizing && type === "m[p]" && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `m[p]${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `m[p]${stored > 0 ? "++;" : "--;"}`;
                    stored = 0;
                    type = "p";
                }
                else if (!optimizing) {
                    optimizing = true;
                    type = "p";
                }
                stored++;
                break;
            }
            case "<": {
                if (optimizing && type === "m[p]" && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `m[p]${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `m[p]${stored > 0 ? "++;" : "--;"}`;
                    stored = 0;
                    type = "p";
                }
                else if (!optimizing) {
                    optimizing = true;
                    type = "p";
                }
                stored--;
                break;
            }
            case "[": {
                if (optimizing && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `${type}${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `${type}${stored > 0 ? "++;" : "--;"}`;
                    optimizing = false;
                    stored = 0;
                    type = "";
                }
                transpiled += `while(m[p]){`;
                break;
            }
            case "]": {
                if (optimizing && !!stored) {
                    transpiled += Math.abs(stored) !== 1 ? `${type}${stored > 0 ? "+" : "-"}=${Math.abs(stored)};` : `${type}${stored > 0 ? "++;" : "--;"}`;
                    optimizing = false;
                    stored = 0;
                    type = "";
                }
                transpiled += `}`;
                break;
            }
        }
    }
    return transpiled;
}

// transpilerDebug will remain naive. not maintaining.
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