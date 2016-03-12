var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var UnblockActions = {
  Unblock: function (credentials) {
    $.post('/admin-api/unblockuser', credentials, function (data) {
      if (data.status === 201) {
        location.reload(true);
      } else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });

  },
};

module.exports = UnblockActions;
