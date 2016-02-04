var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');

var LoginActions = {
  loadprofiledata: function(username) {
    $.get('/api/visitorprofile?token=' + localStorage.getItem('apitoken') + "&username=" + username, function(response) {
    	AppDispatcher.handleViewAction({
          actionType: ProfileConstants.VISITOR,
          userdata: response.user[0]
        });
    });
  },
  remove: function() {
    AppDispatcher.handleViewAction({
      actionType: ProfileConstants.VISITORREMOVE
    });
  },
  getlikestatus: function() {
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];
    let request = {
      visitorusername: localStorage.getItem('username'),
      username: username,
      token: localStorage.getItem('apitoken')
    };
    $.get('/api/likestatus?token=' + localStorage.getItem('apitoken') + "&visitorusername=" + request.visitorusername + "&username=" + request.username, function(response) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.LIKESTATUS,
        likestatus: response
      });
    });
  },
  like: function() {
    let str = window.location.hash;
    let gotlikedusername = str.split(/[\/?]/)[1];
    let request = {
      likedUsername: localStorage.getItem('username'),
      gotLikedUsername: gotlikedusername,
      token: localStorage.getItem('apitoken')
    };
    $.post('/api/like', request,function(response){
      console.log(response);
    }).fail(function(error) {
      console.log(error);
    });
  },
  unlike: function() {
    let str = window.location.hash;
    let gotunlikedusername = str.split(/[\/?]/)[1];
    let request = {
      unlikedUsername: localStorage.getItem('username'),
      gotunLikedUsername: gotunlikedusername,
      token: localStorage.getItem('apitoken')
    };
    $.post('/api/unlike', request,function(response){
      console.log(response);
    }).fail(function(error) {
      console.log(error);
    });
  },
  getlikedbackstatus: function() {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let request = {
      username: localStorage.getItem('username'),
      visitorusername: visitorusername,
      token: localStorage.getItem('apitoken')
    };
    $.post('/api/likedbackstatus', request, function(response){
      console.log('GOT LIKEdBACK stat <><><><><>');
      console.log(response);
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.LIKEBACKSTATUS,
        likedbackstatus: response.liked
      });
    }).fail(function(error) {
      console.log(error);
    });
  }
};

module.exports = LoginActions;