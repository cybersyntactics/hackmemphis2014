/* *****************************
 ==== Configure Express
 */
var express = require('express');
var errorHandler = require('errorhandler');
var app = express();
var util = require('util');
var cylonPi = require('./server/cylonpi.js');
var sP = require('./server/serviceProvider.js')
var cW = require("./server/cylonWatcher.js");

var serviceProvider = new sP('https://api.twitter.com/oauth/request_token', // requrest_token_url
							 'https://api.twitter.com/oauth/access_token', // access_token_url
							 '', // application consumer key
							 '', // application consume secret
							 'https://api.twitter.com/1.1/search/tweets.json?src=typd&q=%23hackmemphis&result_type=recent&count=100', // api request url
							 '', // user token
							 ''); // user secret


var watcher = new cW(serviceProvider);

app.use(express.static(__dirname + '/public'));
app.use(errorHandler({dumpExceptions: true}));

app.get("/", function (req, res) {
    res.redirect("/index.html");
});


/* *****************************
 ==== Start a Socket.IO Server
 */

console.log(serviceProvider);

var http = require('http').Server(app);
var io = require('socket.io')(http);

var decayTimer, countRegen;

io.on('connect',function(socket){
    socket.on('connect',function(){
        console.log("Client Connected");
    });

    socket.on('monitorHashtag', function(hastag) {
        countRegen = setInterval(function() {
        	watcher.watch('https://api.twitter.com/1.1/search/tweets.json?src=typd&q=%23' + hastag + '&result_type=recent&count=100', "statuses", 100, true, function(datum) {
				return (new Date(datum.created_at)).getTime() > Date.now() - 7200000; /* 2 hours in milliseconds*/
        	});
        },5000); // rate limit 180 request per 15 minutes
    });

    socket.on('clearHashtag', function(hashtag) {
    	if(countRegen) clearInterval(countRegen);
    	if(decayTimer) clearInterval(decayTimer);
    	cylonPi.setAngle(31);
    })
});

cylonPi.on('ready',function(data){
    io.emit('cylonPiReady',data);
});

// Start the t
cylonPi.initRobot();
http.listen(3000);