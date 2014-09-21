/* *****************************
 ==== Configure Express
 */
var express = require('express');
var errorHandler = require('errorhandler');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(errorHandler({dumpExceptions: true}));

app.get("/", function (req, res) {
    res.redirect("/index.html");
});


/* *****************************
 ==== Create The Cylon Robot
 */

var cylonPi = require('./server/cylonpi.js');


/* *****************************
 ==== Start a Socket.IO Server
 */

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connect',function(socket){
    socket.on('connect',function(){
        console.log("Client Connected");
    });

    socket.on('setAngle', function(angle) {
        cylonPi.setAngle(angle);
    });
});

cylonPi.on('ready',function(data){
    io.emit('cylonPiReady',data);
});

// Start the t
cylonPi.initRobot();
http.listen(3000);