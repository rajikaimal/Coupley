var AppDispatcher = require('../../dispatcher/AppDispatcher');
var SearchConstants = require('../../constants/SearchConstants');

var UnblockActions = {
  Unblock: function (credentials) {
    $.post('/admin-api/unblockuser', credentials, function (data) {
      if (data.status === 201) {
        $.get('/admin-api/blocked', function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: SearchConstants.SEARCH,
              search: response.users,
            });
          }
        });
      } else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });

  },
};

module.exports = UnblockActions;