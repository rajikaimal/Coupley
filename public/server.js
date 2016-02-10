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
  var connectedUser={};
  var Likedusers=[];
  var ThisUserEmail;



connection.connect();

server.listen(8081);

io.on('connection', function (socket) {
  console.log(' Client Connected !');

  socket.on('LoggedUser',function(data){

// (connectedUser.indexOf(data)== -1) && (data!=null)

    if((!(data in connectedUser)) && (data != null)){
       socket.username=data;
       connectedUser[socket.username]=socket.id;
      console.log(connectedUser);
       console.log(socket.username+" menna socket name eka!");
       console.log("log wechcha eka add una! "+data);
     }
     else{
         console.log("log wela hitpu ekek awa "+data);
     }
  });



  socket.on('message', function (chat) {
    ThisUserEmail=chat.emailusr1;
    console.log("Email awa "+ThisUserEmail);
    post = {
      user1: chat.user1,
      user2: chat.user2,
      message: chat.message
    };


    connection.query("SELECT id FROM users WHERE email='"+ThisUserEmail+"' ", function(err, result) {
        var ID = result[0].id;
        console.log("Menna id eka like karapu ekage "+ID);
         connection.query("SELECT user2 FROM liked WHERE likeduser='"+ID+"' ",post,function(err,result){
           for(var i=0;i<result.length;i++){
                 Likedusers[i]=result[i].user2;
           }
           console.log("menna user "+Likedusers);

         });

    });

//  console.log(connectedUser[0].chat.user2+" ta yawanne");




    connection.query('INSERT INTO chats SET ?', post, function(err, result) {
      connection.query('SELECT message from chats', function(err, result) {
      //      socket.emit('chat', { message: result });
    //      io.sockets.connected[connectedUser[chat.user2]].emit('chat', { message: result });
     socket.broadcast.to(connectedUser[chat.user2]).emit('chat', { message: result });
    //      io.sockets.connected[connectedUser[chat.user2]].emit('chat', { message: result });
        //  io.to(connectedUser[chat.user2]).emit('chat',{message:result});
          console.log("send unaaaa!");
      });
    });

  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
