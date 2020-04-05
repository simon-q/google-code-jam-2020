var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var fs = require('fs');

// input
var testCasesCount;
var bitsCount;
var activeTestCase = 0;
var data;
var position;
var askCount;
var loadedBits;
var positionsToCorrect;
var loadingCorrection;
var correction;


rl.on('line', function(line) {


  if (line === 'N') {
    process.exit();
  }

  // test case count
  if (!testCasesCount) {
    var numbers = line.split(' ');
    testCasesCount = parseInt(numbers[0], 10);
    bitsCount = parseInt(numbers[1], 10);
    activeTestCase++;
    initTestCase();
    startAsking();
    return;
  }

  if (line === 'Y') {
    activeTestCase++;
    if (activeTestCase > testCasesCount) {
      process.exit();
    } else {
      initTestCase();
      startAsking();
    }
    return;
  }

  processBit(line);
});

function startAsking() {
  askForBit();
}

function processBit(bit) {

  if (loadingCorrection) {
    correction[position] = bit;
  } else {
    data[position] = bit;
    loadedBits++;
    if (loadedBits === bitsCount) {
      printResult(data.join(''));
      return;
    }
  }

  // next one will be transformed
  if (askCount % 10 === 0) {

    calculatePositionsToCorrect();
  }

  if (correction && correction.length) {
    applyCorrection();
  }
  if (positionsToCorrect && positionsToCorrect.length) {
    loadingCorrection = true;
    askForBit(positionsToCorrect.pop());
  } else {
    loadingCorrection = false;
    askForBit();
  }
}

function askForBit(pos) {
  askCount++;

  var firstEmpty;
  var lastEmpty;
  for (var i = 0; i < bitsCount; i++) {
    if (data[i] === undefined) {
      firstEmpty = i;
      break;
    }
  }
  for (var i = bitsCount - 1; i >= 0; i--) {
    if (data[i] === undefined) {
      lastEmpty = i;
      break;
    }
  }
  var newPosition = firstEmpty < bitsCount - 1 - lastEmpty ? firstEmpty : lastEmpty;
  position = pos !== undefined ? pos : newPosition;


  process.stdout.write(`${position + 1}\n`); // 1..B
}

function calculatePositionsToCorrect() {
  var symmetricPair;
  var asymmetricPair;
  
  for (var i = 0; i < bitsCount; i++) {
    if (data[i] !== undefined && data[bitsCount - 1 - i] !== undefined && data[i] === data[bitsCount - 1 - i]) {
      symmetricPair = [i, bitsCount - 1 - i];
      break;
    }
  }
  for (var i = 0; i < bitsCount; i++) {
    if (data[i] !== undefined && data[bitsCount - 1 - i] !== undefined && data[i] !== data[bitsCount - 1 - i]) {
      asymmetricPair = [i, bitsCount - 1 - i];
      break;
    }
  }
  positionsToCorrect = (symmetricPair || []).concat(asymmetricPair || []);
  correction = new Array(bitsCount);
}

function applyCorrection() {
  var dataA = data.slice();
  var dataB = data.slice().reverse();
  var dataC = complement(data);
  var dataD = complement(data).reverse();
  var dataAOk = true;
  var dataBOk = true;
  var dataCOk = true;
  var dataDOk = true;
  for (var i = 0; i < correction.length; i++) {
    if (correction[i] !== undefined) {
      if (correction[i] !== dataA[i]) {
        dataAOk = false;
      }
      if (correction[i] !== dataB[i]) {
        dataBOk = false;
      }
      if (correction[i] !== dataC[i]) {
        dataCOk = false;
      }
      if (correction[i] !== dataD[i]) {
        dataDOk = false;
      }
    }
  }
  if (!positionsToCorrect.length || [dataAOk, dataBOk, dataCOk, dataDOk].filter(x => x).length === 1) {
    if (dataAOk) {
      data = dataA;
    }
    if (dataBOk) {
      data = dataB;
    }
    if (dataCOk) {
      data = dataC;
    }
    if (dataDOk) {
      data = dataD;
    }
    positionsToCorrect = null;
    correction = null;
  }
}

function complement(data) {
  return data.map(bit => bit === '0' ? '1' : '0');
}

function initTestCase() {
  data = new Array(bitsCount);
  askCount = 0;
  loadedBits = 0;
  loadingCorrection = false;
}

function printResult(result) {
  process.stdout.write(`${result}\n`);
}
