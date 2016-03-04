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
var ThisUserEmail;

connection.connect();

/*  listen to port 8081 */
server.listen(8081);

/*
 Retrive data when a client connect.
 **/
io.on('connection', function (socket) {
  console.log(' Client Connected !');
  /*
   Retrive loged user information.
   **/
  socket.on('LoggedUser', function (data) {

    console.log(data in connectedUser);
    if ((data != null)) {

      socket.username = data;
      connectedUser[socket.username] = socket.id;
      console.log(connectedUser);
      console.log("Logged User's Name :" + socket.username);

      socket.on('LoggedUserEmail', function (data) {

        connection.query("SELECT id FROM users WHERE email='" + data + "' ", function (err, result) {
          var ID = result[0].id;
          console.log('Logged users ID :' + ID);
          connection.query("SELECT user2 FROM liked WHERE likeduser='" + ID + "' or gotliked ='" + ID + "' and 	likeback=1 ", function (err, result) {
            for (var i = 0; i < result.length; i++) {
              Likedusers[i] = result[i].user2;
            }

            console.log('List of users liked by this user :' + Likedusers);
            /*
             Comparing liked users and user connected to te shocket.
             **/
            var arr = Likedusers.concat(Object.keys(connectedUser));
            console.log(arr);
            var sortedArr = arr.sort();
            console.log(sortedArr);
            var resultz = [];
            for (var i = 0; i < arr.length - 1; i++) {
              if (sortedArr[i + 1] == sortedArr[i]) {
                resultz.push(sortedArr[i]);
              }
            }

            console.log(resultz);

            io.sockets.connected[connectedUser[socket.username]].emit('chatList', { Userlist:resultz });
            console.log('Liked list sent to ' + socket.username);
          });

        });

      });

    }else {
      console.log(data + 'Logged again!');

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
    ThisUserEmail = chat.emailusr1;

    post = {
      user1: chat.user1,
      user2: chat.user2,
      message: chat.message,
    };

    connection.query('INSERT INTO chats SET ?', post, function (err, result) {
      connection.query("SELECT message,user1 FROM chats WHERE 	user1 IN ('" + post.user1 + "','" + post.user2 + "') AND user2 IN ('" + post.user1 + "','" + post.user2 + "') ", function (err, result) {
        console.log('insert una');

        io.sockets.connected[connectedUser[chat.user1]].emit('chat', { message:result });

        if (chat.user2 in connectedUser) {
          io.sockets.connected[connectedUser[chat.user2]].emit('chat', { message:result });
        }        else {
          console.log('hi');
          io.sockets.connected[connectedUser[chat.user1]].emit('chat', { message:result });
        }

        console.log('send unaaaa!');
      });
    });

  });
  /*
     Fires when client disconnects.
     **/
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});
