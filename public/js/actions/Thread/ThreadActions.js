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
  }

  getmessages:function(){
     console.log('<<<<<<<<message');
     AppDispatcher.handleViewAction({
        actionType:ThreadConstants.RETRIVE,
        chatmessage:message

     });
  }

};

module.exports = ThreadAction;
