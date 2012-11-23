var Redmine = require('../lib/redmine');

var config = {
  host:   process.env.TEST_REDMINE_HOST,
  apiKey: process.env.TEST_REDMINE_APIKEY
};

var redmine = new Redmine(config);

redmine.getTimeEntries({project_id: 1}, function(err, data) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }

  console.log("Time entries:");
  console.log(data);
});



redmine.postTimeEntry({time_entry: {project_id: "test", hours: 20, activity_id: 9}}, function(err, data) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }


  console.log("post time entry:");
  console.log(data);


});





/*// get issue*/
//redmine.getIssues({project_id: 1}, function(err, data) {
  //if (err) {
    //console.log("Error: " + err.message);
    //return;
  //}

  //console.log("Issues:");
  //console.log(data);
/*});*/


return;

console.log('Iam dying');




// create issue
var issue = {
  project_id: 1,
  subject: "This is test issue on " + Date.now(),
  description: "Test issue description"
};
redmine.postIssue(issue, function(err, data) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }

  console.log(data);
});


// update issue
var issueId = 4; // exist id
var issueUpdate = {
  notes: "this is comment"
};
redmine.updateIssue(issueId, issueUpdate, function(err, data) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }

  console.log(data);
});

// delte issue
var issueId = 4;
redmine.deleteIssue(issueId, function(err, data) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }

  console.log(data);
});
