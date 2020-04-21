var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var activeTestCase = 0;
var rowsCount;
var columnsCount;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // test case
  activeTestCase++;
  var numbers = line.split(' ');
  rowsCount = parseInt(numbers[0], 10);
  columnsCount = parseInt(numbers[1], 10);

  solve();
});

function solve () {
  if (
    rowsCount < 2
    || columnsCount < 2
    || (rowsCount === 2 && columnsCount < 5)
    || (columnsCount === 2 && rowsCount < 5)
    || (rowsCount < 4 && columnsCount < 4)
  ) {
    printResult('IMPOSSIBLE');
    return;
  } else {
    printResult('POSSIBLE');
  }

  const larger = Math.max(rowsCount, columnsCount);
  const smaller = Math.min(rowsCount, columnsCount);
  var step = 2;
  if (columnsCount === 2 || rowsCount === 2) {
    step = 3;
  }

  for (var i = 1; i <= larger; i++) {
    for (var j = 1; j <= smaller; j++) {
      var c = j % 2 ? i : ((i + step - 1) % larger) + 1;
      if (rowsCount <= columnsCount) {
        process.stdout.write(`${j} ${c}\n`);
      } else {
        process.stdout.write(`${c} ${j}\n`);
      }
    }
  }
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
