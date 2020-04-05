var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var bitsCount;
var activeTestCase = 0;
var data;
var dataA;
var dataB;
var dataC;
var dataD;
var position;
var askCount;
var loadedBits;

rl.on('line', function(line) {

  if (line === 'N') {
    exit();
  }

  // test case count
  if (!testCasesCount) {
    var numbers = line.split(' ');
    testCasesCount = parseInt(numbers[0], 10);
    bitsCount = parseInt(numbers[1], 10);
    activeTestCase++;
    startAsking();
    return;
  }

  if (line === 'Y') {
    activeTestCase++;
    if (activeTestCase > testCasesCount) {
      exit();
    } else {
      initTestCase();
      startAsking();
    }
  }

  processBit(line);
});

function startAsking() {
  askForBit();
}

function processBit(bit) {

  data[position] = bit;
  loadedBits++;

  if (loadedBits === bitsCount) {
    printResult(data.join(''));
  }

  if (askCount % 10 === 0) {

    // next one will be transformed

    dataA = data.slice();
    dataB = data.slice().reverse();
    dataC = complement(data);
    dataD = complement(data).reverse();

    oneGroups = new Array(bitsCount);
    zeroGroups = new Array(bitsCount);

    for (var i = 0; i < bitsCount; i++) {
      oneGroups[i] = {};
      zeroGroups[i] = {};
      if (dataA[i] === '1') {
        oneGroups[i]['A'] = true;
      } else {
        zeroGroups[i]['A'] = true;
      }
      if (dataB[i] === '1') {
        oneGroups[i]['B'] = true;
      } else {
        zeroGroups[i]['B'] = true;
      }
      if (dataC[i] === '1') {
        oneGroups[i]['C'] = true;
      } else {
        zeroGroups[i]['C'] = true;
      }
      if (dataD[i] === '1') {
        oneGroups[i]['D'] = true;
      } else {
        zeroGroups[i]['D'] = true;
      }
    }

    var positions = [];
    var group;
    var ones;
    var zeros;
    var oneGroup;
    var zeroGroup;

    for (var i = 0; i < bitsCount; i++) {

      if (group) {
        if (Object.keys(group).length === 1) {
          break;
        }
        oneGroup = intersect(group, oneGroups[i]);
        zeroGroup = intersect(group, zeroGroups[i]);
      } else {
        oneGroup = oneGroups[i];
        zeroGroup = zeroGroups[i];
      }

      ones = Object.keys(oneGroup).length;
      zeros = Object.keys(zeroGroup).length;

      if (ones > 0 && zeros > 0 && ones === zeros) {
        group = oneGroups[i];
        positions.push({
          index: i,
          value: '1',
        });
      } else {
        if (ones > 0 && ones < zeros) {
          group = oneGroups[i];
          positions.push({
            index: i,
            value: '1',
          });
        }
        if (zeros > 0 && zeros < ones) {
          group = zeroGroups[i];
          positions.push({
            index: i,
            value: '0',
          });
        }
      }
      
      for (var i = 0; i < bitsCount; i++) {
        positions
      }

      
    }

    // detect transformation
    // symetrical?
    // yes - do not care about reverse
    // no - load 
    askForBit(0);
  }

  askForBit();

}

function askForBit(pos) {
  askCount++;
  var newPosition = loadedBits % 2 ? bitsCount - Math.ceil(loadedBits / 2) : Math.floor(loadedBits / 2);
  position = pos !== undefined ? pos : newPosition;
  process.stdout.write(`${position + 1}\n`); // 1..B
}

function complement(data) {
  return data.map(bit => bit === '0' ? '1' : '0');
}

function initTestCase() {
  data = new Array(bitsCount);
  askCount = 0;
  loadedBits = 0;
}

function printResult(result) {
  process.stdout.write(`${result}\n`);
}
