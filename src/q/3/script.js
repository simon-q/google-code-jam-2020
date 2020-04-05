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
var rowIndex;

// activities
var assignedActivities;
var activities;
var availableParents;

rl.on('line', function(line) {

  // test case count
  if (!testCasesCount) {
    testCasesCount = parseInt(line, 10);
    return;
  }

  // count of activities
  if (!n) {
    activeTestCase++;
    n = parseInt(line, 10);
    initTestCase();
    return;
  }

  // activity
  processActivity(line);

  rowIndex++;
  
  if (n === rowIndex) {
    printResult(findSchedule());
    n = null;
  }
});

function initTestCase() {
  activities = [];
  assignedActivities = {};
  rowIndex = 0;
  availableParents = ['C', 'J'];
}

function processActivity(line) {
  var times = line.split(' ');
  activities.push({
    start: parseInt(times[0], 10),
    end: parseInt(times[1], 10),
  });
}

function findSchedule() {

  activitiesTemp = activities.slice();
  activitiesTemp.sort((a, b) => a.start - b.start);

  for (var i = 0; i < activitiesTemp.length; i++) {
    var newActivity = activitiesTemp[i];
    
    // clear finished activities
    Object.keys(assignedActivities).forEach(parent => {
      if (newActivity.start >= assignedActivities[parent].end) {
        delete assignedActivities[parent];
        availableParents.push(parent);
      }
    });

    if (!availableParents.length) {
      return 'IMPOSSIBLE';
    }

    parent = availableParents.shift();

    assignedActivities[parent] = newActivity;
    newActivity.parent = parent;
  };

  var schedule = activities.reduce((acc, activity) => {
    return acc + activity.parent;
  }, '');

  return schedule;
}

function printResult(result) {
  process.stdout.write(
    `Case #${activeTestCase}: ${result}\n`
  );
}
