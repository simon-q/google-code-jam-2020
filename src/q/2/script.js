var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var activeTestCase = 0;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  activeTestCase++;
  printResult(processLine(line));
});

function processLine(line) {
  var newLine = '';
  var previousNumber = 0;

  Array.from(line).forEach(digit => {
    var number = parseInt(digit, 10);
    var diff =  number - previousNumber;
    var char = diff > 0 ? '(' : ')';
    newLine += new Array(Math.abs(diff) + 1).join(char);
    newLine += digit;
    previousNumber = number;
  });
  // closing ')'
  newLine += new Array(previousNumber + 1).join(')');

  return newLine;
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
