var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var LikesActions ={
	add_likes: function(likes){
    $.post('api/likes', likes, function(response) {
      console.log(response);
      });
  },
};

module.exports = LikesActions;