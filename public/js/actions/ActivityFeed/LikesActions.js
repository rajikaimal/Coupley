var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LikeConstants = require('../../constants/LikeConstants');
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';

var LikesActions = {
  getlikestatus: function () {
    let pid = StatusStore.getStatusID();
    let email = LoginStore.getEmail();
    let getlike = {
      PostId: pid,
      Email: email,
    };
    $.get('/api/getlikestatus?token=' + localStorage.getItem('apitoken'), function (response) {

      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: LikeConstants.LIKESTATUS,
          likestatus: response,
        });
      } else if (response.status == 505) {

      }
    });
  },

  like: function (request) {
    $.post('/api/likepost', request, function (response) {

    }).fail(function (error) {

    });
  },

  unlike: function (request) {
    $.post('/api/unlikepost', request, function (response) {

    }).fail(function (error) {

    });
  },
};

module.exports = LikesActions;

