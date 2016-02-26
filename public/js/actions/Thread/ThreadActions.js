var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ThreadConstants = require('../../constants/ThreadConstants');

var ThreadAction = {
  savemessage: function(message) {
    console.log('message >>>>>>');
    console.log(message);
    AppDispatcher.handleViewAction({
      actionType: ThreadConstants.SAVE,
      chatmessage: message
    });
  },

  getmessages:function(){
     console.log('<<<<<<<<message');
     AppDispatcher.handleViewAction({
        actionType:ThreadConstants.RETRIVE,
        chatmessage:message

     });
  },

 getpreviousmessage:function(){
    console.log('<<<<<<<<<previousmessages');
    $.get('/api/getpreviousmsg' , function(response) {
      console.log(response);
      if (response.status == 200) {
            AppDispatcher.handleViewAction({
            actionType:ThreadConstants.RETRIVEOLD,
            previousmessage: response.pmessage
          });
      }
      else if (response.status == 505) {
            console.log('Error 505');
      }
    });

 },
 deleteM: function(user2){
   $.post('api/deletemessage', user2, function(response) {
     console.log(response);
     });
 },


};



module.exports = ThreadAction;
