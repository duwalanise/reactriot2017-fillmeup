let CronJob = require('cron').CronJob;

new CronJob('* * * * * *', () => {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
