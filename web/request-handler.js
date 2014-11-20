var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http-request');
var results = {};

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
      // archive.readListOfUrls();
      archive.isUrlInList('www.google.com');


      //archive.downloadUrls(websiteName);




    //   if (!results[websiteName]) {
    //     results[websiteName] = websiteName;//placeholder: to change to a function to get website;
    //     var stringObj = JSON.stringify(results);
    //   }

    //   //this is where we start process of fetching html + saving it somewhere

    //   fs.writeFile('../test/testdata/sites.txt', stringObj, function(err){
    //     if(err){
    //       alert(err);
    //     }
    //   });
     })
  //}
  fs.readFile(loadPath, function(err, data){
    if (!err) {
      res.writeHead(201, httpHelp.headers);
      res.end(data);
    } else {
      res.end(err);
    }
  });
}
}




//get query url string

//if query is in text file
  //if html has been archived
    //return/go to webpage

//else append query to text file


  //??
  //cron will check text file and get all html address and put in archive folder















