var AppDispatcher = require('../../dispatcher/AppDispatcher');
var SearchConstants = require('../../constants/SearchConstants');

var BlockActions = {
  block: function (credentials) {
    $.post('/admin-api/blockuser', credentials, function (data) {
      if (data.status === 201) {
        $.get('/admin-api/search', function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
              actionType: SearchConstants.SEARCH,
              search: response.users,
            });
          }      else if (response.status === 300) {
            swal('Something Went Wrong', 'Please try again in a moment', 'error');
          }
        });
      } else if (data.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });

  },
};

module.exports = BlockActions;