var app = require('express')();    /*  Require express module  */
var server = require('http').Server(app);   /*  Require HTTP module and create server */
var io = require('socket.io')(server);    /*  Require Socket module */
var mysql      = require('mysql');      /*  Require HTTP module and create server */
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'miyoungrae123',
  database: 'Coupley',
});
var connectedUser = {};
var Admin = '';
connection.connect();

/*  listen to port 8080 */
server.listen(8080, function () {
  console.log('Server listening on port 8081');
});

io.on('connection', function (socket) {
  console.log(' Client Connected !');

  socket.on('LoggedUser', function (data) {
    console.log(data in connectedUser);
    if ((data != null)) {
      socket.id = data;
      connectedUser[socket.name] = socket.id;
      connection.query('SELECT CONCAT(firstname," ",lastname) AS user FROM users WHERE id=' + data,
          function (err, result) {
        console.log('logged admin ' + result[0].user);
        Admin = result[0].user;
      });
    }   else {
      console.log('log wela hitpu ekek awa ' + data);
    }
  });

  socket.on('register', function (register) {
    var added = register.firstname + ' ' + register.lastname;
    var content = 'New Admin ' + added + ' joined.';
    connection.query('insert into AdminNotification (addedBy, added, content, readNotification) ' +
        'values ("' + Admin + '","' + added + '","' + content + '", 0)', function (err, result) {
      socket.broadcast.emit('notifyRegistration',
          { message: content });
      console.log('send unaaaa!');
    });

  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});
