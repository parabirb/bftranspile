const {performance}=require('perf_hooks');let s=performance.now();let o=(c)=>process.stdout.write(String.fromCharCode(c));let r=(a)=>process.stdout.write(a);r("You are on an Octane transpiler.");console.log('\nFinished in '+Math.floor((performance.now()-s)*100)/100+'ms. (Transpiled w/ perf by bftranspile)');