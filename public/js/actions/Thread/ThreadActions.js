var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ThreadConstants = require('../../constants/ThreadConstants');

var ThreadAction = {
  savemessage: function (message) {
    AppDispatcher.handleViewAction({
      actionType: ThreadConstants.SAVE,
      chatmessage: message,
    });
  },

  getmessages:function () {
    AppDispatcher.handleViewAction({
      actionType:ThreadConstants.RETRIVE,
      chatmessage:message,
    });
  },

  getpreviousmessage:function (request) {
   $.get('/api/getpreviousmsg?user1=' + request.user1, function (response) {
     if (response.status == 200) {
       AppDispatcher.handleViewAction({
         actionType:ThreadConstants.RETRIVEOLD,
         previousmessage: response.pmessage,
       });
     }else if (response.status == 200) {
       console.log('Error 505');
     }
   });
 },

  deleteM:function (id) {
    $.post('api/deletemessage', id, function (response) {
      if (response.status == 201) {
        $.get('/api/getpreviousmsg?user1=' + request.user1, function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType:ThreadConstants.RETRIVEOLD,
              previousmessage: response.pmessage,
            });
          }else if (response.status == 200 && response.pmessage == '') {
            console.log('Error 505');
          }
        });
      }else if (response.status == 404) {
        console.log('Error 404');
      }

    });
  },

 :function (request) {
    $.get('/api/getlikedusers?user1=' + request.user1, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType:ThreadConstants.RETRIVELIKED,
            listoflikedusers: response.llist,
          });
      }else if (response.status == 505) {
        console.log("menna name eka "+request.user1);
        console.log('Error 505');
      }
    });
  },

  block: function (visitor, username) {
    let data = {
     visitorusername: visitor,
     username: username,
   };
    $.post('api/blockuser', data, function (response) {
      if (response.status == 200) {
        document.location = '/#/';
      }
    });
  },

  getseachconv:function (request) {
    $.get('/api/getsearchconv?user1=' + request.user1 + '&user2=' + request.user2,
    function (response)
    {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
           actionType:ThreadConstants.SEARCHMSGLIST,
           seacrhconvlist: response.Slist,
         });
      }else if (response.status == 200 && response.pmessage == '') {
        console.log('Error 505');
      }
    });
  },

  getonlineuserslist:function (request) {
   $.get('/api/getonlineusers?user1=' + request.user1, function (response) {
     if (response.status == 200) {
       AppDispatcher.handleViewAction({
         actionType:ThreadConstants.RETRIVEONLINE,
         onlinelist: response.onlinelist,
       });
     }else if (response.status == 200) {
       console.log('Error 505');
     }
   });
 },

};

module.exports = ThreadAction;
