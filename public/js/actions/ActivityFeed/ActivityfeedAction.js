var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');
var LikeConstants = require('../../constants/LikeConstants');
var CommentConstants = require('../../constants/CommentConstants');

var commentLimitNo = 0;
var postLimitNo = 0;

var ActivityfeedAction = {
  _addStatus: function (status) {
    $.post('api/status', status, function (response) {
      if (response.status == 201) {
        $.get('/api/getstatus?postLimitNo=' + postLimitNo, status, function (response) {
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
    postLimitNo = postLimitNo + 3;
    $.get('/api/getstatus?postLimitNo=' + postLimitNo, uId, function (response) {
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

  _getStatusVisitor: function (uId) {
    postLimitNo = postLimitNo + 3;
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];
    $.get('/api/getstatusvisitor?postLimitNo=' + postLimitNo + '&username=' + username , function (response) {
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

  _getStatusProfile: function() {
    postLimitNo = postLimitNo + 3;
    $.get('/api/getstatusvisitor?postLimitNo=' + postLimitNo + '&username=' + localStorage.getItem('username') , function (response) {
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

  _addShare: function (result) {
    $.post('api/sharedStatus', result, function (response) {
        if (response.status == 201) {
          $.get('/api/getstatus?postLimitNo=' + postLimitNo, result, function (response) {
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
        $.get('/api/getstatus?postLimitNo=' + postLimitNo, postId, function (response) {
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
        $.get('/api/getstatus?postLimitNo=' + postLimitNo, txt, function (response) {
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

  _blockStatus: function (result) {
    $.post('api/block_status', result, function(response) {
      if(response.status == 201) {
        $.get('/api/getstatus?postLimitNo=' + postLimitNo, result, function (response) {
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

  getCount: function(request) {
    $.get('/api/getCount', request, function (response) {
      console.log('ssssssssssss');
      console.log(response);
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: LikeConstants.GETCOUNT,
          countValue: response.posts,
        });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  getLikedUsers: function(request) {
    $.get('/api/getLikedUsers', request, function (response) {
      console.log(response);
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

  getSharedUsers: function(request) {
    $.get('/api/getSharedUsers', request, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ActivityFeedConstants.GETSHAREDUSERS,
          sharedUsers: response.posts,
        });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  addComment: function(comment){
    $.post('api/addcomment', comment, function(response) {
      if(response.status == 201){
        $.get('/api/getCurrentComment',comment,function(response) {
          if(response.status == 200) {
            AppDispatcher.handleViewAction({
                actionType: CommentConstants.GETCOMMENT,
                commentdata: response.comments
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

  getCommentList: function(commentData) {
    commentLimitNo = commentLimitNo + 2;
    $.get('/api/getcomment?commentLimitNo=' + commentLimitNo , commentData,function(response) {
      if (response.status == 200 && response.comments) {
          AppDispatcher.handleViewAction({
            actionType: CommentConstants.GETCOMMENT,
            commentdata: response.comments
          });
      } else {
          AppDispatcher.handleViewAction({
            actionType: CommentConstants.GETCOMMENT,
            commentdata: response.comments
          });
      }
    });
  },

  loadMoreComment: function(commentData) {
    commentLimitNo = commentLimitNo + 2;
    $.get('/api/getcomment?commentLimitNo=' + commentLimitNo , commentData,function(response) {
      if (response.status == 200 && response.comments) {
          AppDispatcher.handleViewAction({
            actionType: CommentConstants.LOADMORE,
            commentdata: response.comments
          });
      } else {
          AppDispatcher.handleViewAction({
            actionType: CommentConstants.LOADMORE,
            commentdata: response.comments
          });
      }
    });
  },

  getCommentCount: function(commentdata) {
    $.get('/api/getCommentCount', commentdata, function (response) {
      console.log(response);
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: CommentConstants.GETCOMMENTCOUNT,
          commentCount: response.commentsCount,
        });
      } else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  }
};

module.exports = ActivityfeedAction;
