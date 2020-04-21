var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// input
var testCasesCount;
var activeTestCase = 0;

// test case
var rowsCount;
var activeRow
var words;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // test case start
  if (!rowsCount) {
    activeTestCase++;
    rowsCount = parseInt(line, 10);
    activeRow = 0;
    words = [];
    return;
  }

  activeRow++;
  words.push(Array.from(line).reverse().join(''));
  if (activeRow === rowsCount) {
    solve();
    rowsCount = null;
  }
});

function solve () {
  words.sort();
  // console.log(words);
  var hasPairs = words.length > 1;
  var resultCount = 0;
  var level = 0;
  var suffixTree = createVertex();
  var previousVertex;
  var currentVertex = suffixTree;
  var firstWord;

  // words.forEach(word => {
  //   suffixTree.words[word] = true;
  // });

  // make tree
  while (hasPairs) {
    hasPairs = false;

    words.forEach(word => {

      if (level > 0) {
        currentVertex = previousVertex[word[level - 1]];
      }
      if (!currentVertex) {
        return;
      }

      var letter = word[level];
      if (!letter) {
        return;
      }

      if (!currentVertex[letter]) {
        currentVertex[letter] = createVertex();
      }

      currentVertex[letter].words[word] = true;

      if (Object.keys(currentVertex[letter].words).length === 1) {
        firstWord = word;
      }

      if (Object.keys(currentVertex[letter].words).length > 1) {
        delete currentVertex.words[word];
        if (firstWord) {
          delete currentVertex.words[firstWord];
        }
        hasPairs = true;
      }
    });
    previousVertex = currentVertex;
    level++;
    // console.log(JSON.stringify(suffixTree));
  }
  // console.log(JSON.stringify(suffixTree));
  
  // return;

  // count pairs
  var vertices = [suffixTree];
  while (vertices.length) {
    // console.log(vertices);
    var newVertices = [];
    vertices.forEach(vertex => {
      var wordCount = Object.keys(vertex.words).length;
      if (wordCount > 1) {
        resultCount++;
      }
      if (wordCount !== 1) {
        delete vertex.words;
        newVertices = newVertices.concat(Object.values(vertex));
        return;
      }
    });
    vertices = newVertices;
  }

  printResult(resultCount * 2);
}

function createVertex() {
  return {
    words: {},
    // vertices: {},
  }
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
