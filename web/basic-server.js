var http = require("http");
var handler = require("./request-handler");
var httpHelp = require('./http-helpers');


var url = require("url");
var routeMap = {
  "/home": handler.home,
  "/submit": handler.submit,

}

var port = 8080;
var ip = "127.0.0.1";


var server = http.createServer(function(req, res){
  var pathname = url.parse(req.url)['pathname'];
  var route = routeMap[pathname];
  if (route) {
    route(req, res);
  } else {
    res.writeHead(404, httpHelp.headers );
    res.end('NOT FOUND');
  }
});


console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

