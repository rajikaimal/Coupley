var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ShareConstants = require('../../constants/ShareConstants');
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';

var ShareActions = {
   getsharestatus: function(request) {
    $.get('/api/getsharestatus', function(response) {
      console.log("shareaction");
      console.log(response);
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
        actionType: ShareConstants.SHARESTATUS,
        sharestatus: response
          });
        }
        else if (response.status == 505) {
            console.log('Error 505');
        }
      });
  },

  add_share: function(request) {
    $.post('/api/sharepost', request,function(response){
    }).fail(function(error) {
      console.log(error);
    });
  },

  del_share: function(request) {
    $.post('/api/unsharepost', request,function(response){
    }).fail(function(error) {
      console.log(error);
    });
  },

  };

module.exports = ShareActions;