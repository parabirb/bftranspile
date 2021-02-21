/*
    bftranspile
*/

// regex for matching octane
const octaneRegex = /\[\+\]\[OCTANE (?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)? OCTANE\]$/;

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
/*
    transpilerOctane:
    put your bf on steroids
    octane pre-computes the output of the brainfuck
    and transpiles to just the output.
    optane can also skip the transpiling process entirely as follows:
    if a comment is in the format of:
    [+][OCTANE [base64] OCTANE]
    then it will skip most of the transpiling process and just set it to
    o(atob(base64));
    also, you must pass r(a) into stds for optane.
    r(a) should write a to the interface.
 */
function transpilerOctane(program, stds = "", infinite = false) {
    let transpiled = `${stds}`;
    // we can't pre-evaluate code with , or infinite loops
    if (program.includes(",") || (infinite && !octaneRegex.test(program))) return { program, transpiled: transpiler(program, stds) };
    // if we detect an octane string
    else if (octaneRegex.test(program)) {
        // if we are in a browser environment
        if (typeof atob === "function") {
            transpiled += `r(${JSON.stringify(atob(octaneRegex.exec(program)[0].replace("[+][OCTANE ", "").replace(" OCTANE]", "")))});`;
        }
        // if we are in node
        else if (typeof Buffer.from === "function") {
            transpiled += `r(${JSON.stringify(Buffer.from(octaneRegex.exec(program)[0].replace("[+][OCTANE ", "").replace(" OCTANE]", ""), "base64").toString())});`;
        }
        // if we can't detect the base64 function
        else {
            throw new Error("Could not detect valid base64 parser!");
        }
        return {
            program,
            transpiled
        }
    }
    // if no octane string is detected
    else {
        // set it up to push output to our output string
        let out = "";
        const o = (i) => out += String.fromCharCode(i);
        eval(transpiler(program));
        // if we are in a browser environment
        if (typeof btoa === "function")
            return {
                program: `${program}[+][OCTANE ${btoa(out)} OCTANE]`,
                transpiled: `${stds}r(${JSON.stringify(out)});`
            };
        // if we are in node
        else if (typeof Buffer.from === "function")
            return {
                program: `${program}[+][OCTANE ${Buffer.from(out).toString("base64")} OCTANE]`,
                transpiled: `${stds}r(${JSON.stringify(out)});`
            };
        // if we can't detect any base64 encoder
        else
            return {
                program,
                transpiled: `${stds}r(${JSON.stringify(out)});`
            };
    }
}

const mExports = { transpiler, transpilerOctane };

// if we're in CJS
if (typeof module === "object" && typeof module.exports === "object" && !global.document) {
    module.exports = mExports;
}
// if we're in browser
else {
    window.bftranspile = mExports;
}