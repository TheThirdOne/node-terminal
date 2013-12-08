var readline = require('readline'),
rl = readline.createInterface(process.stdin, process.stdout);
var callbacks = [],functions = {};
functions.wait=wait;
functions.hello=function(){console.log('world');cont()};
rl.setPrompt('Prompt> ');
rl.prompt();
rl.on('line', function(line) { //All the magic starts here
    loop(line);
}).on('close', function() {
    console.log('\nHave a great day!');
    process.exit(0);
});
function cont(){ //here if i need to edit later
    rl.prompt();
}
function wait(){ //wait function loops Wainting ..........
  var i = 0,inter;  // dots counter
  inter = setInterval(function() {
	process.stdout.clearLine();  // clear current text
	process.stdout.cursorTo(0);  // move cursor to beginning of line
	i = (i + 1) % 10;
	var dots = new Array(i + 1).join(".");
	process.stdout.write("Waiting" + dots);  // write text
    }, 300);
  callbacks.push(function(){clearInterval(inter);console.log('')});
  process.stdin.on('data',interrupt);
}
function interrupt(key){ //interrupt listener: allows looping functions to quit
  process.stdin.removeListener('data',interrupt);
  for(var i = 0;i<callbacks.length;i++)
    callbacks[i]();
  callbacks = [];
  cont();
}
function loop(line){ //main loop
  if(functions[line.split(' ')[0]])
    functions[line.split(' ')[0]](line);
  else{
    console.log('Invalid Command');
    cont();
  }
}
rl.on('SIGINT', function() { //fancy ^-C support
    rl.question('Are you sure you want to exit?', function(answer) {
	if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});