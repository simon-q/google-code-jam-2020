var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var activeTestCase = 0;
var x;
var y;
var found;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // test case
  activeTestCase++;
  var numbers = line.split(' ');
  x = parseInt(numbers[0], 10);
  y = parseInt(numbers[1], 10);

  if (x == 0 && y == 0) {
    printResult('IMPOSSIBLE');
    return;
  }

  if (x % 2 && y % 2) {
    printResult('IMPOSSIBLE');
    return;
  }

  solve();
});

function solve() {
  found = false;
  
  makeStep([0, 0], 0, '');
  if (!found) {
    printResult('IMPOSSIBLE');
  }
  return;
}

function makeStep(cell, count, path) {
  var currX = cell[0];
  var currY = cell[1];

  if (found) {
    return;
  }

  if (currX === x && currY === y) {
    printResult(path);
    found = true;
    return;
  }

  var step = Math.pow(2, count);
  // var prevStep = Math.pow(2, count - 1);

  if (math.abs(x - currX) < step || math.abs(y - currY) < step) {
    return;
  }

  makeStep([currX, currY + step], count + 1, path + 'N');
  makeStep([currX, currY - step], count + 1, path + 'S');
  makeStep([currX + step, currY], count + 1, path + 'E');
  makeStep([currX - step, currY], count + 1, path + 'W');
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
