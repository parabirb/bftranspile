const { performance } = require("perf_hooks");
const { transpiler, transpilerOctane } = require("./libtrans");
const turingext = require("./bflib");
const prog = `      A mandelbrot set fractal viewer in brainf*** written by Erik Bosman
+++++++++++++[->++>>>+++++>++>+<<<<<<]>>>>>++++++>--->>>>>>>>>>+++++++++++++++[[
>>>>>>>>>]+[<<<<<<<<<]>>>>>>>>>-]+[>>>>>>>>[-]>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>[-]+
<<<<<<<+++++[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>>>>+>>>>>>>>>>>>>>>>>>>>>>>>>>
>+<<<<<<<<<<<<<<<<<[<<<<<<<<<]>>>[-]+[>>>>>>[>>>>>>>[-]>>]<<<<<<<<<[<<<<<<<<<]>>
>>>>>[-]+<<<<<<++++[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>>>+<<<<<<+++++++[-[->>>
>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>>>+<<<<<<<<<<<<<<<<[<<<<<<<<<]>>>[[-]>>>>>>[>>>>>
>>[-<<<<<<+>>>>>>]<<<<<<[->>>>>>+<<+<<<+<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>
[>>>>>>>>[-<<<<<<<+>>>>>>>]<<<<<<<[->>>>>>>+<<+<<<+<<]>>>>>>>>]<<<<<<<<<[<<<<<<<
<<]>>>>>>>[-<<<<<<<+>>>>>>>]<<<<<<<[->>>>>>>+<<+<<<<<]>>>>>>>>>+++++++++++++++[[
>>>>>>>>>]+>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+[
>+>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>[-<<<<+>>>>]<<<<[->>>>+<<<<<[->>[
-<<+>>]<<[->>+>>+<<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>>>>>>>>]<<<<<<<
<<[>[->>>>>>>>>+<<<<<<<<<]<<<<<<<<<<]>[->>>>>>>>>+<<<<<<<<<]<+>>>>>>>>]<<<<<<<<<
[>[-]<->>>>[-<<<<+>[<->-<<<<<<+>>>>>>]<[->+<]>>>>]<<<[->>>+<<<]<+<<<<<<<<<]>>>>>
>>>>[>+>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>>[-<<<<<+>>>>>]<<<<<[->>>>>+
<<<<<<[->>>[-<<<+>>>]<<<[->>>+>+<<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>
>>>>>>>]<<<<<<<<<[>>[->>>>>>>>>+<<<<<<<<<]<<<<<<<<<<<]>>[->>>>>>>>>+<<<<<<<<<]<<
+>>>>>>>>]<<<<<<<<<[>[-]<->>>>[-<<<<+>[<->-<<<<<<+>>>>>>]<[->+<]>>>>]<<<[->>>+<<
<]<+<<<<<<<<<]>>>>>>>>>[>>>>[-<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>]>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>+++++++++++++++[[>>>>
>>>>>]<<<<<<<<<-<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+>>>>>>>>>>>>>>>>>>>>>+<<<[<<<<<<
<<<]>>>>>>>>>[>>>[-<<<->>>]+<<<[->>>->[-<<<<+>>>>]<<<<[->>>>+<<<<<<<<<<<<<[<<<<<
<<<<]>>>>[-]+>>>>>[>>>>>>>>>]>+<]]+>>>>[-<<<<->>>>]+<<<<[->>>>-<[-<<<+>>>]<<<[->
>>+<<<<<<<<<<<<[<<<<<<<<<]>>>[-]+>>>>>>[>>>>>>>>>]>[-]+<]]+>[-<[>>>>>>>>>]<<<<<<
<<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]<<<<<<<[->+>>>-<<<<]>>>>>>>>>+++++++++++++++++++
+++++++>>[-<<<<+>>>>]<<<<[->>>>+<<[-]<<]>>[<<<<<<<+<[-<+>>>>+<<[-]]>[-<<[->+>>>-
<<<<]>>>]>>>>>>>>>>>>>[>>[-]>[-]>[-]>>>>>]<<<<<<<<<[<<<<<<<<<]>>>[-]>>>>>>[>>>>>
[-<<<<+>>>>]<<<<[->>>>+<<<+<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>>[-<<<<<<<<
<+>>>>>>>>>]>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>+++++++++++++++[[>>>>>>>>>]+>[-
]>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+[>+>>>>>>>>]<<<
<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>>[-<<<<<+>>>>>]<<<<<[->>>>>+<<<<<<[->>[-<<+>>]<
<[->>+>+<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>>>>>>>>]<<<<<<<<<[>[->>>>
>>>>>+<<<<<<<<<]<<<<<<<<<<]>[->>>>>>>>>+<<<<<<<<<]<+>>>>>>>>]<<<<<<<<<[>[-]<->>>
[-<<<+>[<->-<<<<<<<+>>>>>>>]<[->+<]>>>]<<[->>+<<]<+<<<<<<<<<]>>>>>>>>>[>>>>>>[-<
<<<<+>>>>>]<<<<<[->>>>>+<<<<+<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>+>>>>>>>>
]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>>[-<<<<<+>>>>>]<<<<<[->>>>>+<<<<<<[->>[-<<+
>>]<<[->>+>>+<<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>>>>>>>>]<<<<<<<<<[>
[->>>>>>>>>+<<<<<<<<<]<<<<<<<<<<]>[->>>>>>>>>+<<<<<<<<<]<+>>>>>>>>]<<<<<<<<<[>[-
]<->>>>[-<<<<+>[<->-<<<<<<+>>>>>>]<[->+<]>>>>]<<<[->>>+<<<]<+<<<<<<<<<]>>>>>>>>>
[>>>>[-<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
]>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>>>[-<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<+>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>]>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>++++++++
+++++++[[>>>>>>>>>]<<<<<<<<<-<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+[>>>>>>>>[-<<<<<<<+
>>>>>>>]<<<<<<<[->>>>>>>+<<<<<<+<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>>>>>>[
-]>>>]<<<<<<<<<[<<<<<<<<<]>>>>+>[-<-<<<<+>>>>>]>[-<<<<<<[->>>>>+<++<<<<]>>>>>[-<
<<<<+>>>>>]<->+>]<[->+<]<<<<<[->>>>>+<<<<<]>>>>>>[-]<<<<<<+>>>>[-<<<<->>>>]+<<<<
[->>>>->>>>>[>>[-<<->>]+<<[->>->[-<<<+>>>]<<<[->>>+<<<<<<<<<<<<[<<<<<<<<<]>>>[-]
+>>>>>>[>>>>>>>>>]>+<]]+>>>[-<<<->>>]+<<<[->>>-<[-<<+>>]<<[->>+<<<<<<<<<<<[<<<<<
<<<<]>>>>[-]+>>>>>[>>>>>>>>>]>[-]+<]]+>[-<[>>>>>>>>>]<<<<<<<<]>>>>>>>>]<<<<<<<<<
[<<<<<<<<<]>>>>[-<<<<+>>>>]<<<<[->>>>+>>>>>[>+>>[-<<->>]<<[->>+<<]>>>>>>>>]<<<<<
<<<+<[>[->>>>>+<<<<[->>>>-<<<<<<<<<<<<<<+>>>>>>>>>>>[->>>+<<<]<]>[->>>-<<<<<<<<<
<<<<<+>>>>>>>>>>>]<<]>[->>>>+<<<[->>>-<<<<<<<<<<<<<<+>>>>>>>>>>>]<]>[->>>+<<<]<<
<<<<<<<<<<]>>>>[-]<<<<]>>>[-<<<+>>>]<<<[->>>+>>>>>>[>+>[-<->]<[->+<]>>>>>>>>]<<<
<<<<<+<[>[->>>>>+<<<[->>>-<<<<<<<<<<<<<<+>>>>>>>>>>[->>>>+<<<<]>]<[->>>>-<<<<<<<
<<<<<<<+>>>>>>>>>>]<]>>[->>>+<<<<[->>>>-<<<<<<<<<<<<<<+>>>>>>>>>>]>]<[->>>>+<<<<
]<<<<<<<<<<<]>>>>>>+<<<<<<]]>>>>[-<<<<+>>>>]<<<<[->>>>+>>>>>[>>>>>>>>>]<<<<<<<<<
[>[->>>>>+<<<<[->>>>-<<<<<<<<<<<<<<+>>>>>>>>>>>[->>>+<<<]<]>[->>>-<<<<<<<<<<<<<<
+>>>>>>>>>>>]<<]>[->>>>+<<<[->>>-<<<<<<<<<<<<<<+>>>>>>>>>>>]<]>[->>>+<<<]<<<<<<<
<<<<<]]>[-]>>[-]>[-]>>>>>[>>[-]>[-]>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>>>>>[-<
<<<+>>>>]<<<<[->>>>+<<<+<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>+++++++++++++++[
[>>>>>>>>>]+>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+
[>+>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>[-<<<<+>>>>]<<<<[->>>>+<<<<<[->>
[-<<+>>]<<[->>+>+<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>>>>>>>>]<<<<<<<<
<[>[->>>>>>>>>+<<<<<<<<<]<<<<<<<<<<]>[->>>>>>>>>+<<<<<<<<<]<+>>>>>>>>]<<<<<<<<<[
>[-]<->>>[-<<<+>[<->-<<<<<<<+>>>>>>>]<[->+<]>>>]<<[->>+<<]<+<<<<<<<<<]>>>>>>>>>[
>>>[-<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>]>
>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>[-]>>>>+++++++++++++++[[>>>>>>>>>]<<<<<<<<<-<<<<<
<<<<[<<<<<<<<<]>>>>>>>>>-]+[>>>[-<<<->>>]+<<<[->>>->[-<<<<+>>>>]<<<<[->>>>+<<<<<
<<<<<<<<[<<<<<<<<<]>>>>[-]+>>>>>[>>>>>>>>>]>+<]]+>>>>[-<<<<->>>>]+<<<<[->>>>-<[-
<<<+>>>]<<<[->>>+<<<<<<<<<<<<[<<<<<<<<<]>>>[-]+>>>>>>[>>>>>>>>>]>[-]+<]]+>[-<[>>
>>>>>>>]<<<<<<<<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>[-<<<+>>>]<<<[->>>+>>>>>>[>+>>>
[-<<<->>>]<<<[->>>+<<<]>>>>>>>>]<<<<<<<<+<[>[->+>[-<-<<<<<<<<<<+>>>>>>>>>>>>[-<<
+>>]<]>[-<<-<<<<<<<<<<+>>>>>>>>>>>>]<<<]>>[-<+>>[-<<-<<<<<<<<<<+>>>>>>>>>>>>]<]>
[-<<+>>]<<<<<<<<<<<<<]]>>>>[-<<<<+>>>>]<<<<[->>>>+>>>>>[>+>>[-<<->>]<<[->>+<<]>>
>>>>>>]<<<<<<<<+<[>[->+>>[-<<-<<<<<<<<<<+>>>>>>>>>>>[-<+>]>]<[-<-<<<<<<<<<<+>>>>
>>>>>>>]<<]>>>[-<<+>[-<-<<<<<<<<<<+>>>>>>>>>>>]>]<[-<+>]<<<<<<<<<<<<]>>>>>+<<<<<
]>>>>>>>>>[>>>[-]>[-]>[-]>>>>]<<<<<<<<<[<<<<<<<<<]>>>[-]>[-]>>>>>[>>>>>>>[-<<<<<
<+>>>>>>]<<<<<<[->>>>>>+<<<<+<<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>+>[-<-<<<<+>>>>
>]>>[-<<<<<<<[->>>>>+<++<<<<]>>>>>[-<<<<<+>>>>>]<->+>>]<<[->>+<<]<<<<<[->>>>>+<<
<<<]+>>>>[-<<<<->>>>]+<<<<[->>>>->>>>>[>>>[-<<<->>>]+<<<[->>>-<[-<<+>>]<<[->>+<<
<<<<<<<<<[<<<<<<<<<]>>>>[-]+>>>>>[>>>>>>>>>]>+<]]+>>[-<<->>]+<<[->>->[-<<<+>>>]<
<<[->>>+<<<<<<<<<<<<[<<<<<<<<<]>>>[-]+>>>>>>[>>>>>>>>>]>[-]+<]]+>[-<[>>>>>>>>>]<
<<<<<<<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>[-<<<+>>>]<<<[->>>+>>>>>>[>+>[-<->]<[->+
<]>>>>>>>>]<<<<<<<<+<[>[->>>>+<<[->>-<<<<<<<<<<<<<+>>>>>>>>>>[->>>+<<<]>]<[->>>-
<<<<<<<<<<<<<+>>>>>>>>>>]<]>>[->>+<<<[->>>-<<<<<<<<<<<<<+>>>>>>>>>>]>]<[->>>+<<<
]<<<<<<<<<<<]>>>>>[-]>>[-<<<<<<<+>>>>>>>]<<<<<<<[->>>>>>>+<<+<<<<<]]>>>>[-<<<<+>
>>>]<<<<[->>>>+>>>>>[>+>>[-<<->>]<<[->>+<<]>>>>>>>>]<<<<<<<<+<[>[->>>>+<<<[->>>-
<<<<<<<<<<<<<+>>>>>>>>>>>[->>+<<]<]>[->>-<<<<<<<<<<<<<+>>>>>>>>>>>]<<]>[->>>+<<[
->>-<<<<<<<<<<<<<+>>>>>>>>>>>]<]>[->>+<<]<<<<<<<<<<<<]]>>>>[-]<<<<]>>>>[-<<<<+>>
>>]<<<<[->>>>+>[-]>>[-<<<<<<<+>>>>>>>]<<<<<<<[->>>>>>>+<<+<<<<<]>>>>>>>>>[>>>>>>
>>>]<<<<<<<<<[>[->>>>+<<<[->>>-<<<<<<<<<<<<<+>>>>>>>>>>>[->>+<<]<]>[->>-<<<<<<<<
<<<<<+>>>>>>>>>>>]<<]>[->>>+<<[->>-<<<<<<<<<<<<<+>>>>>>>>>>>]<]>[->>+<<]<<<<<<<<
<<<<]]>>>>>>>>>[>>[-]>[-]>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>[-]>[-]>>>>>[>>>>>[-<<<<+
>>>>]<<<<[->>>>+<<<+<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>>>>>>[-<<<<<+>>>>>
]<<<<<[->>>>>+<<<+<<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>+++++++++++++++[[>>>>
>>>>>]+>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+[>+>>
>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>[-<<<<+>>>>]<<<<[->>>>+<<<<<[->>[-<<+
>>]<<[->>+>>+<<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>>>>>>>>]<<<<<<<<<[>
[->>>>>>>>>+<<<<<<<<<]<<<<<<<<<<]>[->>>>>>>>>+<<<<<<<<<]<+>>>>>>>>]<<<<<<<<<[>[-
]<->>>>[-<<<<+>[<->-<<<<<<+>>>>>>]<[->+<]>>>>]<<<[->>>+<<<]<+<<<<<<<<<]>>>>>>>>>
[>+>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>->>>>>[-<<<<<+>>>>>]<<<<<[->>>>>+<<<<
<<[->>>[-<<<+>>>]<<<[->>>+>+<<<<]+>>>>>>>>>]<<<<<<<<[<<<<<<<<<]]>>>>>>>>>[>>>>>>
>>>]<<<<<<<<<[>>[->>>>>>>>>+<<<<<<<<<]<<<<<<<<<<<]>>[->>>>>>>>>+<<<<<<<<<]<<+>>>
>>>>>]<<<<<<<<<[>[-]<->>>>[-<<<<+>[<->-<<<<<<+>>>>>>]<[->+<]>>>>]<<<[->>>+<<<]<+
<<<<<<<<<]>>>>>>>>>[>>>>[-<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>]>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>+++++++++++++++[[>>>>>>>>
>]<<<<<<<<<-<<<<<<<<<[<<<<<<<<<]>>>>>>>>>-]+>>>>>>>>>>>>>>>>>>>>>+<<<[<<<<<<<<<]
>>>>>>>>>[>>>[-<<<->>>]+<<<[->>>->[-<<<<+>>>>]<<<<[->>>>+<<<<<<<<<<<<<[<<<<<<<<<
]>>>>[-]+>>>>>[>>>>>>>>>]>+<]]+>>>>[-<<<<->>>>]+<<<<[->>>>-<[-<<<+>>>]<<<[->>>+<
<<<<<<<<<<<[<<<<<<<<<]>>>[-]+>>>>>>[>>>>>>>>>]>[-]+<]]+>[-<[>>>>>>>>>]<<<<<<<<]>
>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>->>[-<<<<+>>>>]<<<<[->>>>+<<[-]<<]>>]<<+>>>>[-<<<<
->>>>]+<<<<[->>>>-<<<<<<.>>]>>>>[-<<<<<<<.>>>>>>>]<<<[-]>[-]>[-]>[-]>[-]>[-]>>>[
>[-]>[-]>[-]>[-]>[-]>[-]>>>]<<<<<<<<<[<<<<<<<<<]>>>>>>>>>[>>>>>[-]>>>>]<<<<<<<<<
[<<<<<<<<<]>+++++++++++[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>+>>>>>>>>>+<<<<<<<<
<<<<<<[<<<<<<<<<]>>>>>>>[-<<<<<<<+>>>>>>>]<<<<<<<[->>>>>>>+[-]>>[>>>>>>>>>]<<<<<
<<<<[>>>>>>>[-<<<<<<+>>>>>>]<<<<<<[->>>>>>+<<<<<<<[<<<<<<<<<]>>>>>>>[-]+>>>]<<<<
<<<<<<]]>>>>>>>[-<<<<<<<+>>>>>>>]<<<<<<<[->>>>>>>+>>[>+>>>>[-<<<<->>>>]<<<<[->>>
>+<<<<]>>>>>>>>]<<+<<<<<<<[>>>>>[->>+<<]<<<<<<<<<<<<<<]>>>>>>>>>[>>>>>>>>>]<<<<<
<<<<[>[-]<->>>>>>>[-<<<<<<<+>[<->-<<<+>>>]<[->+<]>>>>>>>]<<<<<<[->>>>>>+<<<<<<]<
+<<<<<<<<<]>>>>>>>-<<<<[-]+<<<]+>>>>>>>[-<<<<<<<->>>>>>>]+<<<<<<<[->>>>>>>->>[>>
>>>[->>+<<]>>>>]<<<<<<<<<[>[-]<->>>>>>>[-<<<<<<<+>[<->-<<<+>>>]<[->+<]>>>>>>>]<<
<<<<[->>>>>>+<<<<<<]<+<<<<<<<<<]>+++++[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>+<<<
<<[<<<<<<<<<]>>>>>>>>>[>>>>>[-<<<<<->>>>>]+<<<<<[->>>>>->>[-<<<<<<<+>>>>>>>]<<<<
<<<[->>>>>>>+<<<<<<<<<<<<<<<<[<<<<<<<<<]>>>>[-]+>>>>>[>>>>>>>>>]>+<]]+>>>>>>>[-<
<<<<<<->>>>>>>]+<<<<<<<[->>>>>>>-<<[-<<<<<+>>>>>]<<<<<[->>>>>+<<<<<<<<<<<<<<[<<<
<<<<<<]>>>[-]+>>>>>>[>>>>>>>>>]>[-]+<]]+>[-<[>>>>>>>>>]<<<<<<<<]>>>>>>>>]<<<<<<<
<<[<<<<<<<<<]>>>>[-]<<<+++++[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>-<<<<<[<<<<<<<
<<]]>>>]<<<<.>>>>>>>>>>[>>>>>>[-]>>>]<<<<<<<<<[<<<<<<<<<]>++++++++++[-[->>>>>>>>
>+<<<<<<<<<]>>>>>>>>>]>>>>>+>>>>>>>>>+<<<<<<<<<<<<<<<[<<<<<<<<<]>>>>>>>>[-<<<<<<
<<+>>>>>>>>]<<<<<<<<[->>>>>>>>+[-]>[>>>>>>>>>]<<<<<<<<<[>>>>>>>>[-<<<<<<<+>>>>>>
>]<<<<<<<[->>>>>>>+<<<<<<<<[<<<<<<<<<]>>>>>>>>[-]+>>]<<<<<<<<<<]]>>>>>>>>[-<<<<<
<<<+>>>>>>>>]<<<<<<<<[->>>>>>>>+>[>+>>>>>[-<<<<<->>>>>]<<<<<[->>>>>+<<<<<]>>>>>>
>>]<+<<<<<<<<[>>>>>>[->>+<<]<<<<<<<<<<<<<<<]>>>>>>>>>[>>>>>>>>>]<<<<<<<<<[>[-]<-
>>>>>>>>[-<<<<<<<<+>[<->-<<+>>]<[->+<]>>>>>>>>]<<<<<<<[->>>>>>>+<<<<<<<]<+<<<<<<
<<<]>>>>>>>>-<<<<<[-]+<<<]+>>>>>>>>[-<<<<<<<<->>>>>>>>]+<<<<<<<<[->>>>>>>>->[>>>
>>>[->>+<<]>>>]<<<<<<<<<[>[-]<->>>>>>>>[-<<<<<<<<+>[<->-<<+>>]<[->+<]>>>>>>>>]<<
<<<<<[->>>>>>>+<<<<<<<]<+<<<<<<<<<]>+++++[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>>
+>>>>>>>>>>>>>>>>>>>>>>>>>>>+<<<<<<[<<<<<<<<<]>>>>>>>>>[>>>>>>[-<<<<<<->>>>>>]+<
<<<<<[->>>>>>->>[-<<<<<<<<+>>>>>>>>]<<<<<<<<[->>>>>>>>+<<<<<<<<<<<<<<<<<[<<<<<<<
<<]>>>>[-]+>>>>>[>>>>>>>>>]>+<]]+>>>>>>>>[-<<<<<<<<->>>>>>>>]+<<<<<<<<[->>>>>>>>
-<<[-<<<<<<+>>>>>>]<<<<<<[->>>>>>+<<<<<<<<<<<<<<<[<<<<<<<<<]>>>[-]+>>>>>>[>>>>>>
>>>]>[-]+<]]+>[-<[>>>>>>>>>]<<<<<<<<]>>>>>>>>]<<<<<<<<<[<<<<<<<<<]>>>>[-]<<<++++
+[-[->>>>>>>>>+<<<<<<<<<]>>>>>>>>>]>>>>>->>>>>>>>>>>>>>>>>>>>>>>>>>>-<<<<<<[<<<<
<<<<<]]>>>][+][OCTANE QUFBQUFBQUFBQUFBQUFBQUJCQkJCQkJCQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREREREVHRkZFRUVFREREREREQ0NDQ0NDQ0NDQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCCkFBQUFBQUFBQUFBQUFBQUJCQkJCQkJCQkJCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0RERERERERERERFRUVGR0lJR0ZGRUVFRERERERERERDQ0NDQ0NDQ0NCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQgpBQUFBQUFBQUFBQUFBQkJCQkJCQkJCQkJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREREREREREVFRUVGRkZJIEtIR0dHSEdFREREREREREREQ0NDQ0NDQ0NDQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkIKQUFBQUFBQUFBQUFBQkJCQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NEREREREREREREREREREVFRUVFRkZHSElNVEtMWk9HRkVFREREREREREREQ0NDQ0NDQ0NDQkJCQkJCQkJCQkJCQkJCQkJCQkJCCkFBQUFBQUFBQUFBQkJCQkJCQkJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0RERERERERERERERERERUVFRUVFRkdHSEhJS1BQS0lIR0ZGRUVFREREREREREREQ0NDQ0NDQ0NDQ0JCQkJCQkJCQkJCQkJCQkJCQgpBQUFBQUFBQUFBQkJCQkJCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NERERERERERERERERERERFRUVFRUVGRkdISUpLUyAgWCBLSEhHRkVFRUVFREREREREREREQ0NDQ0NDQ0NDQ0JCQkJCQkJCQkJCQkJCQkIKQUFBQUFBQUFBQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREREREREREREREVFRUVFRUZGR1FQVVZPVFkgICBaUUxbTUhGRUVFRUVFRURERERERERDQ0NDQ0NDQ0NDQ0JCQkJCQkJCQkJCQkJCCkFBQUFBQUFBQkJCQkJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NERERERERERERERERERERFRUVFRUZGRkZGR0dISkxaICAgICAgICAgVUtIR0ZGRUVFRUVFRUVERERERENDQ0NDQ0NDQ0NDQ0JCQkJCQkJCQkJCQgpBQUFBQUFBQkJCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0RERERERERERERERERERUVFRUZGRkZGRkdHR0dISUtQICAgICAgICAgICBLSEhHR0ZGRkZFRUVFRUVERERERENDQ0NDQ0NDQ0NDQkJCQkJCQkJCQkIKQUFBQUFBQUJCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRERERERERERERERERUVFRUVGR0dISUlISEhISElJSUpLTVIgICAgICAgIFZNS0pJSEhIR0ZGRkZGRkdTR0VEREREQ0NDQ0NDQ0NDQ0NDQkJCQkJCQkJCCkFBQUFBQUJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0RERERERERERERERUVFRUVFRkZHSEsgICBNS0pJSk8gIE4gUiAgWCAgICAgIFlVU1IgUExWIExISEhHR0hJT0pHRkVERERDQ0NDQ0NDQ0NDQ0NCQkJCQkJCQgpBQUFBQUJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRERERERERERFRUVFRUVFRUVGRkZGR0ggTyAgICBUTiBTICAgICAgICAgICAgICAgICAgICAgICBOS0pLUiBMTFFNTkhFRURERENDQ0NDQ0NDQ0NDQ0JCQkJCQkIKQUFBQUFCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREVFRUVFRUVFRUVFRUZGRkZGR0hISU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBRICAgICBVTVdHRUVFREREQ0NDQ0NDQ0NDQ0NDQkJCQkJCCkFBQUFCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NERERERUVFRUVFRUVFRUVFRUVFRkZGRkZGR0hJSktMT1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0pHRkZFRUVERENDQ0NDQ0NDQ0NDQ0NCQkJCQgpBQUFBQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NERERERUVFRUVFRUVFRUVFRUVFRUZGRkZGRkdHSFlWIFJRVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBRTUpIR0dGRUVFREREQ0NDQ0NDQ0NDQ0NDQ0JCQkIKQUFBQkNDQ0NDQ0NDQ0NDQ0NDQ0NDREREREREREVFRkpJSEZGRkZGRkZGRkZGRkZGR0dHR0dHSElKTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSkhIR0ZFRURERERDQ0NDQ0NDQ0NDQ0NDQkJCCkFBQUJDQ0NDQ0NDQ0NDQ0RERERERERERERFRUVFRkZITEtISEdHR0dISE1KSEdHR0dHR0hISElLUlIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVVEgTCBIRkVEREREQ0NDQ0NDQ0NDQ0NDQ0NCQgpBQUJDQ0NDQ0NDQ0RERERERERERERERUVFRUVFRkZGSEtRTVJLTkpJSkxWUyBKSktJSUlJSUlKTFIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlOSEZFRERERERDQ0NDQ0NDQ0NDQ0NDQkIKQUFCQ0NDQ0NERERERERERERERERFRUVFRUVFRkZHR0hJSktPVSAgTyBPICAgUFIgTExKSkpLTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9JSEZGRUREREREQ0NDQ0NDQ0NDQ0NDQ0NCCkFBQ0NDREREREREREREREREREVFRUVFRUVFRUZHR0dISUpNUiAgICAgICAgICAgICAgUk1MTU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTlRGRUVERERERERDQ0NDQ0NDQ0NDQ0NDQgpBQUNDRERERERERERERERERUVFRUVFRUVFRkdHR0hIS09OU1ogICAgICAgICAgICAgICAgUVBSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTkpHRkVFREREREREQ0NDQ0NDQ0NDQ0NDQ0MKQUJDRERERERERERERERFRUVFRUZGRkZGR0lQSklJSktNUSAgICAgICAgICAgICAgICAgICBWWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIRkZFRURERERERENDQ0NDQ0NDQ0NDQ0NDCkFDREREREREREREREVGRkZGRkZGR0dHR0hJS1pPT1BQUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIR0ZFRUVERERERERDQ0NDQ0NDQ0NDQ0NDQwpBREVFRUVGRkZHSElHR0dHR0dISEhISUpKTE5ZICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVEpIR0ZGRUVFRERERERERENDQ0NDQ0NDQ0NDQ0MKQSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQTEpIR0dGRkVFRURERERERERDQ0NDQ0NDQ0NDQ0NDCkFERUVFRUZGRkdISUdHR0dHR0hISEhJSkpMTlkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUSkhHRkZFRUVEREREREREQ0NDQ0NDQ0NDQ0NDQwpBQ0RERERERERERERFRkZGRkZGRkdHR0dISUtaT09QUFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSEdGRUVFREREREREQ0NDQ0NDQ0NDQ0NDQ0MKQUJDRERERERERERERERFRUVFRUZGRkZGR0lQSklJSktNUSAgICAgICAgICAgICAgICAgICBWWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIRkZFRURERERERENDQ0NDQ0NDQ0NDQ0NDCkFBQ0NERERERERERERERERFRUVFRUVFRUVGR0dHSEhLT05TWiAgICAgICAgICAgICAgICBRUFIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOSkdGRUVERERERERDQ0NDQ0NDQ0NDQ0NDQwpBQUNDQ0RERERERERERERERERFRUVFRUVFRUVGR0dHSElKTVIgICAgICAgICAgICAgIFJNTE1OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5URkVFREREREREQ0NDQ0NDQ0NDQ0NDQ0IKQUFCQ0NDQ0NERERERERERERERERFRUVFRUVFRkZHR0hJSktPVSAgTyBPICAgUFIgTExKSkpLTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9JSEZGRUREREREQ0NDQ0NDQ0NDQ0NDQ0NCCkFBQkNDQ0NDQ0NDRERERERERERERERFRUVFRUVGRkZIS1FNUktOSklKTFZTIEpKS0lJSUlJSUpMUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWU5IRkVERERERENDQ0NDQ0NDQ0NDQ0NCQgpBQUFCQ0NDQ0NDQ0NDQ0NERERERERERERERUVFRUZGSExLSEhHR0dHSEhNSkhHR0dHR0dISEhJS1JSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVRIEwgSEZFRERERENDQ0NDQ0NDQ0NDQ0NDQkIKQUFBQkNDQ0NDQ0NDQ0NDQ0NDQ0NDREREREREREVFRkpJSEZGRkZGRkZGRkZGRkZGR0dHR0dHSElKTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSkhIR0ZFRURERERDQ0NDQ0NDQ0NDQ0NDQkJCCkFBQUFCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0RERERFRUVFRUVFRUVFRUVFRUVFRkZGRkZGR0dIWVYgUlFVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFFNSkhHR0ZFRUVERERDQ0NDQ0NDQ0NDQ0NDQkJCQgpBQUFBQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDREREREVFRUVFRUVFRUVFRUVFRUZGRkZGRkdISUpLTE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtKR0ZGRUVFRERDQ0NDQ0NDQ0NDQ0NDQkJCQkIKQUFBQUFCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREVFRUVFRUVFRUVFRUZGRkZGR0hISU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBRICAgICBVTVdHRUVFREREQ0NDQ0NDQ0NDQ0NDQkJCQkJCCkFBQUFBQkJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NEREREREREREVFRUVFRUVFRUZGRkZHSCBPICAgIFROIFMgICAgICAgICAgICAgICAgICAgICAgIE5LSktSIExMUU1OSEVFREREQ0NDQ0NDQ0NDQ0NDQkJCQkJCQgpBQUFBQUFCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NEREREREREREREREVFRUVFRUZGR0hLICAgTUtKSUpPICBOIFIgIFggICAgICBZVVNSIFBMViBMSEhIR0dISU9KR0ZFREREQ0NDQ0NDQ0NDQ0NDQkJCQkJCQkIKQUFBQUFBQUJCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRERERERERERERERERUVFRUVGR0dISUlISEhISElJSUpLTVIgICAgICAgIFZNS0pJSEhIR0ZGRkZGRkdTR0VEREREQ0NDQ0NDQ0NDQ0NDQkJCQkJCQkJCCkFBQUFBQUFCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRERERERERERERERERERFRUVFRkZGRkZGR0dHR0hJS1AgICAgICAgICAgIEtISEdHRkZGRkVFRUVFRUREREREQ0NDQ0NDQ0NDQ0NCQkJCQkJCQkJCQgpBQUFBQUFBQUJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRERERERERERERERERERERUVFRUVGRkZGRkdHSEpMWiAgICAgICAgIFVLSEdGRkVFRUVFRUVFRERERERDQ0NDQ0NDQ0NDQ0NCQkJCQkJCQkJCQkIKQUFBQUFBQUFBQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREREREREREREREVFRUVFRUZGR1FQVVZPVFkgICBaUUxbTUhGRUVFRUVFRURERERERERDQ0NDQ0NDQ0NDQ0JCQkJCQkJCQkJCQkJCCkFBQUFBQUFBQUFCQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0REREREREREREREREREREVFRUVFRUZGR0hJSktTICBYIEtISEdGRUVFRUVERERERERERERDQ0NDQ0NDQ0NDQkJCQkJCQkJCQkJCQkJCQgpBQUFBQUFBQUFBQUJCQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NEREREREREREREREREREVFRUVFRUZHR0hISUtQUEtJSEdGRkVFRURERERERERERENDQ0NDQ0NDQ0NCQkJCQkJCQkJCQkJCQkJCQkIKQUFBQUFBQUFBQUFBQkJCQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NEREREREREREREREREREVFRUVFRkZHSElNVEtMWk9HRkVFREREREREREREQ0NDQ0NDQ0NDQkJCQkJCQkJCQkJCQkJCQkJCQkJCCkFBQUFBQUFBQUFBQUFCQkJCQkJCQkJCQkJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRERERERERERERERERUVFRUZGRkkgS0hHR0dIR0VERERERERERERDQ0NDQ0NDQ0NCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQgpBQUFBQUFBQUFBQUFBQUFCQkJCQkJCQkJCQkJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NERERERERERERERUVFRkdJSUdGRkVFRUREREREREREQ0NDQ0NDQ0NDQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkIK OCTANE]`;
const stds = `let o=(c)=>process.stdout.write(String.fromCharCode(c));`;
const stdout = (c)=>process.stdout.write(c);
const r = stdout;

