var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var activeTestCase = 0;
var n;
var k;

/*
does not finish in time for:
20 123
9 10
*/

// matrix
var matrix;
var columnsAvailableNumbers;
var rowsAvailableNumbers;
var emptyCellsCount;
var emptyCells;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // test case
  activeTestCase++;
  var numbers = line.split(' ');
  n = parseInt(numbers[0], 10);
  k = parseInt(numbers[1], 10);

  generateMatrix();
});

function generateMatrix() {

  diagonal = new Array(n);
  matrix = new Array(n);
  columnsAvailableNumbers = new Array(n);
  rowsAvailableNumbers = new Array(n);
  emptyCells = {};
  for (var i = 0; i < n; i++) {
    matrix[i] = new Array(n);
    columnsAvailableNumbers[i] = getAvailableNumbers();
    rowsAvailableNumbers[i] = getAvailableNumbers();
    emptyCells[i] = {};
    for (var j = 0; j < n; j++) {
      emptyCells[i][j] = true;
    }
  }
  emptyCellsCount = n * n;
  
  try {
    generateDiagonal(n, k);
    printResult('IMPOSSIBLE');
  } catch(e) {
    if (e === 'interrupt') {
      printResult('POSSIBLE');
      printMatrix();
    } else {
      throw e;
    }
  }
}

function generateCell(rowIndex, columnIndex) {

  if (rowIndex < 0 || columnIndex < 0 || rowIndex >= n || columnIndex >= n) {
    return;
  }

  var nextRowIndex = rowIndex + 1;
  var nextColumnIndex = columnIndex;
  if (nextRowIndex === n) {
    nextRowIndex = 0;
    nextColumnIndex++;
  }
  // var rand;
  // var rowsWithEmptyCells = Object.keys(emptyCells);
  // rand = Math.floor(Math.random() * rowsWithEmptyCells.length);
  // var nextRowIndex = rowsWithEmptyCells[rand];
  // var columnWithEmptyCells = Object.keys(emptyCells[nextRowIndex]);
  // rand = Math.floor(Math.random() * columnWithEmptyCells.length);
  // var nextColumnIndex = columnWithEmptyCells[rand];

  if (matrix[rowIndex][columnIndex]) {
    generateCell(nextRowIndex, nextColumnIndex);
    return;
  }

  for (var value = 1; value <= n; value++) {
    if (rowsAvailableNumbers[rowIndex][value] && columnsAvailableNumbers[columnIndex][value]) {
      setMatrixValue(rowIndex, columnIndex, value);
      if (emptyCellsCount === 0) {
        throw('interrupt');
      } else {
        generateCell(nextRowIndex, nextColumnIndex);
      }
      removeMatrixValue(rowIndex, columnIndex, value);
    }
  }
}

function getAvailableNumbers() {
  var available = {};
  for (var i = 1; i <= n; i++) {
    available[i] = true;
  }
  return available;
}

function getMin(count, sum) {
  var m = sum - (n * (count - 1));
  
  if (m <= 0) {
    m = 1;
  }
  return m;
}

function generateDiagonal(remainingCount, remainingSum) {
  
  if (remainingSum <= 0) {
    return;
  }

  var min = getMin(remainingCount, remainingSum);
  var index = n - remainingCount;

  if (remainingCount === 1) {
    
    setMatrixValue(index, index, min);
    generateCell(0, 0);
    removeMatrixValue(index, index, min);
  } else {

    for (var value = min; value <= n; value++) {
      // var randValue = min + Math.floor(Math.random() * (n - min));
      setMatrixValue(index, index, value);
      generateDiagonal(remainingCount - 1, remainingSum - value);
      removeMatrixValue(index, index, value);
    }
  }
}

function setMatrixValue(rowIndex, columnIndex, value) {
  matrix[rowIndex][columnIndex] = value;
  emptyCellsCount--;
  rowsAvailableNumbers[rowIndex][value] = false;
  columnsAvailableNumbers[columnIndex][value] = false;
  delete emptyCells[rowIndex][columnIndex];
  if (!Object.keys(emptyCells[rowIndex])) {
    delete emptyCells[rowIndex];
  }
}

function removeMatrixValue(rowIndex, columnIndex, value) {
  matrix[rowIndex][columnIndex] = null;
  emptyCellsCount++;
  rowsAvailableNumbers[rowIndex][value] = true;
  columnsAvailableNumbers[columnIndex][value] = true;
  if (!Object.keys(emptyCells[rowIndex])) {
    emptyCells[rowIndex] = {};
  }
  emptyCells[rowIndex][columnIndex] = true;
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}

function printMatrix() {
  matrix.forEach(row => {
    process.stdout.write(`${row.join(' ')}\n`);
  });
}
