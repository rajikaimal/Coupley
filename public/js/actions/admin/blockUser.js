var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var BlockActions = {
  block: function (credentials) {
    $.post('/admin-api/blockuser', credentials, function (data) {
      if (data.status === 201) {
        location.reload(true);
      } else if (data.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });

  },
};

module.exports = BlockActions;
