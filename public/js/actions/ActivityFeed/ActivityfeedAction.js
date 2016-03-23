var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');
var LikeConstants = require('../../constants/LikeConstants');
var CommentConstants = require('../../constants/CommentConstants');

var ActivityfeedAction = {
  _addStatus: function (status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/getstatus', status, function (response) {
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

  _getStatus: function (uId) {
    $.get('/api/getstatus', uId, function (response) {
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

  _getUserId:function () {
    $.get('/api/getUserId?email='+ localStorage.getItem('email'), function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ActivityFeedConstants.GETLOGGEDUSERID,
          userId: response.uId,
        });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  _addShare: function (result) {
    $.post('api/sharedStatus', result, function (response) {
        if (response.status == 201) {
          $.get('/api/getstatus', result, function (response) {
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

  _deleteStatus: function(postId){
    $.post('api/deleteStatus', postId, function(response) {
      if(response.status == 201) {
        $.get('/api/getstatus', postId, function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETDATA,
              statusdata: response.posts,
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
        $.get('/api/getstatus', txt, function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: ActivityFeedConstants.GETDATA,
              statusdata: response.posts,
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

  like: function(request) {
    $.post('/api/likepost', request,function(response){
    }).fail(function(error) {
      console.log(error);
    });
  },

  unlike: function(request) {
    $.post('/api/unlikepost', request,function(response){ 
    }).fail(function(error) {
      console.log(error);
    });
  },

  getLikedUsers: function(request) {
    $.get('/api/getLikedUsers', request, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: LikeConstants.GETUSERS,
          likedUsers: response.posts,
        });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  addComment: function(comment){
    $.post('api/addcomment', comment, function(response) {
      console.log(response);
    });
  },

  getCommentList: function(commentData) {
    $.get('/api/getcomment', commentData,function(response) {
      if (response.status == 200) {
          AppDispatcher.handleViewAction({
            actionType: CommentConstants.GETCOMMENT,
            commentdata: response.comments
          });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },
};

module.exports = ActivityfeedAction;
