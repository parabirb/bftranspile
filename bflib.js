/*
    turingext
    public domain
 */

// turingext class so you can run on the fly(TM)
class turingext {
    constructor(program, stdout, stdin, onstep = (...args) => {}) {
        // program
        this.program = program.replace(/\/\*.+\*\//g, "");
        // stdout should be something like (a) => console.log(a)
        this.stdout = stdout;
        // stdin should return 1 character of user input
        this.stdin = stdin;
        // pointer for memory
        this.ptr = 0;
        // position in program
        this.pos = 0;
        // memory (let's just alloc 1 mibibyte lol)
        this.mem = new Int8Array(1048576);
        // make sure mem[0] is 0
        this.mem[0] = 0;
        // if program is running
        this.running = false;
        // call stack
        this.stack = [];
        // onstep
        this.onstep = onstep;
    }

    step() {
        let incpos = true;
        // increment ptr
        if (this.program[this.pos] === ">") {
            this.ptr++;
            if (!this.mem[this.ptr]) this.mem[this.ptr] = 0;
        }
        // decrement ptr
        else if (this.program[this.pos] === "<") {
            if (this.ptr > 0) this.ptr--;
            else throw new RangeError("Attempt to decrease ptr past 0.");
        }
        // increment at ptr
        else if (this.program[this.pos] === "+") {
            this.mem[this.ptr]++;
        }
        // decrement at ptr
        else if (this.program[this.pos] === "-") {
            this.mem[this.ptr]--;
        }
        // print at ptr
        else if (this.program[this.pos] === ".") {
            this.stdout(String.fromCharCode(this.mem[this.ptr]));
        }
        // input to ptr
        else if (this.program[this.pos] === ",") {
            this.mem[this.ptr] = this.stdin().charCodeAt(0);
        }
        // while (*ptr) {
        else if (this.program[this.pos] === "[") {
            if (!this.mem[this.ptr]) {
                incpos = false;
                let depth = 1;
                while (depth > 0) {
                    this.pos++;
                    if (this.program[this.pos] === "[") depth++;
                    else if (this.program[this.pos] === "]") depth--;
                }
            }
        }
        // }
        else if (this.program[this.pos] === "]") {
            if (this.mem[this.ptr]) {
                incpos = false;
                let depth = 1;
                while (depth > 0) {
                    this.pos--;
                    if (this.program[this.pos] === "[") depth--;
                    else if (this.program[this.pos] === "]") depth++;
                }
            }
        }
        // program's over bub
        else if (!this.program[this.pos]) {
            this.running = false;
        }
        // anything that aren't the specified characters are comments
        this.pos++;
        this.onstep(this.debugInfo());
    }

    run() {
        this.running = true;
        while (this.running) {
            this.step();
        }
    }

    debugInfo() {
        return {
            "mem": this.mem,
            "ptr": this.ptr,
            "program": this.program,
            "pos": this.pos
        };
    }
}

module.exports = turingext;