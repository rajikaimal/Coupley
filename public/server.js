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
      message: chat.message,
      sender_un: chat.user1,
      thread_id:'',
    };

    post1 = {
     user1_un: chat.user1,
     user2_un: chat.user2,
   };

    connection.query("SELECT trd_id FROM threads WHERE user1_un IN ('" + post1.user1_un + "','" + post1.user2_un + "') AND user2_un IN ('" + post1.user1_un  + "','" + post1.user2_un + "') ", function (err, result) {
      if (Object.keys(result).length==0) {
        connection.query('INSERT INTO threads SET ?', post1, function (err, result) {
          connection.query("SELECT trd_id FROM threads  WHERE user1_un IN ('" + post1.user1_un + "','" + post1.user2_un + "') AND user2_un IN ('" + post1.user1_un + "','" + post1.user2_un + "') ", function (err, result) {
            post.thread_id = result[0].trd_id; });

        });
      }else {
        post.thread_id = result[0].trd_id;

      }

      console.log(post.thread_id);
      connection.query("INSERT INTO messages(message,sender_un,thread_id) VALUES('" + post.message + "','" + post.sender_un + "','" + post.thread_id + "')", function (err, result) {
      console.log('error eka '+err);
        connection.query("SELECT m.message,m.created_at,u.firstname,m.thread_id FROM messages m,users u WHERE m.thread_id='" + post.thread_id + "' AND u.username=m.sender_un ", function (err, result) {

          io.sockets.connected[connectedUser[chat.user1]].emit('chat', { message:result });

          if (chat.user2 in connectedUser) {
            io.sockets.connected[connectedUser[chat.user2]].emit('chat', { message:result });
          }        else {

            io.sockets.connected[connectedUser[chat.user1]].emit('chat', { message:result });
          }
        });
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
