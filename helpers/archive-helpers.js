var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var list;
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err) throw err;
    list = data.split('\n');
    return callback(list);
  })
};

exports.isUrlInList = function(url){

  var check = function(list){
    console.log(typeof list, list);
    if (_.indexOf(list, url) === -1) {
      console.log('got here', 'false');
      return false;
    } else {
      console.log('got here too', 'true');
      return true;
    }
  }

  return exports.readListOfUrls(check);
};

exports.addUrlToList = function(url){
  //only add URL to list AFTER filename is added to archive
  fs.appendFile(exports.paths.list, url+'\n', function (err) {
    if (err) throw err;
    console.log('The url: ' + url + ' was appended to file!');
});

};

exports.isURLArchived = function(url){
  fs.readFile(path.join(exports.paths.archivedSites,url), 'utf8', function(err, data){
    if (err) {
      return false;
    }
    return true;
  });
};

exports.downloadUrls = function(url){
  //MAGIC*~*~*~*~
  var newFileName = path.join(exports.paths.archivedSites,url);
  http.get(url, newFileName, function (err, res) {
    if (err) {
      return err;
    }
    console.log(res.code, res.headers, res.file);
  });
  return newFileName;
}


