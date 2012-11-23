var Redmine = require('../lib/redmine');

var config = {
  host:   process.env.TEST_REDMINE_HOST,
  apiKey: process.env.TEST_REDMINE_APIKEY
};

var redmine = new Redmine(config);



redmine.getProjects({}, function(err, data) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }

  console.log(data);
});
