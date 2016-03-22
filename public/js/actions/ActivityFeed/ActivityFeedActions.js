var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var ActivityFeedActions = {
  add_status: function (status) {
    $.post('api/status?token=' + localStorage.getItem('apitoken'), status, function (response) {
      console.log(response);
      if (response.status == 201) {
        $.get('/api/getstatus?token=' + localStorage.getItem('apitoken'), function (response) {
          console.log(response);
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETDATA,
              statusdata: response.posts,
            });
          } else if (response.status == 505) {
            console.log('Error 505');
          }
        });
      } else if (response.status == 404) {
        console.log('Error 404');
      }
    });
  },

  addStatusProfile: function (status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/profile/getposts?token=' + localStorage.getItem('apitoken') + 'username=' + username, function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETPROFILEPOSTS,
              posts: response.posts,
            });
          } else if (response.status == 200 && !response.posts) {
            console.log('Error 505');
          }
        });
      } else if (response.status == 404) {
        console.log('Error 404');
      }
    });
  },

  getstatus: function () {
    $.get('/api/getstatus=token?' + localStorage.getItem('apitoken'), function (response) {
      console.log(response);
      console.log('view status ');
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETDATA,
            statusdata: response.posts,
          });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  getpostId: function () {
    $.get('/api/getpostId?token=' + localStorage.getItem('apitoken'), function (response) {
      console.log(response);
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETID,
            id: response.posts,
          });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  delete_status: function (postId) {
    $.post('api/deleteStatus?token=' + localStorage.getItem('apitoken'),
     postId, function (response) {
      console.log(response);
    });
  },

  editstatus:function (txt) {
    $.post('api/edit_status', txt, function (response) {
      console.log(response);
    });
  },

  loadPosts: function (username) {
    $.get('/api/profile/getposts?token=' + localStorage.getItem('apitoken') + '&username=' + username, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ActivityFeedConstants.GETPROFILEPOSTS,
          posts: response.posts,
        });
      } else if (response.status == 200 && !response.posts) {
        console.log('Error 505');
      }
    });
  },

  loadmore: function (username) {
    $.get('/api/profile/loadmoreposts?token=' + localStorage.getItem('apitoken'), function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETDATA,
            posts: response.posts,
          });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

};

module.exports = ActivityFeedActions;
