var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var CommentAction = {
  add_comment: function(comment){
    $.post('api/comment', comment, function(response) {
      console.log(response);
      });
  },

  getcomments: function() {
    $.get('/api/getcomments' , function(response) {
      console.log(response);
      if (response.status == 200) {
            AppDispatcher.handleViewAction({
            actionType: CommentConstants.GETDATA,
            commentdata: response.comments
          });
      }
      else if (response.status == 505) {
            console.log('Error 505');
      }
    });
  },

  };

module.exports = CommentAction;