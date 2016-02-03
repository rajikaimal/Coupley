var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
<<<<<<< HEAD
var redis = require('redis');

server.listen(8890);
io.on('connection', function (socket) {

  console.log("new client connected");
  var redisClient = redis.createClient();
  redisClient.subscribe('message');

  redisClient.on("message", function(channel, message) {
    console.log("mew message in queue "+ message + "channel");
    socket.emit(channel, message);
  });

  socket.on('disconnect', function() {
    redisClient.quit();
  });

});
=======
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Coupley'
});
 
connection.connect();

server.listen(8081);

io.on('connection', function (socket) {
  console.log('Client Connected !');

  socket.on('message', function (chat) {
    console.log(chat);
    post = {
      user1: 'rajika',
      user2: 'tiffany',
      message: chat.message
    };
    connection.query('INSERT INTO chats SET ?', post, function(err, result) {
      connection.query('SELECT message from chats', function(err, result) {
        socket.emit('chat', { message: result });
      });
    });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


 
>>>>>>> fe96c6a1edcdc7229e65212d5143fd2fb7f72b4a
