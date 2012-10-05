var path = require('path');
var assert = require('assert');
var util = require('util');

var basedir = path.join(__dirname, '..');
var libdir = path.join(basedir, 'lib');

var Redmine = require(path.join(libdir, 'redmine.js'));

assert.ok('TEST_REDMINE_APIKEY' in process.env);
assert.ok('TEST_REDMINE_HOST' in process.env);

var config = {
  host:   process.env.TEST_REDMINE_HOST,
  apiKey: process.env.TEST_REDMINE_APIKEY
};

var redmine = new Redmine(config);


module.exports = {
  'List time entries': function(beforeExit, assert)
  {
    redmine.getTimeEntries({project_id: 1, limit: 2}, function(err, data) {
      assert.isNull(err, 'Err is null');
      assert.equal(data.limit, 2);
    });
  },
  'Show a time entry': function(beforeExit, assert)
  {
    redmine.getTimeEntry(1, function(err, data) {
      assert.isNull(err, 'Err is null');
      assert.type(data.time_entry, 'object', 'Data time entry is an object');

      var timeEntry = data.time_entry;
      assert.equal(1, timeEntry.id);
      assert.equal('1', timeEntry.issue.id);
      assert.equal('TimeEntry1', timeEntry.comments);
    });
  }
}
