Writing Command-Line Applications in NodeJS
===========================================

![](https://cdn-images-1.medium.com/max/2000/1*90gS34fsYQD1Up9L6KHwmw.jpeg)

With the right packages, writing command-line apps in NodeJS is a breeze.

One package in particular makes it extremely easy: [*Commander*](https://www.npmjs.com/package/commander)*.*

Let's set the stage and walk-through how to write a command-line interface (CLI) app in NodeJS with Commander. Our goal will be to write a CLI app to list files and directories.

#### Setup

IDEs\
I love online IDEs. They abstract away a lot of headaches when it comes to dev environment setup. I personally use [Cloud9](http://c9.io/) for the following reasons:

-   The layout is intuitive
-   The editor is beautiful and easy-to-use
-   Free-tier resources have recently been increased to 1GB RAM and 5GB disk space, which is more than plenty for a decent-sized NodeJS application.
-   Unlimited number of workstations
-   It's a perfect environment to test or experiment with new projects/ideas without fear of breaking your environment

Node/NPM Version\
At the time of writing this article, Node is at version 5.3.0 and NPM is ad version 3.3.12.

#### Initialization

We start by initializing our project, accept all the NPM defaults, and installing the *commander* package:

npm init\
npm i --save commander

Resulting in:

package.json

Note:

-   You will have to add *bin* manually, which tells NodeJS what your CLI app is called and what is the entry point to your app.
-   Make sure you do not use a command name that already exists in your system.

#### Index.js

Now that we've initialized our project and indicated that our entry point is index.js, let's create index.js:

touch index.js

Now, for the actual coding part:

Typically, when executing NodeJS files, we tell the system to use the appropriate interpreter by prefixing *node* before the file. However, we want to be able to execute our CLI app globally from anywhere in the system, and without having to specify the node interpreter every time.

Therefore, our first line is the [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) expression:

#!/usr/bin/env node

This not only tells our system to use the appropriate interpreter, but it also tells our system to use the appropriate *version* of the interpreter.

From here on out, we write pure JavaScript code.\
Since I'll be writing ES6-compliant code, I'll start with the literal expression:

'use strict';

This tells the compiler to use a stricter variant of javascript [[1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)] and enables us to write ES6 code on Cloud9.

Let's start by requiring the *commander* package:

const program = require('commander');

Now, writing CLI apps with *commander *issimple, and the documentation is great, but I struggled with a few concepts that I will attempt to clear up here.

There seems to be 2 designs for CLI apps. Take *ls* and *git* for example.

With *ls*, you pass one or more flags:

-   *ls -l*
-   *ls -al*

With *git*, you pass sub-commands, but you also have some flags:

-   *git commit -am <message>*
-   *git remote add origin <repo-url>*

We will explore the flexibility *Commander *gives us to design both types of command-line interfaces.

* * * * *

#### Commander API

The *Commander* API is straight forward and the documentation is great.

There are 3 basic ways we can write our program:

METHOD #1: Flag-only command-line application

const program = require('commander');

program\
  .version('0.0.1')\
  .option('-o, --option','option description')\
  .option('-m, --more','we can have as many options as we want')\
  .option('-i, --input [optional]','optional user input')\
  .option('-I, --another-input <required>','required user input')\
  .parse(process.argv); // end with parse to parse through the input

Note:

-   The short-hand and long-hand options are in the same string (see the bold text in the image above)
-   -o and -m will return boolean values when users pass them because we didn't specify any *optional* or *required* user input.
-   -i and -I will capture user input and pass the values to our CLI app.
-   Any value enclosed in square brackets (e.g. [ ] ) is considered optional. User may or may not provide a value.
-   Any value enclosed in angled brackets (e.g. < > ) is considered required. User must provide a value.

The example above allows us to implement a flag-only approach to our CLI app. Users will be expected to interact with our app like so:

//Examples:\
$ cli-app -om -I hello\
$ cli-app --option -i optionalValue -I requiredValue

METHOD #2: Sub-command and flag-based command-line application

const program = require('commander');

program\
  .version('0.0.1')\
  .command('command <req> [optional]')\
 .description('command description')\
  .option('-o, --option','we can still have add'l options')\
  .action(function(req,optional){\
    console.log('.action() allows us to implement the command');\
    console.log('User passed %s', req);\
    if (optional) {\
      optional.forEach(function(opt){\
        console.log("User passed optional arguments: %s", opt);\
      });\
    }\
  });

program.parse(process.argv); // notice that we have to parse in a new statement.

Note:

-   If we utilize .command('command...').description('description...'), we must utilize .action() to pass a function and execute our code based on the user's input. (I point this out because there is an alternative method to utilize .command() that we'll explore next.)
-   If we utilize .command('command...'), we can no longer just tack on .parse(process.argv) at the end like we did in the previous example. We have to pass parse() in a new statement

Users are expected to interact with our CLI app like so:

//Example:\
$ cli-app command requiredValue -o

METHOD #3: Same as METHOD #2 above, but allows for modularized code

Finally, we don't have to bloat our one JavaScript file with all the .command().description().action() logic. We can modularize our CLI project like so:

// file: ./cli-app/index.js\
const program = require('commander');

program\
.version('0.0.1')\
.command('command <req> [optional]','command description')\
.command('command2','command2 description')\
.command('command3','command3 description')\
.parse(process.argv);

Note:

-   If we utilize .command('command', 'description') to pass in the command and the description, we can no longer have .action(). *Commander *will imply that we have separate files with a specific naming convention where we can handle each command. The naming convention is index-command.js, index-command2.js, index-command3.js. [See examples of this on Github](https://github.com/tj/commander.js/tree/master/examples) (specifically: pm, pm-install, pm-publish files).
-   If we take this route, we can just tack on .parse() at the end.

* * * * *

#### Back to our project scenario...

Now that we've covered the basics, it's all downhill from here. We can take a deep breath.

*** SIGH ***

All right, now the fun begins.

If we recall our project scenario, we want to write a CLI app to list files and directories. So let's start writing the code.

We want to give the user the ability to decide if they want to see "all" files (including hidden ones) and/or if they want to see the long listing format (including the rights/permissions of the files/folders).

So, we start by writing the basic shell of our program to see our incremental progress (we will follow signature of Method #2 for the sake of the demo) :

#!/usr/bin/env node\
'use strict';

const program = require('commander');

program\
  .version('')\
  .command('')\
  .description('')\
  .option('','')\
  .option('','')\
  .action('');

program.parse(process.argv);

Let's start filling the blanks:

#!/usr/bin/env node\
'use strict';

const program = require('commander');

program\
  .version('0.0.1')\
  .command('list [directory]')\
  .description('List files and folders')\
  .option('-a, --all','List all files and folders')\
  .option('-l, --long','')\
  .action();

program.parse(process.argv);

Note:

-   We decided to name our command *list*.
-   Directoryargument is optional, so user can simply ignore to pass a directory, in which case we will list files/folders in current directory.

So, in our scenario, the following calls are valid:

$ cli-app list\
$ cli-app list -al\
$ cli-app list --all\
$ cli-app list --long\
$ cli-app list /home/user -al

Now, let's start writing code for our .action().

#!/usr/bin/env node\
'use strict';

const program = require('commander');

let listFunction = (directory,options) => {\
  //some code here\
}

program\
  .version('0.0.1')\
  ...\
  .action(listFunction);

program.parse(process.argv);

We are going to cheat here by using the built-in *ls* command that's available in all unix-like operating systems.

#!/usr/bin/env node\
'use strict';

const program = require('commander'),\
      exec = require('child_process').exec;

let listFunction = (directory,options) => {\
const cmd = 'ls';\
let params = [];\
if (options.all) params.push('a');\
if (options.long) params.push('l');\
let fullCommand = params.length\
                  ? cmd + ' -' + params.join('')\
                  : cmd\
if (directory) fullCommand += ' ' + directory;

};

program\
  .version('0.0.1')\
  ...\
  .action(listFunction);

program.parse(process.argv);

Let's talk reason about this code.

1.  First, we require the *child_process* library to execute shell commands* (**this opens up a big security risk that I will discuss later*)
2.  We declare a constant variable that holds the root of our command
3.  We declare an array that will hold any parameters passed by the user (e.g. *-a*, *-l*)
4.  We check to see whether the user passed short-hand (-a) or long-hand ( --- all) flags. If so, then options.all and/or options.long will evaluate to *true*, in which case we will push the respective command flag to our array. Our goal is to build the shell command that we will pass later to child_process.
5.  We declare a new variable to hold the full shell command. If the param array contains any flags, we concatenate the flags to each other and to the root command. Otherwise, if param array is empty, then we use the root command as is.
6.  Finally, we check if user passed any optional directory values. If so, we concatenate it to the fully constructed command.

Now, we want to execute the fully constructed command in the shell. Child_Process.exec() gives us the ability to do so and [NodeJS docs](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) give us the signature:

child_process.exec(command, callback(error, stdout, stderr){\
  //"error" will be returned if exec encountered an error.\
  //"stdout" will be returned if exec is successful and data is returned.\
  //"stderr" will be returned if the shell command encountered an error.\
})

So, let's use this:

#!/usr/bin/env node\
'use strict';

const program = require('commander'),\
 exec = require('child_process').exec;

let listFunction = (directory,options) => {\
  const cmd = 'ls';\
  let params = [];\
  if (options.all) params.push('a');\
  if (options.long) params.push('l');\
  let fullCommand = params.length\
                  ? cmd + ' -' + params.join('')\
                  : cmd\
  if (directory) fullCommand += ' ' + directory;

 let execCallback = (error, stdout, stderr) => {\
    if (error) console.log("exec error: " + error);\
    if (stdout) console.log("Result: " + stdout);\
    if (stderr) console.log("shell error: " + stderr);\
  };

 exec(fullCommand, execCallback);

};

program\
  .version('0.0.1')\
  ...\
  .action(listFunction);

program.parse(process.argv);

That's it!

[Here is the gist of my sample CLI app](https://gist.github.com/pmbenjamin/3a57f2e0195ae2404c0a#file-index-js).

Of course, we can add a few niceties, like:

-   Coloring the output (I use the *chalk *library below)
-   Modern CLI apps are smart enough to show the help text when a user calls the program with no parameters or arguments (much like *git*), so I added that functionality at the very bottom.

#!/usr/bin/env node\
'use strict';\
/**\
 * Require dependencies\
 *\
 */\
const program = require('commander'),\
    chalk = require("chalk"),\
    exec = require('child_process').exec,\
    pkg = require('./package.json');

/**\
 * list function definition\
 *\
 */\
let list = (directory,options)  => {\
    const cmd = 'ls';\
    let params = [];

    if (options.all) params.push("a");\
    if (options.long) params.push("l");\
    let parameterizedCommand = params.length\
                                ? cmd + ' -' + params.join('')\
                                : cmd ;\
    if (directory) parameterizedCommand += ' ' + directory ;

    let output = (error, stdout, stderr) => {\
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);\
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);\
        if (stderr) console.log(chalk.red("Error: ") + stderr);\
    };

    exec(parameterizedCommand,output);

};

program\
    .version(pkg.version)\
    .command('list [directory]')\
    .option('-a, --all', 'List all')\
    .option('-l, --long','Long list format')\
    .action(list);

program.parse(process.argv);

// if program was called with no arguments, show help.\
if (program.args.length === 0) program.help();

Finally, we can take advantage of NPM to symbolic link our CLI application so we can use it globally in our system. Simply, in the terminal, *cd* into the root of our CLI app and type:

npm link

### Final thoughts & Considerations

The code in this project is by no means the best code. I am fully aware that there is always room for improvement, so feedback is welcome!

Also, I want to point out a security flaw in our app. Our code does not *sanitize* or *validate* the users' input. This violates security best practices. Consider the following scenarios where users can pass un-desired input:

$ cli-app -al ; rm -rf /\
$ cli-app -al ; :(){ :|: & };:

If you want to write some code that handles this issue, or fixes any other potential issues, be sure to show us your code by leaving a comment.

-   [JavaScript](https://medium.freecodecamp.org/tagged/javascript?source=post)
-   [Nodejs](https://medium.freecodecamp.org/tagged/nodejs?source=post)
-   [Linux](https://medium.freecodecamp.org/tagged/linux?source=post)
-   [Programming](https://medium.freecodecamp.org/tagged/programming?source=post)
-   [Technology](https://medium.freecodecamp.org/tagged/technology?source=post)
