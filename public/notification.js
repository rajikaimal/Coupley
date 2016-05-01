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

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

connection.connect();

/*  listen to port 8081 */
server.listen(8080, function () {
  console.log('Server listening on port 8080');
});

io.on('connection', function (socket) {
  console.log(' Client Connected !');

  socket.on('LoggedUser', function (data) {
    console.log(data in connectedUser);
    if ((data != null)) {
      //(!(data in connectedUser)) &&
      socket.username = data;
      connectedUser[socket.username] = socket.id;
      console.log(connectedUser);
      console.log(socket.username + ' menna socket name eka!');
      console.log('log wechcha user list ekata add una! ' + data);
    }    else {
      console.log('log wela hitpu ekek awa ' + data);
    }
  });

  socket.on('like', function (like) {
    console.log(like);
    notification = {
      user1: like.likedUsername,
      user2: like.gotLikedUsername,
    };
    connection.query("SELECT id, profilepic FROM users WHERE username='" + like.likedUsername + "' ", function (err, result) {
      console.log('id 1' + result[0].id);

      //var user1Firstname = result[0].firstname;
      var user1Id = result[0].id;
      var user1ProfilePic = result[0].profilepic;
      connection.query("SELECT id,firstname,profilepic FROM users WHERE username='" + like.gotLikedUsername + "' ", function (err, result) {
        var user2Id = result[0].id;
        var user2Firstname = result[0].firstname;
        var user2ProfilePic = result[0].profilepic;
        var user2Username = like.gotLikedUsername;
        console.log('id 2' + user2Id);
        var userContent = {
          firstname: user2Firstname,
          profilepic: user2ProfilePic,
          content: 'like',
          username: user2Username
        };
        var content = 'like';
        console.log('Query ...' + user1Id + ' ' + user2Id);
        var date = new Date().toMysqlFormat();
        console.log(date);
        connection.query('insert into notification (user_id1, user_id2, content, readnotification) values (' + user1Id + ',' + user2Id + ",'" + 'like' + "', 0)", function (err, result) {
          console.log('Here is the user of got liked !' + like.gotLikedUsername);
          socket.broadcast.to(connectedUser[like.gotLikedUsername]).emit('notifylike', { message: content });
          console.log('send unaaaa!');
        });
      });
    });
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});