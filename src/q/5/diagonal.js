var n = 3;
var k = 9;
var diagonal = new Array(n);

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

  if (remainingCount === 1) {
    diagonal[n - remainingCount] = min;
    console.log(diagonal);
  } else {
    for (var i = min; i <= n; i++) {
      diagonal[n - remainingCount] = i;
      generateDiagonal(remainingCount - 1, remainingSum - i);
    }
  }
}

generateDiagonal(n, k);
