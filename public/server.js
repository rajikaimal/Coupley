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
            console.log(data in connectedUser);
     if((data !=null)){

           socket.username=data;
           connectedUser[socket.username]=socket.id;
           console.log(connectedUser);
           console.log("Logged User's Name :"+socket.username);



       }
       else{
         console.log(data+ "Logged again!");




      }
  });


   socket.on('LoggedUserEmail',function(data){

     connection.query("SELECT id FROM users WHERE email='"+data+"' ", function(err, result) {
                     var ID = result[0].id;
                     console.log("Logged users ID :"+ID);
                     connection.query("SELECT user2 FROM liked WHERE likeduser='"+ID+"' ",function(err,result){
                                            for(var i=0;i<result.length;i++){
                                                 Likedusers[i]=result[i].user2;
                                                }
                                        console.log("List of users liked by this user :"+Likedusers);
                                   for(var i=0;i<Likedusers.length;i++){

                                   }
                    //        socket.broadcast.to(connectedUser[chat.user2]).emit('chat', { message:result});
                        //    socket.broadcast.to(connectedUser[Tiffany]).emit('chatList', {Userlist:Likedusers});
                             io.emit('chatList', {Userlist:Likedusers});
                                            console.log("Liked list sent to "+socket.username);
                                    });

                     });


            });

app.get('/threads/list', function(req, res) {

    res.json(connectedUser);
});






socket.on('message', function (chat) {
           ThisUserEmail=chat.emailusr1;
           console.log("Email awa "+ThisUserEmail);
           post = {
                  user1: chat.user1,
                  user2: chat.user2,
                  message: chat.message
                  };

       connection.query('INSERT INTO chats SET ?', post, function(err, result) {
                       connection.query("SELECT message,user1,created_at FROM chats WHERE 	user1 IN ('"+post.user1+"','"+post.user2+"') AND user2 IN ('"+post.user1+"','"+post.user2+"') ", function(err, result) {

                                  socket.broadcast.to(connectedUser[chat.user2]).emit('chat', { message:result});

                                                      console.log("send unaaaa!");
                       });
      });

   });


  socket.on('disconnect', function(){
          console.log('user disconnected');
  });




});
