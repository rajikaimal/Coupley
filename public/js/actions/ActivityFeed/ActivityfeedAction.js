var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var ActivityfeedAction = {
  _addStatus: function (status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/getstatus', function (response) {
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

  addStatusProfile: function(status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/getstatus', function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETPROFILEPOSTS,
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

  _getStatus: function () {
    $.get('/api/getstatus?email='+ localStorage.getItem('email'), function (response) {
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

  _deleteStatus: function(postId){
    $.post('api/deleteStatus', postId, function(response) {
      if(response.status == 201) {
        $.get('/api/getstatus', function(response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETDATA,
              statusdata: response.posts
            });
          } else if (response.status == 505) {
            console.log('Error 505');
          }
        });
      } else if(response.status == 404) {
        console.log('Error 404');
      }
    });
  },

  _editStatus:function (txt) {
    $.post('api/edit_status', txt, function (response) {
      if(response.status == 201) {
        $.get('/api/getstatus', function(response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETDATA,
              statusdata: response.posts
            });
          } else if (response.status == 505) {
            console.log('Error 505');
          }
        });
      } else if(response.status == 404) {
        console.log('Error 404');
      }
    });
  },
};

module.exports = ActivityfeedAction;
