const times = require('lodash.times');

module.exports = function constructSchedule(options) {
  var schedule = [];
  var totalSets = options.setCount - (options.completedSets || 0);

  times(totalSets, (index) => {
    schedule.push({
      duration: options.workDuration,
      type: 'work'
    });
    schedule.push({
      duration: ((index + 1) >= totalSets) ? options.longBreakDuration : options.shortBreakDuration,
      type: 'break'
    });
  });

  return schedule;
};
