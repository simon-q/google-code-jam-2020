var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var n;
var activeTestCase = 0;

// matrix
var rowsWithRepeatedNumberCount;
var hasColumnRepeatedNumbers;
var columnNumberSets;
var rowIndex;
var trace;

initMatrix();

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // matrix size
  if (!n) {
    activeTestCase++;
    n = parseInt(line, 10);
    initMatrix();
    return;
  }

  // matrix line
  var cells = line.split(' ');

  processCells(cells);

  rowIndex++;

  if (n === rowIndex) {
    printResults();
    n = null;
  }
});

function initMatrix() {
  hasColumnRepeatedNumbers = {};
  columnNumberSets = {};
  rowIndex = 0;
  rowsWithRepeatedNumberCount = 0;
  trace = 0;
}

function processCells(cells) {
  var rowNumberRepeated = false;
  var rowNumberSet = {};

  cells.forEach((value, columnIndex) => {
      
    // check row
    if (!rowNumberRepeated) {
      if (!rowNumberSet[value]) {
        rowNumberSet[value] = true;
      } else {
        rowNumberRepeated = true;
      }
    }
    
    // check column
    if (!columnNumberSets[columnIndex]) {
      columnNumberSets[columnIndex] = {};
    }
    if (!hasColumnRepeatedNumbers[columnIndex]) {
      if (!columnNumberSets[columnIndex][value]) {
        columnNumberSets[columnIndex][value] = true;
      } else {
        hasColumnRepeatedNumbers[columnIndex] = true;
      }
    }

    // add to trace
    if (columnIndex === rowIndex) {
      trace += parseInt(value, 10);
    }
  });

  if (rowNumberRepeated) {
    rowsWithRepeatedNumberCount++;
  }
}

function printResults() {
  process.stdout.write(
    `Case #${activeTestCase}: ${trace} ${rowsWithRepeatedNumberCount} ${Object.keys(hasColumnRepeatedNumbers).length}\n`
  );
}
