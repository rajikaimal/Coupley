var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var CommentAction = {
  add_comment: function(comment){
    $.post('api/comment', comment, function(response) {
      console.log(response);
      });
  },

  };

module.exports = CommentAction;