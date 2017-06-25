var cron = require('node-cron');
 
cron.schedule('* * * * * *', function() {
  console.log('running on Sundays of January and September');
});
