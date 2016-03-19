var app = require('express')();    /*  Require express module  */
var server = require('http').Server(app);   /*  Require HTTP module and create server */
var io = require('socket.io')(server);    /*  Require Socket module */
var mysql      = require('mysql');      /*  Require HTTP module and create server */
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Coupley',
});
var connectedUser = {};
var Likedusers = [];

connection.connect();

/*  listen to port 8081 */
server.listen(8081);

/*
 Retrive data when a client connect.
 **/
io.on('connection', function (socket) {

  /*
   Retrive loged user information.
   **/
  socket.on('LoggedUser', function (data) {

    if ((data != null)) {

      socket.username = data;
      connectedUser[socket.username] = socket.id;

      connection.query("UPDATE users SET chatstatus='online' WHERE username='" + socket.username + "' ", function (err, result) {
        console.log(socket.username + ' Connected!');
      });

    }else {

    }
  });
  /*
   Throws exception when error occured.
   **/
  socket.on('error', function () {
      throw new Error('Error occured!');
    });
  /*
     Gets the emitted chat message.
     **/
  socket.on('message', function (chat) {

    post = {
      user1_un: chat.user1,
      user2_un: chat.user2,
      message: chat.message,
      threadid:'',
    };

    connection.query("SELECT trd_id FROM threads WHERE user1_un IN ('" + post.user1_un + "','" + post.user2_un + "') AND user2_un IN ('" + post.user1_un  + "','" + post.user2_un + "') ", function (err, result) {
      post.threadid = result;
      if (result == '') {
        connection.query("INSERT INTO treads (user1_un,user2_un) VALUES('" + post.user1 + "','" + post.user2 + "')", function (err, result) {
          connection.query("SELECT trd_id FROM threads  WHERE user1_un IN ('" + post.user1 + "','" + post.user2 + "') AND user2_un IN ('" + post.user1 + "','" + post.user2 + "') ", function (err, result) {
            post.threadid = result; });
        });
      }
    });

    connection.query("INSERT INTO messages(message,sender_un,thread_id) VALUES ('" + post.message + "','" + post.user1_un + "','" + post.threadid + "')", function (err, result) {
      connection.query("SELECT m.message,(SELECT u.firstname FROM users u WHERE u.username=m.sender_un),m.created_at,m.thread_id FROM messages m WHERE m.thread_id='" + post.threadid + "' ", function (err, result) {

        io.sockets.connected[connectedUser[chat.user1]].emit('chat', { message:result });

        if (chat.user2 in connectedUser) {
          io.sockets.connected[connectedUser[chat.user2]].emit('chat', { message:result });
        }        else {

          io.sockets.connected[connectedUser[chat.user1]].emit('chat', { message:result });
        }
      });
    });
  });

  /*
     Fires when client disconnects.
     **/
  socket.on('disconnect', function () {

    connection.query("UPDATE users SET chatstatus='offline' WHERE username='" + socket.username + "' ", function (err, result) {});

    console.log(socket.username + ' Disonnected!');
  });

});
