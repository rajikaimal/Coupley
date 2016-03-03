var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LikeConstants = require('../../constants/LikeConstants');
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';

var LikesActions ={
  getlikestatus: function(request) {
    $.get('/api/getlikestatus',function(response) {
      console.log("likeactionnnnnnnnnnn");
      console.log(response);
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
        actionType: LikeConstants.LIKESTATUS,
        likestatus: response
          });
        }
        else if (response.status == 505) {
            console.log('Error 505');
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
};

module.exports = LikesActions;

