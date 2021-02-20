const fs = require("fs");
const path = require("path");
const { transpiler } = require("./libtrans");
const { performance } = require("perf_hooks");
const { question, keyInYN } = require("readline-sync");

function readFile() {
    try {
        const filename = question("File to transpile: ");
        const toTranspileFile = path.join(process.cwd(), filename);
        const toWriteFile = path.join(process.cwd(), filename.replace(/\.b$/, ".js"));
        const toTranspile = fs.readFileSync(toTranspileFile).toString();
        return { toTranspile, toWriteFile };
    }
    catch (e) {
        return readFile();
    }
}

const round = (a) => Math.floor(a * 100) / 100;

const { toTranspile, toWriteFile } = readFile();
const env = keyInYN("Is this for node?");
const debug = keyInYN("Include performance info?");
const infinite = keyInYN("Does this code contain any infinite loops?");
const stds = env ? (toTranspile.includes(",") ? "let f=require('fs');let i=()=>{let b=Buffer.alloc(1);f.readSync(0, b, 0, 1);return b.toString('utf8').charCodeAt(0)};" : "") + (toTranspile.includes(".") ? "let o=(c)=>process.stdout.write(String.fromCharCode(c));" : "")
    :
    (toTranspile.includes(",") ? `let i=()=>prompt().charCodeAt(0);` : "") + (toTranspile.includes(".") ? "let o=(c)=>console.log(String.fromCharCode(c));" : "");

console.log("Starting initial transpile...");
let absStart = performance.now();
let start = performance.now();
let transpiled = !debug ? transpiler(toTranspile, stds) : `${env ? "const {performance}=require('perf_hooks');let s=performance.now();" : "let s=performance.now();"}${transpiler(toTranspile, stds)}console.log('\\nFinished in '+Math.floor((performance.now()-s)*100)/100+'ms. (Transpiled w/ perf by bftranspile)');`;
let end = performance.now();
console.log(`Initial transpile finished in ${round(end-start)}ms.`);
start = performance.now();
if (!infinite) {
    console.log("Checking for errors...");
    let toVerify = transpiler(toTranspile, `let i=()=>69;let o=()=>{};`);
    let finished = false;
    setTimeout(() => {
        if (!finished) {
            console.log("Error: Timed out. Assuming correctness.");
            console.log("Writing file...");
            fs.writeFileSync(toWriteFile, transpiled);
            end = performance.now();
            console.log(`Finished in ${round(end - absStart)}ms.`);
            process.exit(0);
        }
    }, 10000);
    try {
        eval(toVerify);
        finished = true;
        end = performance.now();
        console.log(`Verified correctness in ${round(end - start)}ms.`);
        console.log("Writing file...");
        fs.writeFileSync(toWriteFile, transpiled);
        end = performance.now();
        console.log(`Finished in ${round(end - absStart)}ms.`);
        process.exit(0);
    } catch (e) {
        finished = true;
        console.log("Error: Code has errors; cannot transpile.");
        end = performance.now();
        console.log(`Finished in ${round(end - absStart)}ms.`);
        process.exit(1);
    }
}
else {
    console.log("Not checking for errors (code cannot be evaluated).");
    console.log("Writing file...");
    fs.writeFileSync(toWriteFile, transpiled);
    end = performance.now();
    console.log(`Finished in ${round(end - absStart)}ms.`);
}