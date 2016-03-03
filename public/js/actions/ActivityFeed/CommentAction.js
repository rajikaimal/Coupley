var AppDispatcher = require('../../dispatcher/AppDispatcher');
var CommentConstants = require('../../constants/CommentConstants');

var CommentAction = {
  add_comment: function(comment){
    $.post('api/comment', comment, function(response) {
      if (response.status == 201) {
        $.get('/api/getcomment' , function(response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
            actionType: CommentConstants.GETCOMMENT,
            commentdata: response.comments
          });
      }
      else if (response.status == 505) {
            console.log('Error 505');
      }
        });
      } else if (response.status == 404) {
        console.log('Error 404');
      }
      });
  },

  getcomments: function() {
    $.get('/api/getcomment', function(response) {
      if (response.status == 200) {
          AppDispatcher.handleViewAction({
            actionType: CommentConstants.GETCOMMENT,
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