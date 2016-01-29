var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');


var Chatting={
  saveMessage: function(message){
    $.post('api/chat', message, function(response) {
      console.log(response);
    });
  }
}

module.exports = Chatting;
