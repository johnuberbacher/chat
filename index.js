//-----------------------------------------------------------------------------
// Configure Express.
//-----------------------------------------------------------------------------

// Set up Express Server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Handle Client side files
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Starts server with port 3000
server.listen(process.env.PORT || 3000, function() {
  console.log('Server listening');
});

//-----------------------------------------------------------------------------
// Routes.
//-----------------------------------------------------------------------------
app.get("/", function(req, res) {
    res.render("chat");
});

//-----------------------------------------------------------------------------
// Configure web sockets.
//-----------------------------------------------------------------------------
io.sockets.on("connection", function(socket) {

    socket.on("chat-message", function(message, username) {
        io.sockets.emit("chat-message", message, username);
    });

});
