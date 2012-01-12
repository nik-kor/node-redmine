var http = require('http');
var crypto = require('crypto');
var util = require('util');
var url = require('url');
var querystring = require('querystring');
var util = require('util');

/**
 *  Redmine
 */
function Redmine(config) {
  this.setApiKey(config.apiKey);
  this.setHost(config.host);
}

Redmine.prototype.version = '0.1.0';

Redmine.prototype.setApiKey = function(key) {
  this.apiKey = key;
};

Redmine.prototype.getApiKey = function() {
  return this.apiKey;
};

Redmine.prototype.setHost = function(host) {
  this.host = host;
};

Redmine.prototype.getHost = function() {
  return this.host;
};

Redmine.prototype.generatePath = function(path, params) {
  if (path.slice(0, 1) != '/') {
    path = '/' + path;
  }
  return path + '?' + querystring.stringify(params);
};

Redmine.prototype.request = function(method, path, params, callback) {
  var options = {
    host: this.getHost(),
    path: method == 'GET' ? this.generatePath(path, params) : path,
    method: method,
    headers: {
      'X-Redmine-API-Key': this.getApiKey()
    }
  };

  var req = http.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));

    if (res.statusCode != 200 && res.statusCode != 201) {
      callback({message: 'Server returns stats code: ' + res.statusCode, response: res}, null);
      callback = null;
      return ;
    }

    var body = "";
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function(e) {
      callback(null, body);
      callback = null;
    });
  });

  req.on('error', function(err) {
    callback(err, null);
    callback = null;
  });

  if (method != 'GET') {
    var body = JSON.stringify(params);
    req.setHeader('Content-Length', body.length);
    req.setHeader('Content-Type', 'application/json');
    req.write(body);
  }
  req.end();
};

/**
 *  crud apis
 */
Redmine.prototype.getIssues = function(params, callback) {
  this.request('GET', '/issues.json', params, callback);
};

Redmine.prototype.postIssue = function(params, callback) {
  this.request('POST', '/issues.json', {issue: params}, callback);
};

Redmine.prototype.updateIssue = function(id, params, callback) {
  this.request('PUT', '/issues/' + id + '.json', {issue: params}, callback);
};

Redmine.prototype.deleteIssue = function(id, callback) {
  this.request('DELETE', '/issues/' + id + '.json', {}, callback);
};


/*
 * Exports
 */
module.exports = Redmine;