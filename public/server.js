var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
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


 