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
  cells = [{
    x: 0,
    y: 0,
    path: '',
    count: 0,
  }];

  while (cells.length) {
    makeStep();
    if (found) {
      return;
    }
  }
  
  if (!found) {
    printResult('IMPOSSIBLE');
  }
}

function makeStep() {
  var cell = cells.shift();
  
  var currX = cell.x;
  var currY = cell.y;

  if (found) {
    return;
  }
  // console.log(cell.path);

  if (currX === x && currY === y) {
    printResult(cell.path);
    found = true;
    return;
  }

  var step = Math.pow(2, cell.count);
  // var prevStep = Math.pow(2, count - 1);

  // if (Math.abs(x - currX) < step / 2 || Math.abs(y - currY) < step / 4 ) {
  //   return;
  // }
  if (step > Math.pow(10, 9)) {
    return;
  }

  if (Math.abs(y - currY) >= step) {
    cells.push({
      x: currX,
      y: currY + step,
      count: cell.count + 1,
      path: cell.path + 'N',
    });
  }
  if (Math.abs(y - currY) >= step) {
    cells.push({
      x: currX,
      y: currY - step,
      count: cell.count + 1,
      path: cell.path + 'S',
    });
  }
  if (Math.abs(x - currX) >= step) {
    cells.push({
      x: currX + step,
      y: currY,
      count: cell.count + 1,
      path: cell.path + 'E',
    });
  }
  if (Math.abs(x - currX) >= step) {
    cells.push({
      x: currX - step,
      y: currY,
      count: cell.count + 1,
      path: cell.path + 'W',
    });
  }
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
