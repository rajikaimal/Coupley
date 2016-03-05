var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var VisitorActivityFeedActions = {
  add_status: function (status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/getstatus', function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETDATA,
              statusdata: response.posts,
            });
          } else if (response.status == 505) {
          }
        });
      } else if (response.status == 404) {
      }
    });
  },

  addStatusProfile: function (status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/profile/getposts?token=' + localStorage.getItem('apitoken') + '&username=' + username, function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETPROFILEPOSTS,
              posts: response.posts,
            });
          } else if (response.status == 200 && !response.posts) {
          }
        });
      } else if (response.status == 404) {
      }
    });
  },

  getstatus: function () {
    $.get('/api/getstatus', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETDATA,
            statusdata: response.posts,
          });
      } else if (response.status == 505) {
      }
    });
  },

  getpostId: function () {
    $.get('/api/getpostId', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETID,
            id: response.posts,
          });
      } else if (response.status == 505) {
      }
    });
  },

  delete_status: function (postId) {
    $.post('api/deleteStatus', postId, function (response) {
          });
  },

  editstatus:function (txt) {
    $.post('api/edit_status', txt, function (response) {
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
      }
    });
  },

  loadmore: function (username) {
    $.get('/api/profile/laodmoreposts', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETDATA,
            posts: response.posts,
          });
      } else if (response.status == 505) {
      }
    });
  },
};

module.exports = VisitorActivityFeedActions;
