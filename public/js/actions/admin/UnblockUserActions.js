var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var UnblockActions = {
  Unblock: function (credentials) {
    console.log(credentials);
    $.post('/admin-api/unblockuser', credentials, function (data) {
      if (data.status === 201) {
        location.reload(true);
      }
    });

  },
};

module.exports = UnblockActions;
