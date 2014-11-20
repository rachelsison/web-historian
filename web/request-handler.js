var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http-request');
var results = {};
var index = 0;


paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.method);
  console.log(httpHelp.headers);
  var statusCode = 200;
  res.writeHead(statusCode, httpHelp.headers)
  res.end(archive.paths.list);
};

exports.home = function(req, res){
  var fullPath = './public/index.html';


  fs.readFile(fullPath, function(err, contents){
    if(!err){
      res.writeHead(200, httpHelp.headers);
      res.end(contents);
    } else {
      res.end(err);
    }
  });
};


exports.submit = function(req, res){
  var loadPath = './public/loading.html';
  var body = '';
  if (req.method === "POST"){
    req.on('data',function(chunk){
      body += chunk;
    });
    req.on('end', function() {
      var websiteName = querystring.parse(body)['url'];
      if (!archive.isUrlInList(websiteName)){
        archive.addUrlToList(websiteName);
        results[websiteName] = index++;
        //set cron to download website from text file
      } else {
        if (archive.isURLArchived(websiteName)){
          fs.readFile(path.join(paths.archivedSites, websiteName), function(err, data){
            if(err){
              res.end(err);
            } else {
              res.writeHead(201, httpHelp.headers);
              res.end(contents);
            }
          });
        } else {
          //load loading page
          fs.readFile(loadPath, function(err, data){
            if (err) {
              res.end(err);
            } else {
              res.writeHead(201, httpHelp.headers);
              res.end(data);
            }
          });
        }
      }
    });
    fs.readFile(loadPath, function(err, data){
      if (err) {
        res.end(err);
      } else {
        res.writeHead(201, httpHelp.headers);
        res.end(data);
      }
    });
  }
};




//get query url string

//if query is in text file
  //if html has been archived
    //return/go to webpage

//else append query to text file


  //??
  //cron will check text file and get all html address and put in archive folder















