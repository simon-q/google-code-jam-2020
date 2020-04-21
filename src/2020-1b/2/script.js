var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var activeTestCase = 0;
var r;
var s;
var found;
var cells;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // test case
  activeTestCase++;
  var numbers = line.split(' ');
  r = parseInt(numbers[0], 10);
  s = parseInt(numbers[1], 10);

  solve();
});

function solve() {
  var count = 0;
  for (var i = 0; i < s; i ++) {
    
    process.stdout.write(
      `Case #${activeTestCase}: ${result}\n`
    );
  }
  printResult(count);
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
