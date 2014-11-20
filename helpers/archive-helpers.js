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

exports.readListOfUrls = function(){
  fs.readFile(exports.paths.list, function(err, data){
    var list = '';
    list += data;
    console.log(list);
    return list;
    if (err) throw err;
  })
};

exports.isUrlInList = function(url){
  var list = exports.readListOfUrls();
  var listArray = list.split('\n');
  if (_.indexOf(listArray, url) === -1) {
    return false;
  } else {
    return true;
  }
};

exports.addUrlToList = function(newUrl){
  var list = readListOfUrls();
  var downloadSucceed = downloadUrls();
  if(downloadSucceed !== false){
    list[newUrl]= downloadSucceed;
  }
};

exports.isURLArchived = function(url){
  var list = readListOfUrls();
  if(list.url){
    return true;
  }return false;
};

exports.downloadUrls = function(url){
  //MAGIC*~*~*~*~
  var newFileName = "../archives/sites/" + url.toString();
  http.get(url, newFileName, function (err, res) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(res.code, res.headers, res.file);
});
  return newFileName;
}