console.log("This program may take a while to run. This is normal.");
console.log("Beginning Octane transpiled test...");
let octaneStart = performance.now();
const octane = transpilerOctane(prog, "", false).transpiled;
eval(octane);
let octaneEnd = performance.now();
console.log("Beginning non-Octane transpiled test...");
let transpiledStart = performance.now();
const transpiled = transpiler(prog, stds);
eval(transpiled);
let transpiledEnd = performance.now();
console.log("Beginning native test...");
let bfStart = performance.now();
const bf = new turingext(prog, stdout, () => {});
bf.run();
let bfEnd = performance.now();

console.log(`The Octane transpiler (most optimized) took ${Math.floor((octaneEnd-octaneStart) * 100)/100} milliseconds.
The non-Octane transpiler (second most optimized) took ${Math.floor((transpiledEnd-transpiledStart) * 100)/100} milliseconds.
The naive interpreter (least optimized) took ${Math.floor((bfEnd-bfStart) * 100)/100} milliseconds.`);

console.log(`NOTICE:
The code that was executed contains Octane strings. Octane strings speed up transpile time by a large amount.
Most programs do not have Octane strings (however, bftranspile automatically adds Octane strings to your Brainfuck).
In reality, Octane transpilation may be slightly less fast than non-Octane if your program does not have an Octane string.
HOWEVER, Octane output for programs with static output will always be faster than non-Octane output.

None of this applies if your program uses the , command.
If your program uses the , command, Octane and non-Octane performance (including transpile time) will be the same.
Octane strings will not be appended to programs with the , command.`);