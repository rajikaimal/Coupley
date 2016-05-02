var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');

var LoginActions = {
  loadProfileData: function (username) {
    $.get('/api/visitorprofile?token=' + localStorage.getItem('apitoken') + '&username=' + username, function (response) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.VISITOR,
        userdata: response.user[0],
      });
    });
  },

  remove: function () {
    AppDispatcher.handleViewAction({
      actionType: ProfileConstants.VISITORREMOVE,
    });
  },

  getPermission: function () {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let request = {
      username: localStorage.getItem('username'),
      visitorusername: visitorusername,
      token: localStorage.getItem('apitoken'),
    };
    $.post('/api/profilepermission?token=' + localStorage.getItem('apitoken'), request, function (response) {
      if (response.status == 200) {

        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.PROPPERMISSION,
          permission: response.permission,
        });
      }
    }).fail(function (error) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.ERR,
        error: true,
      });
    });
  },

  getLikeStatus: function () {
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];
    let request = {
      visitorusername: localStorage.getItem('username'),
      username: username,
      token: localStorage.getItem('apitoken'),
    };
    $.get('/api/likestatus?token=' + localStorage.getItem('apitoken') + '&visitorusername=' + request.visitorusername + '&username=' + request.username, function (response) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.LIKESTATUS,
        likestatus: response,
      });
    });
  },

  like: function () {
    let str = window.location.hash;
    let gotlikedusername = str.split(/[\/?]/)[1];
    let request = {
      likedUsername: localStorage.getItem('username'),
      gotLikedUsername: gotlikedusername,
      token: localStorage.getItem('apitoken'),
    };
    let likeNotify = {
      likedUsername: localStorage.getItem('username'),
      gotLikedUsername: gotlikedusername,
    };
    $.post('/api/like?token=' + localStorage.getItem('apitoken'), request, function (response) {
      
      socket.emit('like', likeNotify);
    }).fail(function (error) {

    });
  },

  unlike: function () {
    let str = window.location.hash;
    let gotunlikedusername = str.split(/[\/?]/)[1];
    let request = {
      unlikedUsername: localStorage.getItem('username'),
      gotunLikedUsername: gotunlikedusername,
      token: localStorage.getItem('apitoken'),
    };
    $.post('/api/unlike?token=' + localStorage.getItem('apitoken'), request, function (response) {

    }).fail(function (error) {

    });
  },

  getLikedbackStatus: function () {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let request = {
      username: localStorage.getItem('username'),
      visitorusername: visitorusername,
//      token: localStorage.getItem('apitoken'),
    };
    $.post('/api/likedbackstatus?token=' + localStorage.getItem('apitoken'), request, function (response) {

      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.LIKEBACKSTATUS,
        likedbackstatus: response.liked,
      });
    }).fail(function (error) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.ERR,
        error: true,
      });
    });
  },

  getBlockStatus: function () {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let request = {
      username: localStorage.getItem('username'),
      visitorusername: visitorusername,
      token: localStorage.getItem('apitoken'),
    };
    $.post('/api/blockstatus?token=' + localStorage.getItem('apitoken'), request, function (response) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.BLOCKSTATUS,
        blockstatus: response.blockstatus,
      });
    }).fail(function (error) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.ERR,
        error: true,
      });
    });
  },

  block: function () {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let request = {
      username: localStorage.getItem('username'),
      visitorusername: visitorusername,
      token: localStorage.getItem('apitoken'),
    };
    $.post('/api/blockuser?token=' + localStorage.getItem('apitoken'), request, function (response) {
      if (response.status == 200) {

        let str = window.location.hash;
        let gotunlikedusername = str.split(/[\/?]/)[1];
        let request = {
          unlikedUsername: localStorage.getItem('username'),
          gotunLikedUsername: gotunlikedusername,
          token: localStorage.getItem('apitoken'),
        };
        $.post('/api/unlike?token=' + localStorage.getItem('apitoken'), request, function (response) {

        }).fail(function (error) {

        });

        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.BLOCKSTATUS,
          blockstatus: true,
        });
      }
    }).fail(function (error) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.ERR,
        error: true,
      });
    });
  },

  unblock: function () {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let request = {
      username: localStorage.getItem('username'),
      visitorusername: visitorusername,
      token: localStorage.getItem('apitoken'),
    };
    $.post('/api/unblockuser?token=' + localStorage.getItem('apitoken'), request, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.BLOCKSTATUS,
          blockstatus: false,
        });
      }
    }).fail(function (error) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.ERR,
        error: true,
      });
    });
  },

  fetchProfilePicture: function () {
    let str = window.location.hash;
    let visitorusername = str.split(/[\/?]/)[1];
    let apitoken = localStorage.getItem('apitoken');
    let data = {
      token: apitoken,
      username: visitorusername,
    };
    $.get('/api/getProfilePic', data, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.VISITORPROFILEPIC,
          profilepic: response.image,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.ERR,
          error: true,
        });
      }
    });
  },

  reportUser: function(data) {
    $.post('/api/profile/report?token=' + localStorage.getItem('apitoken'), data, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.REPORTDONE,
          done: true,
        });
//        window.location.reload(true);
      }
    }).fail(function (error) {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.ERR,
        error: true,
      });
    });
  },

  visitor: function(data) {
    $.post('/api/profile/visitorcount?token=' + localStorage.getItem('apitoken'), data, function(response) {
      
    }).fail(function (error) {
      // AppDispatcher.handleViewAction({
      //   actionType: ProfileConstants.ERR,
      //   error: true,
      // });
    });
  },

  clearAll: function() {
    AppDispatcher.handleViewAction({
      actionType: ProfileConstants.CLEAR,
    });
  },
};

module.exports = LoginActions;
